import React, { Children } from 'react'
import { TransitionGroup } from 'react-transition-group'
import XyzTransition from './XyzTransition'

function XyzTransitionGroup(props) {
	const { xyz, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	return (
		<TransitionGroup xyz={xyz} {...rest}>
			{childArray.map((child) => (
				<XyzTransition key={child.key}>{child}</XyzTransition>
			))}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...TransitionGroup.propTypes,
	...XyzTransition.propTypes,
}

export default XyzTransitionGroup
