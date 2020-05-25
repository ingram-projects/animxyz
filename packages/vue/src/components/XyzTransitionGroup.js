import { xyzTransitionClasses, xyzTransitionProps, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(createElement, context) {
		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					moveClass: xyzTransitionClasses.move,
				},
			},
			context.data
		)

		return createElement('transition-group', data, context.children)
	},
}
