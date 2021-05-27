import React, { Children, cloneElement, isValidElement } from 'react'
import { TransitionGroup } from 'react-transition-group'
import XyzTransitionBase from './XyzTransitionBase'

function XyzTransitionGroup(props) {
	const { xyz, component = 'div', childFactory, className, style, children, ...rest } = props

	const childArray = Children.toArray(children).filter(isValidElement)

	return (
		<TransitionGroup component={component} xyz={xyz} className={className} style={style} childFactory={childFactory}>
			{childArray.map((child, index) => (
				<XyzTransitionBase {...rest} key={child.key}>
					{cloneElement(child, {
						style: {
							'--xyz-index': index,
							'--xyz-index-rev': childArray.length - index - 1,
							...child.props.style,
						},
					})}
				</XyzTransitionBase>
			))}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...TransitionGroup.propTypes,
	...XyzTransitionBase.propTypes,
}

export default XyzTransitionGroup
