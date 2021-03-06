import React, { useState } from 'react'
import { XyzTransition } from '@animxyz/react'

export default function Example() {
	const [buttonToggled, setButtonToggled] = useState(true)

	return (
		<div className="example-wrap flex-col">
			<XyzTransition appear xyz="fade rotate-right ease-out-back">
				{buttonToggled && <div className="square" />}
			</XyzTransition>
			<button className="example-button mt-l" onClick={() => setButtonToggled(!buttonToggled)}>
				Click to toggle
			</button>
		</div>
	)
}
