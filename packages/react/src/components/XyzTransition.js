import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

function XyzTransition(props) {
	const { xyz, state, mode, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const newChildren = (
		<CSSTransition {...xyzTransitionProps} key={state} {...rest}>
			{cloneElement(childArray[0], { xyz })}
		</CSSTransition>
	)

	return <SwitchTransition mode={mode}>{newChildren}</SwitchTransition>
}

XyzTransition.propTypes = {
	...CSSTransition.propTypes,
	...SwitchTransition.propTypes,
	state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
	children: PropTypes.node,
	timeout: PropTypes.number,
	xyz: PropTypes.string,
}

export default XyzTransition
