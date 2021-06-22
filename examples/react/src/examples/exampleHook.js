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
		setAnimCount((oldAnimCount) => oldAnimCount + 1)
	}

	function afterAnim() {
		setAnimCount((oldAnimCount) => oldAnimCount - 1)
	}

	useEffect(() => {
		if (animCount === 0) {
			toggleExample()
		}
	}, [animCount])

	useEffect(() => {
		return () => {
			clearToggleTimeout()
		}
	}, [])

	return {
		toggled: toggled,
		listeners: {
			onEnter: beforeAnim,
			onEntered: afterAnim,
			onExit: beforeAnim,
			onExited: afterAnim,
		},
	}
}
