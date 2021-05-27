import React from 'react'
import { SwitchTransition } from 'react-transition-group'
import XyzTransitionBase from './XyzTransitionBase'

function XyzTransition(props) {
	const { mode, children, ...rest } = props

	return (
		<SwitchTransition mode={mode}>
			<XyzTransitionBase {...rest}>{children}</XyzTransitionBase>
		</SwitchTransition>
	)
}

XyzTransition.propTypes = {
	...SwitchTransition.propTypes,
	...XyzTransitionBase.propTypes,
}

export default XyzTransition
