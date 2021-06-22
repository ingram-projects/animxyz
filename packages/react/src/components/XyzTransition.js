import React, { Children, Fragment, isValidElement } from 'react'
import { SwitchTransition } from 'react-transition-group'
import XyzTransitionBase from './XyzTransitionBase'

function XyzTransition(props) {
	const { mode, children, ...rest } = props

	const childArray = Children.toArray(children).filter(isValidElement)

	if (childArray.length > 1) {
		throw new Error('XyzTransition can have no more than one child at any point')
	}

	const child = childArray.length === 1 ? childArray[0] : <Fragment />

	return (
		<SwitchTransition mode={mode}>
			<XyzTransitionBase {...rest} key={child.key}>
				{child}
			</XyzTransitionBase>
		</SwitchTransition>
	)
}

XyzTransition.propTypes = {
	...SwitchTransition.propTypes,
	...XyzTransitionBase.propTypes,
}

export default XyzTransition
