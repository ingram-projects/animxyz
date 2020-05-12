import React from 'react'
import { XyzTransitionGroup } from '@animxyz/react'

function App() {
	return (
		<div className="App">
			<XyzTransitionGroup appear xyz="fade down duration-30">
				<div>Hello!</div>
			</XyzTransitionGroup>
		</div>
	)
}

export default App
