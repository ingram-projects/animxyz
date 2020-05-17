import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { xyzTransitionProps } from '../xyzUtils'

function XyzTransition(props) {
	const { xyz, state, mode, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const child = childArray[0]

	return (
		<SwitchTransition mode={mode}>
			<CSSTransition {...xyzTransitionProps} {...rest} key={state}>
				{cloneElement(child, { xyz, ...child.props })}
			</CSSTransition>
		</SwitchTransition>
	)
}

XyzTransition.propTypes = {
	...SwitchTransition.propTypes,
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.number,
	state: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	children: PropTypes.node,
}

export default XyzTransition
