import React, { Children, cloneElement } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

export default function (props) {
	const { state, mode, xyz, children, ...rest } = props
	const childrenArray = Children.toArray(children)

	return (
		<SwitchTransition mode={mode}>
			<CSSTransition {...xyzTransitionProps} key={state} {...rest}>
				{childrenArray.map((child) => {
					return cloneElement(child, { xyz })
				})}
			</CSSTransition>
		</SwitchTransition>
	)
}
