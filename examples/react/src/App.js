import React, { useState } from 'react'
import { XyzTransition, XyzTransitionGroup, XyzVisible } from '@animxyz/react'

function App() {
	const [toggled, setToggled] = useState(false)

	function toggle () {
		setToggled(!toggled)
	}

	return (
		<div>
			<XyzTransitionGroup xyz="fade down duration-10 stagger">
				{[...Array(5)].map((e, index) => {
					return <div key={index}>Hello</div>
				})}
			</XyzTransitionGroup>

			<XyzTransition state={toggled} mode="out-in" xyz="fade down duration-10">
				{!toggled && <button onClick={toggle} xyz="fade flip-left">Toggle</button>}
				{toggled && <button onClick={toggle}>Untoggle</button>}
			</XyzTransition>

			{[...Array(100)].map((e, index) => {
				return (
					<XyzVisible xyz="fade down duration-10" key={index}>
						<div>Visible</div>
					</XyzVisible>
				)
			})}
		</div>
	)
}

export default App
