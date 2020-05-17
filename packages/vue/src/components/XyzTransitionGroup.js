import { xyzTransitionClasses, xyzTransitionProps } from '../xyzUtils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(createElement, context) {
		const data = {
			...context.data,
			attrs: {
				...xyzTransitionProps,
				moveClass: xyzTransitionClasses.move,
				...context.data?.attrs,
			},
		}

		return createElement('transition-group', data, context.children)
	},
}
