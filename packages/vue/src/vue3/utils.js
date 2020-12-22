import { xyzTransitionClasses, getXyzAnimationHook } from '../../../../utils'

export function mergeData(data1 = {}, data2 = {}) {
	return {
		...data1,
		...data2,
		directives: [...(data1.directives || []), ...(data2.directives || [])],
		style: {
			...data1.style,
			...data2.style,
		},
	}
}

export function getXyzTransitionData(data) {
	const { appear, duration } = data || {}

	const animationHook = getXyzAnimationHook(duration)

	const transitionData = {
		css: true,
		type: 'animation',
		appearFromClass: xyzTransitionClasses.appearFrom,
		appearActiveClass: xyzTransitionClasses.appearActive,
		appearToClass: xyzTransitionClasses.appearTo,
		enterFromClass: xyzTransitionClasses.inFrom,
		enterActiveClass: xyzTransitionClasses.inActive,
		enterToClass: xyzTransitionClasses.inTo,
		leaveFromClass: xyzTransitionClasses.outFrom,
		leaveActiveClass: xyzTransitionClasses.outActive,
		leaveToClass: xyzTransitionClasses.outTo,
		onEnter: animationHook,
		onLeave: animationHook,
	}

	if (appear) {
		transitionData.onAppear = animationHook
	}

	const mergedData = mergeData(data, transitionData)
	delete mergedData.duration
	return mergedData
}
