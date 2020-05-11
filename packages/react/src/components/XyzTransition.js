import React, { cloneElement } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

export default function (props) {
	const { state, mode, xyz, children, ...rest } = props

	const newChildren = (
		<CSSTransition {...xyzTransitionProps} key={state} {...rest}>
			{cloneElement(children, { xyz })}
		</CSSTransition>
	)

	return <SwitchTransition mode={mode}>{newChildren}</SwitchTransition>
}
