import getXyzDurationForMode from './getXyzDurationForMode'
import getXyzElementMode from './getXyzElementMode'

function clearXyzElementProperties(el) {
	clearTimeout(el.xyzAnimTimeout)
	el.removeEventListener('animationend', el.xyzAnimEnd)
	el.removeEventListener('animationcancelled', el.xyzAnimEnd)

	delete el.xyzAnimTimeout
	delete el.xyzAnimEnd
}

export default function (duration) {
	return (el, done) => {
		clearXyzElementProperties(el)

		function xyzAnimDone() {
			clearXyzElementProperties(el)
			done()
		}

		const mode = getXyzElementMode(el)
		const modeDuration = getXyzDurationForMode(mode, duration)

		if (typeof modeDuration === 'number') {
			el.xyzAnimTimeout = setTimeout(xyzAnimDone, modeDuration)
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
		el.xyzAnimTimeout = setTimeout(() => {
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

		el.xyzAnimEnd = (event) => {
			if (event.animationName === xyzModeKeyframes) {
				removeXyzEl(event.target)
			}
		}

		el.addEventListener('animationend', el.xyzAnimEnd, false)
		el.addEventListener('animationcancelled', el.xyzAnimEnd, false)
	}
}
