import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { getXyzTransitionProps } from '../utils'

function XyzTransition(props) {
	const { xyz, className, style, children, ...rest } = props

	const xyzTransitionProps = getXyzTransitionProps(rest)

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
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

XyzTransition.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	duration: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['auto']),
		PropTypes.shape({
			appear: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
			in: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
			out: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
		}),
	]),
	children: PropTypes.node,
}
delete XyzTransition.propTypes.timeout

export default XyzTransition
