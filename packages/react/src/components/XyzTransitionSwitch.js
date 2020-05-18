import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { SwitchTransition } from 'react-transition-group'
import XyzTransition from './XyzTransition'

function XyzTransitionSwitch(props) {
	const { state, mode, children, ...rest } = props

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const child = childArray[0]

	return (
		<SwitchTransition mode={mode}>
			<XyzTransition {...rest} key={state}>
				{child}
			</XyzTransition>
		</SwitchTransition>
	)
}

XyzTransitionSwitch.propTypes = {
	...SwitchTransition.propTypes,
	...XyzTransition.propTypes,
	state: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
}

export default XyzTransitionSwitch
