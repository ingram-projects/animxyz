import React from 'react'
import { xyz, XyzTransitionGroup } from '@animxyz/react'
import exampleHook from '../exampleHook'

export default function Example() {
	const data = exampleHook()

	return (
		<div className="example-wrap flex-col">
			<XyzTransitionGroup className="example-grid example-grid-9" {...data.listeners}>
				{data.toggled &&
					[...Array(81)].map((_, index) => (
						<div
							className="square"
							xyz={xyz('fade out-small-50% out-duration-30', {
								'in-down-50% in-right-50% in-stagger-1': index <= 41,
								'in-up-50% in-left-50% in-stagger-rev-1': index > 41,
								'out-rotate-right-5': index % 2,
								'out-rotate-left-5': (index + 1) % 2,
							})}
							key={index}
						/>
					))}
			</XyzTransitionGroup>
		</div>
	)
}
