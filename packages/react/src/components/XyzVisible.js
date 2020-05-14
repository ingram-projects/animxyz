import { useRef, useEffect, createElement } from 'react'
import PropTypes from 'prop-types'

function XyzVisible(props) {
	const { appear = true, once = true, threshold = 1, margin, container, tag = 'div', children, ...rest } = props

	const ref = useRef()
	const intersectionObserverRef = useRef(null)

	function clearIntersectionObserver() {
		if (intersectionObserverRef.current) {
			intersectionObserverRef.current.disconnect()
			intersectionObserverRef.current = null
		}
	}

	function show(el) {
		el.style.visibility = 'visible'
		el.classList.add('xyz-in')
		if (appear) {
			el.classList.add('xyz-appear')
		}
	}

	function hide(el) {
		el.style.visibility = 'hidden'
		el.classList.remove('xyz-in', 'xyz-appear')
	}

	useEffect(() => {
		hide(ref.current)

		const intersectionObserverOptions = {
			root: container,
			rootMargin: margin,
			threshold: [0, threshold],
		}

		clearIntersectionObserver()
		intersectionObserverRef.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.intersectionRatio >= threshold) {
						show(entry.target)
						if (once) {
							clearIntersectionObserver()
						}
					}
				} else {
					hide(entry.target)
				}
			})
		}, intersectionObserverOptions)

		intersectionObserverRef.current.observe(ref.current)

		return () => {
			clearIntersectionObserver()
		}
	}, [threshold, container, margin])

	return createElement(tag, { ref, ...rest }, children)
}

XyzVisible.propTypes = {
	children: PropTypes.node,
	appear: PropTypes.bool,
	once: PropTypes.bool,
	threshold: PropTypes.number,
	margin: PropTypes.string,
	container: PropTypes.node,
	tag: PropTypes.string,
}

export default XyzVisible
