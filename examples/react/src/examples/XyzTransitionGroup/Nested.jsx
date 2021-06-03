import React, { useState } from 'react'
import { XyzTransitionGroup } from '@animxyz/react'

export default function Example() {
	const [numElements, setNumElements] = useState(3)

	function addElement() {
		setNumElements((oldNumElements) => oldNumElements + 1)
	}

	function removeElement() {
		setNumElements((oldNumElements) => {
			if (oldNumElements > 0) {
				return oldNumElements - 1
			}
			return oldNumElements
		})
	}

	return (
		<div className="example-wrap flex-col">
			<XyzTransitionGroup
				appear
				duration="auto"
				className="example-grid"
				xyz="fade flip-left origin-left duration-3 appear-stagger"
			>
				{[...Array(numElements)].map((_, index) => (
					<div className="item-block" key={index}>
						{[...Array(4)].map((_, subIndex) => (
							<div className="square xyz-nested" xyz="fade small stagger" key={subIndex} />
						))}
					</div>
				))}
			</XyzTransitionGroup>
			<div className="flex-row">
				<button className="example-button mt-l" onClick={addElement}>
					Add Element
				</button>
				<button className="example-button mt-l" onClick={removeElement}>
					Remove Element
				</button>
			</div>
		</div>
	)
}
