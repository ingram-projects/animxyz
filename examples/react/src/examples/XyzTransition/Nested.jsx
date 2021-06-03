import React, { useState } from 'react'
import { XyzTransition } from '@animxyz/react'

export default function ToggleExample() {
	const [buttonToggled, setButtonToggled] = useState(false)

	return (
		<div className="example-wrap flex-col">
			<XyzTransition appear duration="auto" xyz="fade up-100% duration-10">
				{buttonToggled && (
					<div className="item-block">
						{[...Array(4)].map((_, index) => (
							<div className="square xyz-nested" xyz="fade small stagger" key={index} />
						))}
					</div>
				)}
			</XyzTransition>
			<button className="example-button mt-l" onClick={() => setButtonToggled(!buttonToggled)}>
				Click to toggle
			</button>
		</div>
	)
}
