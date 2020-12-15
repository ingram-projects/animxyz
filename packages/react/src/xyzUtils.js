export { default as xyz } from 'clsx'

export const xyzTransitionClasses = {
	appearFrom: 'xyz-appear-from',
	appearActive: 'xyz-appear',
	appearTo: 'xyz-appear-to',
	inFrom: 'xyz-in-from',
	inActive: 'xyz-in',
	inTo: 'xyz-in-to',
	outFrom: 'xyz-out-from',
	outActive: 'xyz-out',
	outTo: 'xyz-out-to',
}

function getXyzElementMode(el) {
	if (el.classList.contains('xyz-appear')) {
		return 'appear'
	}
	if (el.classList.contains('xyz-in')) {
		return 'in'
	}
	if (el.classList.contains('xyz-out')) {
		return 'out'
	}
	return null
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

function clearXyzElementProperties(el) {
	clearTimeout(el.xyzAnimTimeout)
	el.removeEventListener('animationend', el.xyzAnimEnd)
	el.removeEventListener('animationcancelled', el.xyzAnimEnd)

	delete el.xyzAnimTimeout
	delete el.xyzAnimEnd
}

function getXyzAnimationHook(timeout) {
	return (el, done) => {
		clearXyzElementProperties(el)

		function xyzAnimDone() {
			done()
			clearXyzElementProperties(el)
		}

		const mode = getXyzElementMode(el)
		const modeTimeout = getXyzTimeoutForMode(mode, timeout)

		if (typeof modeTimeout === 'number') {
			el.xyzAnimTimeout = setTimeout(xyzAnimDone, modeTimeout)
			return
		}

		const xyzModeKeyframes = `xyz-${mode}-keyframes`
		const xyzEls = [el]

		if (modeTimeout === 'auto') {
			const xyzNestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)
			xyzEls.push(...Array.from(xyzNestedEls))
		}

		const xyzActiveEls = xyzEls.filter((xyzEl) => {
			// If element is invisible
			if (xyzEl.offsetParent === null) return false

			// If element isn't animating
			const animationName = window.getComputedStyle(xyzEl).getPropertyValue('animation-name')
			if (animationName.indexOf(xyzModeKeyframes) === -1) return false

			return true
		})

		const xyzActiveElsSet = new Set(xyzActiveEls)

		el.xyzAnimEnd = (event) => {
			if (event.animationName === xyzModeKeyframes) {
				xyzActiveElsSet.delete(event.target)
				if (xyzActiveElsSet.size === 0) {
					xyzAnimDone()
				}
			}
		}

		el.addEventListener('animationend', el.xyzAnimEnd, false)
		el.addEventListener('animationcancelled', el.xyzAnimEnd, false)
	}
}

export function getXyzTransitionProps(props) {
	const { timeout } = props || {}

	const classNames = {
		appear: xyzTransitionClasses.appearFrom,
		appearActive: xyzTransitionClasses.appearActive,
		appearDone: xyzTransitionClasses.appearTo,
		enter: xyzTransitionClasses.inFrom,
		enterActive: xyzTransitionClasses.inActive,
		enterDone: xyzTransitionClasses.inTo,
		exit: xyzTransitionClasses.outFrom,
		exitActive: xyzTransitionClasses.outActive,
		exitDone: xyzTransitionClasses.outTo,
	}

	const addEndListener = getXyzAnimationHook(timeout)

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
