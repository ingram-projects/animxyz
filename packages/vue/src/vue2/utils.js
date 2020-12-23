import { mergeData } from 'vue-functional-data-merge'
import { xyzTransitionClasses, getXyzAnimationHook } from '../../../../utils'

export function getXyzTransitionData(data = {}) {
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
