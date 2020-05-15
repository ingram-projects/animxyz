import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useXyzAppearVisible from '../hooks/xyzAppearVisible'
import { xyzTransitionProps } from '../xyzUtils'

function XyzTransitionGroup(props) {
	const { xyz, appear, appearVisible, children, ...rest } = props

	const computedAppear = appearVisible ? false : appear
	const appearVisibleChildProps = useXyzAppearVisible(appearVisible)

	const childArray = Children.toArray(children).filter(Boolean)

	const newChildren = childArray.map((child) => (
		<CSSTransition {...xyzTransitionProps} key={child.key}>
			{cloneElement(child, { ...appearVisibleChildProps, ...child.props })}
		</CSSTransition>
	))

	return (
		<TransitionGroup xyz={xyz} appear={computedAppear} {...rest}>
			{newChildren}
		</TransitionGroup>
	)
}

XyzTransitionGroup.propTypes = {
	...CSSTransition.propTypes,
	...TransitionGroup.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.number,
	children: PropTypes.node,
}

export default XyzTransitionGroup
