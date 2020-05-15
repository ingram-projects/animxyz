import { Children, useRef, useEffect, createElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { xyzTransitionClasses } from '../xyzUtils'

function XyzTransitionVisible(props) {
	const { xyz, once = true, container, margin, threshold = 1, component = 'div', children, ...rest } = props

	const intersectionObserverRef = useRef(null)
	const childrenRefs = useRef(new Set())

	function showElem(el) {
		el.style.visibility = 'visible'
		el.classList.add(xyzTransitionClasses.enterActive)
	}

	function hideElem(el) {
		el.style.visibility = 'hidden'
		el.classList.remove(xyzTransitionClasses.enterActive)
	}

	function addElemRef(el) {
		childrenRefs.current.add(el)
		if (intersectionObserverRef.current) {
			intersectionObserverRef.current.observe(el)
		}
	}

	function removeElemRef(el) {
		childrenRefs.current.remove(el)
		if (intersectionObserverRef.current) {
			intersectionObserverRef.current.unobserve(el)
		}
	}

	function elemCallbackRef(el) {
		if (el) {
			addElemRef(el)
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
						showElem(entry.target)
						if (once) {
							removeElemRef(entry.target)
						}
					}
				} else {
					hideElem(entry.target)
				}
			})
		}, intersectionObserverOptions)

		childrenRefs.current.forEach((entry) => {
			intersectionObserverRef.current.observe(entry)
		})

		return () => {
			clearIntersectionObserver()
		}
	}, [once, container, margin, threshold])

	const childArray = Children.toArray(children).filter(Boolean)

	const newChildren = childArray.map((child) => {
		return cloneElement(child, { ref: elemCallbackRef, style: { visibility: 'hidden' } })
	})

	return createElement(component, { xyz, ...rest }, newChildren)
}

XyzTransitionVisible.propTypes = {
	xyz: PropTypes.string,
	once: PropTypes.bool,
	threshold: PropTypes.number,
	margin: PropTypes.string,
	container: PropTypes.node,
	component: PropTypes.string,
	children: PropTypes.node,
}

export default XyzTransitionVisible
