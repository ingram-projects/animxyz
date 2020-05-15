import { useRef, useEffect } from 'react'
import { xyzTransitionClasses } from '../xyzUtils'

function useXyzVisible(props) {
	const { once = true, container, margin, threshold = 1 } = props

	const intersectionObserverRef = useRef(null)
	const elemRef = useRef(null)

	function showElem(el) {
		el.style.visibility = 'visible'
		el.classList.add(xyzTransitionClasses.enterActive, xyzTransitionClasses.appearActive)
	}

	function hideElem(el) {
		el.style.visibility = 'hidden'
		el.classList.remove(xyzTransitionClasses.enterActive, xyzTransitionClasses.appearActive)
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
							clearIntersectionObserver()
						}
					}
				} else {
					hideElem(entry.target)
				}
			})
		}, intersectionObserverOptions)

		return () => {
			clearIntersectionObserver()
		}
	}, [once, container, margin, threshold])

	useEffect(() => {
		if (elemRef.current) {
			intersectionObserverRef.current.observe(elemRef.current)
		}
	}, [elemRef.current, intersectionObserverRef.current])

	return { ref: elemRef, style: { visibility: 'hidden' } }
}

export default useXyzVisible
