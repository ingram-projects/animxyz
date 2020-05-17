import React, { Children, useRef, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import useXyzVisible from '../hooks/useXyzVisible'
import { xyzTransitionProps } from '../xyzUtils'

function XyzVisible(props) {
	const { xyz, once, container, margin, threshold, children, ...rest } = props

	const ref = useRef(null)

	const visible = useXyzVisible({
		ref,
		once,
		container,
		margin,
		threshold,
	})

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransitionVisible must have a single truthy child at all times')
	}

	const child = childArray[0]

	const style = {
		...child.props.style,
		visibility: visible || 'hidden',
	}

	return (
		<CSSTransition in={visible} {...xyzTransitionProps} {...rest}>
			{cloneElement(child, { xyz, ref, style, ...child.props })}
		</CSSTransition>
	)
}

XyzVisible.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.number,
	once: PropTypes.bool,
	container: PropTypes.node,
	margin: PropTypes.string,
	threshold: PropTypes.number,
	children: PropTypes.node,
}

export default XyzVisible
