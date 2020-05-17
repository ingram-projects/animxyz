import { useState, useRef, useEffect } from 'react'

function useXyzVisible(props) {
	const { ref, once = true, container, margin, threshold = 1 } = props

	const [visible, setVisible] = useState(false)
	const intersectionObserverRef = useRef(null)

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

		return () => {
			clearIntersectionObserver()
		}
	}, [once, container, margin, threshold])

	useEffect(() => {
		if (ref.current && intersectionObserverRef.current) {
			intersectionObserverRef.current.observe(ref.current)
		}
	}, [ref.current, intersectionObserverRef.current])

	return visible
}

export default useXyzVisible
