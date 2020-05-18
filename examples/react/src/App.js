import React, { useState } from 'react'
import { XyzTransitionGroup, XyzTransitionSwitch, XyzTransitionVisible } from '@animxyz/react'

const switchStates = ['one', 'two', 'three', 'four', 'five']

function App() {
	const [switchState, setSwitchState] = useState(switchStates[0])

	function randomState () {
		setSwitchState(switchStates[Math.floor(Math.random() * switchStates.length)])
	}

	return (
		<div>
			<XyzTransitionGroup appear xyz="fade down duration-10 stagger">
				{[...Array(5)].map((e, index) => {
					return <div key={index}>Hello</div>
				})}
			</XyzTransitionGroup>

			<XyzTransitionSwitch appear mode="out-in" xyz="fade down duration-10">
				<button onClick={randomState} xyz="fade flip-left" key={switchState}>State {switchState}</button>
			</XyzTransitionSwitch>

			{[...Array(100)].map((e, index) => {
				return (
					<XyzTransitionVisible appear xyz="fade down duration-10" key={index}>
						<div>Visible</div>
					</XyzTransitionVisible>
				)
			})}
		</div>
	)
}

export default App
