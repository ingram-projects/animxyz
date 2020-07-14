import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { xyzTransitionProps, animationDoneHook } from '../xyzUtils'

function XyzTransition(props) {
	const { xyz, timeout, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const child = childArray[0]

	let addEndListener
	if (typeof timeout === 'undefined') {
		addEndListener = animationDoneHook
	}

	return (
		<CSSTransition timeout={timeout} addEndListener={addEndListener} {...xyzTransitionProps} {...rest}>
			{cloneElement(child, { xyz, ...child.props })}
		</CSSTransition>
	)
}

XyzTransition.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.number,
	children: PropTypes.node,
}

export default XyzTransition
