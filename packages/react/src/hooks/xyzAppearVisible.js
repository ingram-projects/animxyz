import { useRef, useEffect } from 'react'
import { xyzTransitionClasses } from '../xyzUtils'

function useXyzAppearVisible(props) {
	const skip = !props
	const { once = true, container, margin, threshold = 1 } = props || {}

	const intersectionObserverRef = useRef(null)
	const childrenRefs = useRef(new Set())

	function showElem(el) {
		el.style.visibility = 'visible'
		el.classList.add(xyzTransitionClasses.enterActive, xyzTransitionClasses.appearActive)
	}

	function hideElem(el) {
		el.style.visibility = 'hidden'
		el.classList.remove(xyzTransitionClasses.enterActive, xyzTransitionClasses.appearActive)
	}

	function addElemRef(el) {
		childrenRefs.current.add(el)
		if (intersectionObserverRef.current) {
			intersectionObserverRef.current.observe(el)
		}
	}

	function removeElemRef(el) {
		childrenRefs.current.delete(el)
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
		if (!skip) {
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
		}
	}, [skip, once, container, margin, threshold])

	if (skip) return {}

	return { ref: elemCallbackRef, style: { visibility: 'hidden' } }
}

export default useXyzAppearVisible
