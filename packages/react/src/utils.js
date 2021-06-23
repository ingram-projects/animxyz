import { deleteUndefined, xyzTransitionClasses, getXyzAnimationHook } from '../../../utils'

function mergeProps(props1 = {}, props2 = {}) {
	return {
		...props1,
		...props2,
		classNames: {
			...props1.classNames,
			...props2.classNames,
		},
	}
}

export function getXyzTransitionProps(props = {}) {
	deleteUndefined(props)
	props.appear = Boolean(props.appear || props.appearVisible)
	const { appearVisible, duration, nodeRef } = props

	const animationHook = getXyzAnimationHook(duration, appearVisible)

	const transitionProps = {
		classNames: {
			appear: xyzTransitionClasses.appearFrom,
			appearActive: xyzTransitionClasses.appearActive,
			appearDone: xyzTransitionClasses.appearTo,
			enter: xyzTransitionClasses.inFrom,
			enterActive: xyzTransitionClasses.inActive,
			enterDone: xyzTransitionClasses.inTo,
			exit: xyzTransitionClasses.outFrom,
			exitActive: xyzTransitionClasses.outActive,
			exitDone: xyzTransitionClasses.outTo,
		},
		addEndListener: (done) => animationHook(nodeRef.current, done),
	}

	const mergedProps = mergeProps(transitionProps, props)

	delete mergedProps.appearVisible
	delete mergedProps.duration
	return mergedProps
}
