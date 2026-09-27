import React, { Children, cloneElement, Fragment, isValidElement, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { clearXyzElement } from '../../../../utils'
import { getXyzTransitionProps } from '../utils'

// Assign a DOM node (or null) to a child's ref, whichever form it takes.
// Object refs get `.current` set; callback refs get invoked; nullish refs no-op.
function assignRef(ref, node) {
	if (!ref) return
	if (typeof ref === 'function') {
		ref(node)
	} else {
		ref.current = node
	}
}

function XyzTransitionBase(props) {
	const { xyz, className, style, children, onExited, ...rest } = props

	const childArray = Children.toArray(children).filter(isValidElement)

	if (childArray.length !== 1) {
		throw new Error('XyzTransitionBase must have a single truthy child at all times')
	}

	const child = childArray[0]

	// An empty <XyzTransition> renders a placeholder <Fragment/> as the child.
	// Fragments accept only `key`/`children`, so we must NOT clone xyz/className/
	// style/ref onto them (React warns and the ref silently never attaches).
	const isFragment = child.type === Fragment

	// CSSTransition ALWAYS receives this internal ref object, never the child's
	// raw ref. That keeps `nodeRef.current` a real element (or null) so the end
	// listener never sees a function ref or an undefined `.current`.
	const nodeRef = useRef(null)

	// Compose the internal ref with the child's own ref (object OR callback form),
	// so consumer refs keep working while we still get the node for the hook.
	const childRef = isFragment ? null : child.ref
	const composedRef = useCallback(
		(node) => {
			nodeRef.current = node
			assignRef(childRef, node)
		},
		[childRef]
	)

	const xyzTransitionProps = getXyzTransitionProps({
		...rest,
		nodeRef,
	})

	// Tear down the appear IntersectionObserver + any pending animation timeouts
	// when the element leaves or the component unmounts (idempotent).
	const handleExited = useCallback(
		(...args) => {
			clearXyzElement(nodeRef.current)
			if (onExited) {
				onExited(...args)
			}
		},
		[onExited]
	)

	useEffect(() => {
		return () => clearXyzElement(nodeRef.current)
	}, [])

	return (
		<CSSTransition {...xyzTransitionProps} nodeRef={nodeRef} onExited={handleExited}>
			{isFragment
				? child
				: cloneElement(child, {
						'data-xyz': xyz,
						...child.props,
						className: clsx(className, child.props.className),
						style: {
							...style,
							...child.props.style,
						},
						ref: composedRef,
				  })}
		</CSSTransition>
	)
}

XyzTransitionBase.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	appearVisible: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
	children: PropTypes.node,
}
delete XyzTransitionBase.propTypes.timeout

export default XyzTransitionBase
