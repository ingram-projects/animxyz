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

function xyzAnimationActiveHook (mode, auto = false) {
	return (el, done) => {
		const animatingEls = [el]

		if (auto) {
			const nestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)

			const visibleNestedEls = Array.from(nestedEls).filter((nestedEl) => {
				return nestedEl.offsetParent !== null
			})
			animatingEls.push(...visibleNestedEls)
		}

		let incompleteAnimations = animatingEls.length
		el.xyzAnimDone = function () {
			incompleteAnimations -= 1
			if (incompleteAnimations === 0) {
				el.removeEventListener('animationend', el.xyzAnimDone)
				done()
			}
		}
		el.addEventListener('animationend', el.xyzAnimDone)
	}
}

function xyzAnimationCancelledHook (el) {
	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}

export function getXyzTransitionProps (props) {
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

	let newTimeout, appearAuto, inAuto, outAuto
	if (typeof props.timeout !== 'undefined') {
		if (props.timeout === 'auto') {
			appearAuto = true
			inAuto = true
			outAuto = true
		} else
		if (typeof props.timeout === 'number') {
			newTimeout = props.timeout
		} else
		if (typeof props.timeout === 'object') {
			newTimeout = {
				...props.timeout
			}
			if (newTimeout.appear === 'auto') {
				appearAuto = true
				delete newTimeout.appear
			}
			if (newTimeout.enter === 'auto') {
				inAuto = true
				delete newTimeout.enter
			}
			if (newTimeout.exit === 'auto') {
				outAuto = true
				delete newTimeout.exit
			}
		}
	}

	let addEndListener

	return {
		...props,
		classNames: {
			...classNames,
			...props.classNames,
		},
		addEndListener,
		timeout: newTimeout,
	}
}
