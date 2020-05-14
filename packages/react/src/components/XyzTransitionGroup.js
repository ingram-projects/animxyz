import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { xyzTransitionProps } from '../xyzUtils'

function XyzTransitionGroup(props) {
	const { xyz, component, childFactory, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)
	const newChildren = childArray.map((child) => (
		<CSSTransition {...xyzTransitionProps} key={child.key} {...rest}>
			{child}
		</CSSTransition>
	))

	return (
		<TransitionGroup component={component} childFactory={childFactory} xyz={xyz}>
			{newChildren}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...CSSTransition.propTypes,
	...TransitionGroup.propTypes,
	children: PropTypes.node,
	timeout: PropTypes.number,
	xyz: PropTypes.string,
}

export default XyzTransitionGroup
