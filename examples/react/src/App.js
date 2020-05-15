import React, { useState } from 'react'
import { XyzTransition, XyzTransitionGroup } from '@animxyz/react'

function App() {
	const [toggled, setToggled] = useState(false)

	function toggle () {
		setToggled(!toggled)
	}

	return (
		<div>
			<XyzTransitionGroup appearVisible xyz="fade down duration-10 stagger">
				{[...Array(5)].map((e, index) => {
					return <div key={index}>Hello</div>
				})}
			</XyzTransitionGroup>

			<XyzTransition appearVisible state={toggled} mode="out-in" xyz="fade down duration-10">
				{!toggled && <button onClick={toggle} xyz="fade flip-left">Toggle</button>}
				{toggled && <button onClick={toggle}>Untoggle</button>}
			</XyzTransition>

			<XyzTransitionGroup appearVisible xyz="fade down duration-10">
				{[...Array(100)].map((e, index) => {
					return <div key={index}>Visible</div>
				})}
			</XyzTransitionGroup>
		</div>
	)
}

export default App
