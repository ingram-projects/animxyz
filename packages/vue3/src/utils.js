import { xyzTransitionClasses, getXyzAnimationHook } from '../../../utils'
import clsx from 'clsx'

export const xyzTransitionProps = {
	appear: Boolean,
	duration: [Number, String, Object],
	mode: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String,
}

export const xyzTransitionGroupProps = {
	...xyzTransitionProps,
	tag: {
		type: String,
		default: 'div',
	},
	moveClass: String,
}

export function mergeData(data1 = {}, data2 = {}) {
	return {
		...data1,
		...data2,
		style: {
			...data1.style,
			...data2.style,
		},
		class: clsx(data1.class, data2.class),
	}
}

export function getXyzTransitionData(data) {
	const { appear, duration } = data

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

	const mergedData = mergeData(transitionData, data)

	delete mergedData.duration
	return mergedData
}
