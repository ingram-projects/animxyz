import React from 'react'
import { XyzTransitionGroup } from '@animxyz/react'
import exampleHook from '../exampleHook'

export default function Example() {
	const data = exampleHook()

	return (
		<div className="example-wrap flex-col">
			<XyzTransitionGroup
				className="example-grid example-grid-9"
				xyz="fade small out-back-5"
				duration={2500}
				style={{
					'--xyz-in-stagger': '0.025s',
					'--xyz-out-stagger-rev': '0.025s',
				}}
				{...data.listeners}
			>
				{data.toggled &&
					[...Array(81)].map((_, index) => (
						<div className="square" key={index} style={{ '--xyz-index-rev': Math.random() * 81 }} />
					))}
			</XyzTransitionGroup>
		</div>
	)
}
