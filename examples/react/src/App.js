import React, { useState } from 'react'
import { XyzTransition, XyzTransitionGroup } from '@animxyz/react'

function App() {
	const [toggled, setToggled] = useState(false)

	return (
		<div className="App">
			<XyzTransitionGroup appear xyz="fade down duration-10 stagger">
				<div>Hello!</div>
				<div>Hello!</div>
				<div>Hello!</div>
				<div>Hello!</div>
			</XyzTransitionGroup>

			<XyzTransition appear state={toggled} mode="out-in" xyz="fade turn-ccw duration-10">
				{!toggled && <button onClick={() => setToggled(!toggled)}>Toggle</button>}
				{toggled && <button onClick={() => setToggled(!toggled)}>Toggled!</button>}
			</XyzTransition>
		</div>
	)
}

export default App
