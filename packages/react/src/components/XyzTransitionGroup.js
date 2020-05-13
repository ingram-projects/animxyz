import React, { Children } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

export default function (props) {
	const { component, childFactory, xyz, children, ...rest } = props

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
