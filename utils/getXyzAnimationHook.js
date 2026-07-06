import getXyzDurationForMode from './getXyzDurationForMode'
import getXyzElementMode from './getXyzElementMode'

// Generous upper bound (ms) used when no computed animation duration can be read
// (e.g. animations already cancelled before we measure, or unreadable styles).
const XYZ_AUTO_SAFETY_TIMEOUT = 10000

// Parse a CSS time list ("0.5s, 200ms") into the largest value in milliseconds.
function parseMaxCssTime(value) {
	if (!value) return 0
	return value.split(',').reduce((max, part) => {
		const trimmed = part.trim()
		const num = parseFloat(trimmed)
		if (isNaN(num)) return max
		const ms = /ms$/i.test(trimmed) ? num : num * 1000
		return Math.max(max, ms)
	}, 0)
}

// Idempotent teardown for a single element: clears the safety-net timeout, the
// event listeners, and the appear IntersectionObserver. Safe to call multiple
// times and after the element has already completed. A5 (Vue wrappers) and A6
// (React wrapper) call this from their unbind/unmounted/onExited cleanup.
export function clearXyzElement(el) {
	if (!el) return
	if (el._xyzAppearObserver) {
		el._xyzAppearObserver.disconnect()
	}
	if (el._xyzAnimTimeout) {
		clearTimeout(el._xyzAnimTimeout)
	}
	if (el._xyzAnimSafetyTimeout) {
		clearTimeout(el._xyzAnimSafetyTimeout)
	}
	if (el._xyzAnimEnd) {
		el.removeEventListener('animationend', el._xyzAnimEnd)
		el.removeEventListener('animationcancel', el._xyzAnimEnd)
	}

	delete el._xyzAppearObserver
	delete el._xyzAnimTimeout
	delete el._xyzAnimSafetyTimeout
	delete el._xyzAnimEnd
}

// Back-compat internal alias.
const clearXyzElementProperties = clearXyzElement

export default function (duration, appearVisible) {
	return (el, done) => {
		clearXyzElementProperties(el)

		function xyzAnimDone() {
			clearXyzElementProperties(el)
			done()
		}

		const mode = getXyzElementMode(el)

		function runAnim() {
			const modeDuration = getXyzDurationForMode(mode, duration)

			if (typeof modeDuration === 'number') {
				el._xyzAnimTimeout = setTimeout(xyzAnimDone, modeDuration)
				return
			}

			const xyzModeKeyframes = `xyz-${mode}-keyframes`
			const xyzEls = new Set([el])

			if (modeDuration === 'auto') {
				const xyzNestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)
				xyzNestedEls.forEach(xyzEls.add, xyzEls)
			}

			function removeXyzEl(xyzEl) {
				xyzEls.delete(xyzEl)
				if (xyzEls.size === 0) {
					xyzAnimDone()
				}
			}

			// After one tick remove any elements that are dont have active animations
			el._xyzAnimTimeout = setTimeout(() => {
				// Safety net: `animationcancel` is unreliable (Chromium historically
				// never fired it), so a cancelled animation — element hidden,
				// `animation-name` overridden, `xyz-none` applied mid-flight — may
				// never fire `animationend` either, leaving `done()` uncalled and the
				// wrapper transition hung. Compute a worst-case bound from the
				// elements' computed animation-duration + animation-delay and always
				// resolve by then. Falls back to a generous constant when nothing is
				// readable.
				let maxAnimMs = 0
				xyzEls.forEach((xyzEl) => {
					const style = window.getComputedStyle(xyzEl)
					const durationMs = parseMaxCssTime(style.getPropertyValue('animation-duration'))
					const delayMs = parseMaxCssTime(style.getPropertyValue('animation-delay'))
					maxAnimMs = Math.max(maxAnimMs, durationMs + Math.max(delayMs, 0))
				})
				// Small buffer so the event path wins in the normal (uncancelled) case.
				const safetyMs = (maxAnimMs > 0 ? maxAnimMs + 100 : XYZ_AUTO_SAFETY_TIMEOUT)
				el._xyzAnimSafetyTimeout = setTimeout(xyzAnimDone, safetyMs)

				xyzEls.forEach((xyzEl) => {
					// Remove if element isnt visible
					const visible = xyzEl.offsetParent || xyzEl.getClientRects().length
					if (!visible) {
						removeXyzEl(xyzEl)
					}

					// Remove if element has xyz animation overridden
					const animationName = window.getComputedStyle(xyzEl).getPropertyValue('animation-name')
					if (animationName.indexOf(xyzModeKeyframes) === -1) {
						removeXyzEl(xyzEl)
					}
				})
			})

			el._xyzAnimEnd = (event) => {
				if (event.animationName === xyzModeKeyframes) {
					removeXyzEl(event.target)
				}
			}

			el.addEventListener('animationend', el._xyzAnimEnd, false)
			el.addEventListener('animationcancel', el._xyzAnimEnd, false)
		}

		if (mode === 'appear' && appearVisible) {
			const observerOptions = { ...appearVisible }
			el.classList.add('xyz-paused-all')
			el._xyzAppearObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						el.classList.remove('xyz-paused-all')
						observer.disconnect()
						runAnim()
					}
				})
			}, observerOptions)
			el._xyzAppearObserver.observe(el)
		} else {
			runAnim()
		}
	}
}
