import getXyzDurationForMode from './getXyzDurationForMode'
import getXyzElementMode from './getXyzElementMode'

function clearXyzElementProperties(el) {
	if (el._xyzAppearObserver) {
		el._xyzAppearObserver.disconnect()
	}
	if (el._xyzAnimTimeout) {
		clearTimeout(el._xyzAnimTimeout)
	}
	el.removeEventListener('animationend', el._xyzAnimEnd)
	el.removeEventListener('animationcancelled', el._xyzAnimEnd)

	delete el._xyzAppearObserver
	delete el._xyzAnimTimeout
	delete el._xyzAnimEnd
}

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
			el.addEventListener('animationcancelled', el._xyzAnimEnd, false)
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
