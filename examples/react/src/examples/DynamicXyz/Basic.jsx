import React, { useState } from 'react'
import { xyz, XyzTransition } from '@animxyz/react'
import exampleHook from '../exampleHook'

export default function Example() {
	const data = exampleHook()

	const [xyzUtilities, setXyzUtilities] = useState({
		down: false,
		small: false,
		'rotate-right': false,
	})

	function handleXyzUtilitiesChange(event) {
		setXyzUtilities({
			...xyzUtilities,
			[event.target.name]: event.target.checked,
		})
	}

	return (
		<div className="example-wrap flex-col">
			<XyzTransition xyz={xyz('fade duration-10', xyzUtilities)} {...data.listeners}>
				{data.toggled && <div className="square" />}
			</XyzTransition>
			<div className="flex-row mt-l">
				<label className="example-checkbox mt-l">
					<input type="checkbox" name="down" checked={xyzUtilities['down']} onChange={handleXyzUtilitiesChange} />
					<span>down</span>
				</label>
				<label className="example-checkbox mt-l">
					<input type="checkbox" name="small" checked={xyzUtilities['small']} onChange={handleXyzUtilitiesChange} />
					<span>small</span>
				</label>
				<label className="example-checkbox mt-l">
					<input
						type="checkbox"
						name="rotate-right"
						checked={xyzUtilities['rotate-right']}
						onChange={handleXyzUtilitiesChange}
					/>
					<span>rotate-right</span>
				</label>
			</div>
		</div>
	)
}
