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
