import React, { useState } from 'react'
import { XyzTransition } from '@animxyz/react'

export default function Example() {
	const [key, setKey] = useState(1)

	return (
		<div className="example-wrap flex-col">
			<XyzTransition appear mode="out-in" xyz="flip-up out-flip-down duration-3 ease-out">
				<div className="square text--xxl fw--bold" key={key}>
					{key}
				</div>
			</XyzTransition>
			<button className="example-button mt-l" onClick={() => setKey(key + 1)}>
				Click to increment
			</button>
		</div>
	)
}
