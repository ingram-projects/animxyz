import React, { Children, cloneElement } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

export default function (props) {
	const { state, mode, xyz, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const newChildren = (
		<CSSTransition {...xyzTransitionProps} key={state} {...rest}>
			{cloneElement(childArray[0], { xyz })}
		</CSSTransition>
	)

	return <SwitchTransition mode={mode}>{newChildren}</SwitchTransition>
}
