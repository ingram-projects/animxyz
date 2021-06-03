import React, { Children, cloneElement, isValidElement } from 'react'
import { TransitionGroup } from 'react-transition-group'
import XyzTransitionBase from './XyzTransitionBase'
function XyzTransitionGroup(props) {
	const {
		appearVisible,
		duration,
		mountOnEnter,
		unmountOnExit,
		addEndListener,
		onEnter,
		onEntering,
		onEntered,
		onExit,
		onExiting,
		onExited,
		children,
		...rest
	} = props

	const baseProps = {
		appearVisible,
		duration,
		mountOnEnter,
		unmountOnExit,
		addEndListener,
		onEnter,
		onEntering,
		onEntered,
		onExit,
		onExiting,
		onExited,
	}

	const childArray = Children.toArray(children).filter(isValidElement)

	return (
		<TransitionGroup {...rest}>
			{childArray.map((child, index) => (
				<XyzTransitionBase {...baseProps} key={child.key}>
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
