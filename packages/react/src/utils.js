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
		addEndListener: (done) => {
			// `nodeRef` is always the internal ref OBJECT (see XyzTransitionBase), so
			// `nodeRef.current` is the DOM node — or null/undefined when no element is
			// attached (empty-state Fragment, or a transition resolved before mount).
			// Guard the hook against a missing element: without a node there is no
			// animation to wait on, so resolve immediately instead of dereferencing
			// `el.classList` and throwing. Defense in depth for both A6 failure paths.
			const el = nodeRef && nodeRef.current
			if (!el) {
				done()
				return
			}
			animationHook(el, done)
		},
	}

	const mergedProps = mergeProps(transitionProps, props)

	delete mergedProps.appearVisible
	delete mergedProps.duration
	return mergedProps
}
