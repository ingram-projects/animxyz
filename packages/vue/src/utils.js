import { deleteUndefined, xyzTransitionClasses, getXyzAnimationHook } from '../../../utils'
import { mergeData as vueFunctionalDataMerge } from 'vue-functional-data-merge'

export const xyzTransitionProps = {
	appear: Boolean,
	appearVisible: [Boolean, Object],
	duration: [Number, String, Object],
	mode: String,
	appearClass: String,
	appearActiveClass: String,
	appearToClass: String,
	enterClass: String,
	enterActiveClass: String,
	enterToClass: String,
	leaveClass: String,
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
	return vueFunctionalDataMerge(data1, data2)
}

export function getXyzTransitionData(data) {
	deleteUndefined(data.attrs)
	data.attrs.appear = Boolean(data.attrs.appear || data.attrs.appearVisible)
	const { appear, appearVisible, duration } = data.attrs

	const animationHook = getXyzAnimationHook(duration, appearVisible)

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

	const mergedData = mergeData(transitionData, data)

	delete mergedData.attrs.appearVisible
	delete mergedData.attrs.duration
	return mergedData
}
