import React, { Children } from 'react'
import { TransitionGroup } from 'react-transition-group'
import XyzTransition from './XyzTransition'

function XyzTransitionGroup(props) {
	const { xyz, component, childFactory, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	return (
		<TransitionGroup xyz={xyz} component={component} childFactory={childFactory}>
			{childArray.map((child) => (
				<XyzTransition {...rest} key={child.key}>
					{child}
				</XyzTransition>
			))}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...XyzTransition.propTypes,
	...TransitionGroup.propTypes,
}

export default XyzTransitionGroup
