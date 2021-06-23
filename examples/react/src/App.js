import React, { StrictMode } from 'react'
import { XyzTransitionGroup } from '@animxyz/react'
import examples from './examples'
import './App.scoped.scss'

function App() {
	return (
		<StrictMode>
			<XyzTransitionGroup className="example-list" appearVisible xyz="fade small delay-1">
				{Object.entries(examples).map(([exampleName, Example]) => (
					<div className="example-item" key={exampleName}>
						<h1 className="example-title mb-s">{exampleName}</h1>
						<div className="example-content">
							<Example />
						</div>
					</div>
				))}
			</XyzTransitionGroup>
		</StrictMode>
	)
}

export default App
