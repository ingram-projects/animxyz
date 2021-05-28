import React, { Children, cloneElement, isValidElement } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { getXyzTransitionProps } from '../utils'

function XyzTransitionBase(props) {
	const { xyz, className, style, children, ...rest } = props

	const xyzTransitionProps = getXyzTransitionProps(rest)

	const childArray = Children.toArray(children).filter(isValidElement)

	if (childArray.length !== 1) {
		throw new Error('XyzTransitionBase must have a single truthy child at all times')
	}

	const child = childArray[0]

	return (
		<CSSTransition {...xyzTransitionProps}>
			{cloneElement(child, {
				xyz,
				...child.props,
				className: clsx(className, child.props.className),
				style: {
					...style,
					...child.props.style,
				},
			})}
		</CSSTransition>
	)
}

XyzTransitionBase.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	appearVisible: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
	children: PropTypes.node,
}
delete XyzTransitionBase.propTypes.timeout

export default XyzTransitionBase
