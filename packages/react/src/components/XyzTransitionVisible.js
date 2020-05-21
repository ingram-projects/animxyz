import React, { Children, useState, useRef, useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'
import XyzTransition from './XyzTransition'

function XyzVisible(props) {
	const { once = true, container, margin, threshold = 1, children, ...rest } = props

	const [visible, setVisible] = useState(false)
	const ref = useRef(null)
	const intersectionObserverRef = useRef(null)

	function updateElem() {
		if (intersectionObserverRef.current && ref.current) {
			intersectionObserverRef.current.observe(ref.current)
		}
	}

	function clearIntersectionObserver() {
		if (intersectionObserverRef.current) {
			intersectionObserverRef.current.disconnect()
			intersectionObserverRef.current = null
		}
	}

	useEffect(() => {
		const intersectionObserverOptions = {
			root: container,
			rootMargin: margin,
			threshold: [0, threshold],
		}

		intersectionObserverRef.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.intersectionRatio >= threshold) {
						setVisible(true)
						if (once) {
							clearIntersectionObserver()
						}
					}
				} else if (!once) {
					setVisible(false)
				}
			})
		}, intersectionObserverOptions)

		updateElem()

		return () => {
			clearIntersectionObserver()
		}
	}, [once, container, margin, threshold])

	useEffect(() => {
		updateElem()
	}, [ref.current])

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransitionVisible must have a single truthy child at all times')
	}

	const child = childArray[0]

	const style = {
		...child.props.style,
		visibility: visible || 'hidden',
	}

	return (
		<XyzTransition in={visible} {...rest}>
			{cloneElement(child, { ref, style })}
		</XyzTransition>
	)
}

XyzVisible.propTypes = {
	...XyzTransition.propTypes,
	once: PropTypes.bool,
	container: PropTypes.node,
	margin: PropTypes.string,
	threshold: PropTypes.number,
}

export default XyzVisible
