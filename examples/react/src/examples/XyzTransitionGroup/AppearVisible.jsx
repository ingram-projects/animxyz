import React from 'react'
import { XyzTransitionGroup } from '@animxyz/react'
import './AppearVisible.scoped.scss'

export default function Example() {
	return (
		<div className="example-wrap">
			<div className="scroll-wrap">
				<XyzTransitionGroup appearVisible className="example-grid" xyz="delay-2 fade small rotate-right">
					{[...Array(200)].map((_, index) => (
						<div className="square" key={index} />
					))}
				</XyzTransitionGroup>
			</div>
		</div>
	)
}
