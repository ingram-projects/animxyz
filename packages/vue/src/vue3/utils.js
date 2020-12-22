import { xyzTransitionClasses, getXyzAnimationHook } from '../../../../utils'

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

export function getXyzTransitionData(data) {
	const { appear, duration } = data.attrs || {}

	const animationHook = getXyzAnimationHook(duration)

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
			enter: animationHook,
			leave: animationHook,
		},
	}

	if (appear) {
		transitionData.on.appear = animationHook
	}

	const mergedData = mergeData(data, transitionData)
	delete mergedData.attrs.duration
	return mergedData
}
