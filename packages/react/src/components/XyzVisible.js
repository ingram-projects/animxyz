import { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import useXyzVisible from '../hooks/useXyzVisible'

function XyzVisible(props) {
	const { xyz, once, container, margin, threshold, children, ...rest } = props

	const xyzVisibleChildProps = useXyzVisible({
		once,
		container,
		margin,
		threshold,
	})

	const child = Children.only(children)

	return cloneElement(child, { xyz, ...xyzVisibleChildProps, ...rest, ...child.props })
}

XyzVisible.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	once: PropTypes.bool,
	container: PropTypes.node,
	margin: PropTypes.string,
	threshold: PropTypes.number,
	children: PropTypes.node,
}

export default XyzVisible
