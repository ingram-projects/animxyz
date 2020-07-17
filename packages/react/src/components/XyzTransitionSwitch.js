import React, { Children } from 'react'
import { SwitchTransition } from 'react-transition-group'
import XyzTransition from './XyzTransition'

function XyzTransitionSwitch(props) {
	const { mode, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransitionSwitch must have a single truthy child at all times')
	}

	const child = childArray[0]

	return (
		<SwitchTransition mode={mode}>
			<XyzTransition {...rest} key={child.key}>
				{child}
			</XyzTransition>
		</SwitchTransition>
	)
}

XyzTransitionSwitch.propTypes = {
	...SwitchTransition.propTypes,
	...XyzTransition.propTypes,
}

export default XyzTransitionSwitch
