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
	let nestedEls;
	if (el.classList.contains('xyz-appear')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-appear-nested')
	} else
	if (el.classList.contains('xyz-in')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-in-nested')
	} else
	if (el.classList.contains('xyz-out')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-out-nested')
	}

	const animatingEls = [el, ... Array.from(nestedEls)]

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

export function animationCancelledHook (el) {
	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}
