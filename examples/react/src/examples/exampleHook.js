import { useState, useRef, useEffect, useCallback } from 'react'

// Time each transition phase gets to run before the toggle fires anyway.
// Transition end callbacks can be lost entirely — react-transition-group
// skips onEntered when a transition is interrupted mid-flight — so an
// in-flight phase is bounded instead of awaited forever.
const SAFETY_DELAY = 5000
// Quiet time after the last completed transition before toggling.
const SETTLE_DELAY = 1000

// Drives the auto-looping examples by flipping `toggled` once the current
// enter/exit animations settle. The delay is debounced off the transition
// callbacks rather than counted with a +1/-1 balance: under React 18
// StrictMode react-transition-group fires onEnter twice for newly mounted
// children (double componentDidMount) while onEntered fires once, so a
// counter wedges above zero and the loop dies. Debouncing only assumes
// callbacks fire at all, not that they pair up.
export default function exampleHook() {
	const [toggled, setToggled] = useState(false)
	const toggleTimeout = useRef(null)

	const armToggle = useCallback((delay) => {
		clearTimeout(toggleTimeout.current)
		toggleTimeout.current = setTimeout(() => {
			setToggled((oldToggled) => !oldToggled)
		}, delay)
	}, [])

	const beforeAnim = useCallback(() => armToggle(SAFETY_DELAY), [armToggle])
	const afterAnim = useCallback(() => armToggle(SETTLE_DELAY), [armToggle])

	useEffect(() => {
		armToggle(SETTLE_DELAY)
		return () => clearTimeout(toggleTimeout.current)
	}, [armToggle])

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
