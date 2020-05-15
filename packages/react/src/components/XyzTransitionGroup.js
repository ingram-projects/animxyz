import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { xyzTransitionProps } from '../xyzUtils'

function XyzTransitionGroup(props) {
	const { xyz, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	const newChildren = childArray.map((child) => (
		<CSSTransition {...xyzTransitionProps} key={child.key}>
			{child}
		</CSSTransition>
	))

	return (
		<TransitionGroup xyz={xyz} {...rest}>
			{newChildren}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...CSSTransition.propTypes,
	...TransitionGroup.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.number,
	children: PropTypes.node,
}

export default XyzTransitionGroup
