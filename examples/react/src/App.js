import React, { useState } from 'react'
import { xyz, XyzTransitionGroup, XyzTransition } from '@animxyz/react'
import './App.scoped.scss'

function App() {
	const [switchState, setSwitchState] = useState(0)

	function changeState() {
		setSwitchState(switchState < 3 ? switchState + 1 : 0)
	}

	return (
		<div>
			<XyzTransitionGroup appear xyz="fade down duration-10 stagger">
				{[...Array(5)].map((e, index) => {
					return <div key={index}>Hello</div>
				})}
			</XyzTransitionGroup>

			<XyzTransition appear mode="out-in" xyz={xyz(['fade'])}>
				{switchState && <div key={switchState}>State {switchState}</div>}
			</XyzTransition>
			<button onClick={changeState}>changeState</button>
		</div>
	)
}

export default App
