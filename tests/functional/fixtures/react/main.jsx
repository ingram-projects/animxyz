import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { XyzTransition, XyzTransitionGroup } from '@animxyz/react'
import '@animxyz/core'

window.log = []
const log = (name) => window.log.push(name)

function App() {
	const [showSingle, setShowSingle] = useState(false)
	const [switchState, setSwitchState] = useState('a')
	const [items, setItems] = useState([1, 2, 3])
	const [nextItem, setNextItem] = useState(4)

	return (
		<main>
			<section id="single">
				<button id="single-toggle" onClick={() => setShowSingle((show) => !show)}>
					single
				</button>
				<XyzTransition xyz="fade" onEntered={() => log('single:entered')} onExited={() => log('single:exited')}>
					{showSingle && <div id="single-box" className="box" style={{ '--xyz-duration': '50ms' }} />}
				</XyzTransition>
			</section>

			<section id="merge">
				<XyzTransition
					appear
					xyz="fade up"
					className="wrapper-class"
					style={{ '--xyz-duration': '50ms' }}
					onEntered={() => log('merge:entered')}
				>
					<div id="merge-box" className="child-class box" />
				</XyzTransition>
			</section>

			<section id="switch">
				<button id="switch-toggle" onClick={() => setSwitchState((s) => (s === 'a' ? 'b' : 'a'))}>
					switch
				</button>
				<XyzTransition
					xyz="fade"
					mode="out-in"
					onEntered={() => log('switch:entered')}
					onExited={() => log('switch:exited')}
				>
					<div className="box" key={switchState} id={`switch-${switchState}`} style={{ '--xyz-duration': '50ms' }} />
				</XyzTransition>
			</section>

			<section id="group-section">
				<button
					id="group-add"
					onClick={() => {
						setItems((current) => [...current, nextItem])
						setNextItem((n) => n + 1)
					}}
				>
					add
				</button>
				<button id="group-remove" onClick={() => setItems((current) => current.slice(1))}>
					remove
				</button>
				<XyzTransitionGroup
					id="group"
					appear
					xyz="fade"
					className="group-class"
					onEntered={() => log('group:entered')}
					onExited={() => log('group:exited')}
				>
					{items.map((item) => (
						<div key={item} id={`item-${item}`} className="box item" style={{ '--xyz-duration': '50ms' }}>
							{item}
						</div>
					))}
				</XyzTransitionGroup>
			</section>

			<section id="below-fold" style={{ marginTop: '3000px' }}>
				<XyzTransition appearVisible xyz="fade" onEntered={() => log('visible:entered')}>
					<div id="visible-box" className="box" style={{ '--xyz-duration': '50ms' }} />
				</XyzTransition>
			</section>
		</main>
	)
}

createRoot(document.getElementById('app')).render(<App />)
