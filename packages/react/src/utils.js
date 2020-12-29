import { xyzTransitionClasses, getXyzAnimationHook } from '../../../utils'

export function getXyzTransitionProps(props) {
	const { duration } = props || {}

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
		addEndListener: getXyzAnimationHook(duration),
	}

	const mergedProps = {
		...props,
		...transitionProps,
		classNames: {
			...props.classNames,
			...transitionProps.classNames,
		},
	}

	delete mergedProps.duration
	return mergedProps
}
