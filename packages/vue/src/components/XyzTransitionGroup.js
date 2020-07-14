import { xyzTransitionClasses, xyzTransitionProps, xyzTransitionHooks, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(createElement, context) {
		let hooks;
		if (!context.data.attrs || typeof context.data.attrs.duration === 'undefined') {
			hooks = xyzTransitionHooks
		}

		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					moveClass: xyzTransitionClasses.move,
				},
				on: hooks,
			},
			context.data
		)

		context.children.forEach((child, index) => {
			child.data = mergeData(
				{
					style: {
						'--xyz-index': index,
						'--xyz-index-rev': context.children.length - index - 1,
					},
				},
				child.data
			)
		})

		return createElement('transition-group', data, context.children)
	},
}
