export { default as xyz } from 'clsx'

export const xyzTransitionProps = {
	classNames: {
		appear: 'xyz-appear-from',
		appearActive: 'xyz-appear',
		appearDone: 'xyz-appear-to',
		enter: 'xyz-in-from',
		enterActive: 'xyz-in',
		enterDone: 'xyz-in-to',
		exit: 'xyz-out-from',
		exitActive: 'xyz-out',
		exitDone: 'xyz-out-to',
	},
	addEndListener(node, done) {
		node.addEventListener('animationend', done, false)
	},
}
