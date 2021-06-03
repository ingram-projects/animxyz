import React, { useState } from 'react'
import { XyzTransition } from '@animxyz/react'

export default function ToggleExample() {
	const shapes = ['square', 'circle', 'triangle']
	const [shapeIndex, setShapeIndex] = useState(0)

	function changeShape() {
		let newShapeIndex = shapeIndex + 1
		if (newShapeIndex === shapes.length) {
			newShapeIndex = 0
		}
		setShapeIndex(newShapeIndex)
	}

	return (
		<div className="example-wrap flex-col">
			<XyzTransition appear mode="out-in">
				{shapes[shapeIndex] === 'square' && <div className="square" xyz="fade left-100%" key="square" />}
				{shapes[shapeIndex] === 'circle' && <div className="circle" xyz="fade up-100%" key="circle" />}
				{shapes[shapeIndex] === 'triangle' && <div className="triangle" xyz="fade right-100%" key="triangle" />}
			</XyzTransition>
			<button className="example-button mt-l" onClick={changeShape}>
				Click to switch
			</button>
		</div>
	)
}
