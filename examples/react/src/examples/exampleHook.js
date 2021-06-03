import { useState, useRef, useEffect } from 'react'

export default function exampleHook() {
	const [animCount, setAnimCount] = useState(0)
	const [toggled, setToggled] = useState(0)
	const toggleTimeout = useRef(null)

	function clearToggleTimeout() {
		clearTimeout(toggleTimeout.current)
		toggleTimeout.current = null
	}

	function toggleExample() {
		setAnimCount(0)
		clearToggleTimeout()
		toggleTimeout.current = setTimeout(() => {
			setToggled(!toggled)
		}, 1000)
	}

	function beforeAnim() {
		const newAnimCount = animCount - 1
		setAnimCount(newAnimCount)
	}

	function afterAnim() {
		const newAnimCount = animCount - 1
		setAnimCount(newAnimCount)
		if (newAnimCount === 0) {
			toggleExample()
		}
	}

	useEffect(() => {
		toggleExample()
		return () => {
			clearToggleTimeout()
		}
	}, [])

	return {
		toggled: toggled,
		beforeAppear: beforeAnim,
		beforeEnter: beforeAnim,
		beforeLeave: beforeAnim,
		afterAppear: afterAnim,
		afterEnter: afterAnim,
		afterLeave: afterAnim,
		appearCancelled: afterAnim,
		enterCancelled: afterAnim,
		leaveCancelled: afterAnim,
	}
}
