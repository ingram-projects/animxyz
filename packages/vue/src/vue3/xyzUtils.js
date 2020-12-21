export { default as xyz } from 'clsx'

export function mergeData(data1 = {}, data2 = {}) {
	return {
		...data1,
		...data2,
		attrs: {
			...data1.attrs,
			...data2.attrs,
		},
		directives: [...(data1.directives || []), ...(data2.directives || [])],
		staticStyle: {
			...data1.staticStyle,
			...data2.staticStyle,
		},
		style: {
			...data1.style,
			...data2.style,
		},
		on: {
			...data1.on,
			...data2.on,
		},
	}
}

export const xyzTransitionClasses = {
	appearFrom: 'xyz-appear-from',
	appearActive: 'xyz-appear',
	appearTo: 'xyz-appear-to',
	inFrom: 'xyz-in-from',
	inActive: 'xyz-in',
	inTo: 'xyz-in-to',
	outFrom: 'xyz-out-from',
	outActive: 'xyz-out',
	outTo: 'xyz-out-to',
}

function getXyzDurationForMode(mode, duration) {
	if (typeof duration !== 'object' || duration === null) {
		return duration
	}
	switch (mode) {
		case 'appear':
			return duration.appear
		case 'in':
			return duration.in
		case 'out':
			return duration.out
	}
	return null
}

function clearXyzElementProperties(el) {
	clearTimeout(el.xyzAnimTimeout)
	el.removeEventListener('animationend', el.xyzAnimEnd)
	el.removeEventListener('animationcancelled', el.xyzAnimEnd)

	delete el.xyzAnimTimeout
	delete el.xyzAnimEnd
}

function getXyzAnimationHook(mode, duration) {
	const modeDuration = getXyzDurationForMode(mode, duration)

	return (el, done) => {
		clearXyzElementProperties(el)

		function xyzAnimDone() {
			clearXyzElementProperties(el)
			done()
		}

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

export function getXyzTransitionData(data) {
	const { appear, duration } = data.attrs || {}

	const transitionData = {
		attrs: {
			css: true,
			type: 'animation',
			appearClass: xyzTransitionClasses.appearFrom,
			appearActiveClass: xyzTransitionClasses.appearActive,
			appearToClass: xyzTransitionClasses.appearTo,
			enterClass: xyzTransitionClasses.inFrom,
			enterActiveClass: xyzTransitionClasses.inActive,
			enterToClass: xyzTransitionClasses.inTo,
			leaveClass: xyzTransitionClasses.outFrom,
			leaveActiveClass: xyzTransitionClasses.outActive,
			leaveToClass: xyzTransitionClasses.outTo,
		},
		on: {
			enter: getXyzAnimationHook('in', duration),
			leave: getXyzAnimationHook('out', duration),
		},
	}

	if (appear) {
		transitionData.on.appear = getXyzAnimationHook('appear', duration)
	}

	const mergedData = mergeData(data, transitionData)
	delete mergedData.attrs.duration

	return mergedData
}
