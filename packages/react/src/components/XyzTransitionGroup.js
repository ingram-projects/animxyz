import React, { Children, isValidElement } from 'react'
import { TransitionGroup } from 'react-transition-group'
import XyzTransitionBase from './XyzTransitionBase'
function XyzTransitionGroup(props) {
	const {
		xyz,
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

	// Only pass data-xyz when set: `component={React.Fragment}` warns about any
	// prop besides key and children, even an undefined one.
	const groupProps = xyz === undefined ? rest : { ...rest, 'data-xyz': xyz }

	return (
		<TransitionGroup {...groupProps}>
			{childArray.map((child, index) => (
				<XyzTransitionBase
					{...baseProps}
					style={{
						'--xyz-index': index,
						'--xyz-index-rev': childArray.length - index - 1,
					}}
					key={child.key}
				>
					{child}
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
