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

export const xyzTransitionProps = {
	classNames: {
		appear: xyzTransitionClasses.appearFrom,
		appearActive: xyzTransitionClasses.appearActive,
		appearDone: xyzTransitionClasses.appearTo,
		enter: xyzTransitionClasses.enterFrom,
		enterActive: xyzTransitionClasses.enterActive,
		enterDone: xyzTransitionClasses.enterTo,
		exit: xyzTransitionClasses.leaveFrom,
		exitActive: xyzTransitionClasses.leaveActive,
		exitDone: xyzTransitionClasses.leaveTo,
	},
}

export function animationDoneHook (el, done) {
	let nested;
	if (el.classList.contains('xyz-in')) {
		nested = el.querySelectorAll('.xyz-nested, .xyz-in-nested')
	} else
	if (el.classList.contains('xyz-out')) {
		nested = el.querySelectorAll('.xyz-nested, .xyz-out-nested')
	} else
	if (el.classList.contains('xyz-appear')) {
		nested = el.querySelectorAll('.xyz-nested, .xyz-appear-nested')
	}

	const animatingEls = [el, ... Array.from(nested)]

	let incompleteAnimations = animatingEls.length

	const onAnimDone = () => {
		incompleteAnimations -= 1
		if (incompleteAnimations === 0) {
			el.removeEventListener('animationend', onAnimDone)
			done()
		}
	}
	el.addEventListener('animationend', onAnimDone)
}
