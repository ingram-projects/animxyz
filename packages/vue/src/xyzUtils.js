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
	move: 'xyz-move',
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
			done()
			clearXyzElementProperties(el)
		}

		if (typeof modeDuration === 'number') {
			el.xyzAnimTimeout = setTimeout(xyzAnimDone, modeDuration)
			return
		}

		const xyzModeKeyframes = `xyz-${mode}-keyframes`
		const xyzEls = [el]

		if (modeDuration === 'auto') {
			const xyzNestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)
			xyzEls.push(...Array.from(xyzNestedEls))
		}

		const xyzActiveEls = xyzEls.filter((xyzEl) => {
			// If element is invisible
			if (xyzEl.offsetParent === null) return false

			// If element isn't animating
			const animationName = window.getComputedStyle(xyzEl).getPropertyValue('animation-name')
			if (animationName.indexOf(xyzModeKeyframes) === -1) return false

			return true
		})

		const xyzActiveElsSet = new Set(xyzActiveEls)

		el.xyzAnimEnd = (event) => {
			if (event.animationName === xyzModeKeyframes) {
				xyzActiveElsSet.delete(event.target)
				if (xyzActiveElsSet.size === 0) {
					xyzAnimDone()
				}
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
			name: 'xyz',
			css: true,
			type: 'animation',
			appearClass: `${xyzTransitionClasses.inFrom} ${xyzTransitionClasses.appearFrom}`,
			appearActiveClass: `${xyzTransitionClasses.inActive} ${xyzTransitionClasses.appearActive}`,
			appearToClass: `${xyzTransitionClasses.inTo} ${xyzTransitionClasses.appearTo}`,
			enterClass: xyzTransitionClasses.inFrom,
			enterActiveClass: xyzTransitionClasses.inActive,
			enterToClass: xyzTransitionClasses.inTo,
			leaveClass: xyzTransitionClasses.outFrom,
			leaveActiveClass: xyzTransitionClasses.outActive,
			leaveToClass: xyzTransitionClasses.outTo,
			moveClass: xyzTransitionClasses.move,
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
