import { xyzTransitionClasses, getXyzAnimationHook } from '../../../../utils'

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

	const mergedData = {
		...data,
		...transitionData,
	}

	delete mergedData.duration
	return mergedData
}
