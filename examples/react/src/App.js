import React, { useState } from 'react'
import { xyz, XyzTransitionGroup, XyzTransitionSwitch } from '@animxyz/react'
import './App.scoped.scss'

const switchStates = ['one', 'two', 'three', 'four', 'five']

function App() {
	const [switchState, setSwitchState] = useState(switchStates[0])

	function randomState() {
		setSwitchState(switchStates[Math.floor(Math.random() * switchStates.length)])
	}

	return (
		<div>
			<XyzTransitionGroup appear xyz="fade down duration-10 stagger">
				{[...Array(5)].map((e, index) => {
					return <div key={index}>Hello</div>
				})}
			</XyzTransitionGroup>

			<XyzTransitionSwitch appear mode="out-in" xyz={xyz(['fade', 'rotate-right', 'duration-10', 'big-100%'])}>
				<button onClick={randomState} key={switchState}>
					State {switchState}
				</button>
			</XyzTransitionSwitch>
		</div>
	)
}

export default App
