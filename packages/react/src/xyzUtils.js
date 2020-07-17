export { default as xyz } from 'clsx'

export const xyzTransitionClasses = {
	appearFrom: 'xyz-appear-from',
	appearActive: 'xyz-appear',
	appearTo: 'xyz-appear-to',
	enterFrom: 'xyz-in-from',
	enterActive: 'xyz-in',
	enterTo: 'xyz-in-to',
	leaveFrom: 'xyz-out-from',
	leaveActive: 'xyz-out',
	leaveTo: 'xyz-out-to',
	move: 'xyz-move',
}

function getXyzTimeoutForMode(mode, timeout) {
	if (typeof timeout !== 'object' || timeout === null) {
		return timeout
	}
	switch (mode) {
		case 'appear':
			return timeout.appear
		case 'in':
			return timeout.enter
		case 'out':
			return timeout.exit
	}
	return null
}

function clearXyzProperties(el) {
	clearTimeout(el.xyzAnimTimeout)
	delete el.xyzAnimTimeout

	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}

function getXyzAnimationActiveHook(timeout) {
	return (el, done) => {
		clearXyzProperties(el)

		let mode
		if (el.classList.contains('xyz-appear')) {
			mode = 'appear'
		} else if (el.classList.contains('xyz-in')) {
			mode = 'in'
		} else if (el.classList.contains('xyz-out')) {
			mode = 'out'
		}

		const modeTimeout = getXyzTimeoutForMode(mode, timeout)

		if (typeof modeTimeout === 'number') {
			el.xyzAnimTimeout = setTimeout(done, modeTimeout)
		} else if (modeTimeout === 'auto') {
			const nestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)
			const visibleNestedEls = Array.from(nestedEls).filter((nestedEl) => {
				return nestedEl.offsetParent !== null
			})

			const animatingElsSet = new Set([el, ...visibleNestedEls])
			el.xyzAnimDone = (event) => {
				animatingElsSet.delete(event.target)
				if (animatingElsSet.size === 0) {
					done()
				}
			}
			el.addEventListener('animationend', el.xyzAnimDone, false)
		} else {
			el.xyzAnimDone = (event) => {
				if (event.target === el) {
					done()
				}
			}
			el.addEventListener('animationend', el.xyzAnimDone, false)
		}
	}
}

export function getXyzTransitionProps(props) {
	const classNames = {
		appear: xyzTransitionClasses.appearFrom,
		appearActive: xyzTransitionClasses.appearActive,
		appearDone: xyzTransitionClasses.appearTo,
		enter: xyzTransitionClasses.enterFrom,
		enterActive: xyzTransitionClasses.enterActive,
		enterDone: xyzTransitionClasses.enterTo,
		exit: xyzTransitionClasses.leaveFrom,
		exitActive: xyzTransitionClasses.leaveActive,
		exitDone: xyzTransitionClasses.leaveTo,
	}

	const { timeout } = props
	const addEndListener = getXyzAnimationActiveHook(timeout)

	const mergedProps = {
		...props,
		classNames: {
			...classNames,
			...props.classNames,
		},
		addEndListener,
	}
	delete mergedProps.timeout

	return mergedProps
}
