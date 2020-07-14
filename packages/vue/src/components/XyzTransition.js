import { xyzTransitionProps, xyzTransitionHooks, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransition',
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
					mode: 'out-in',
				},
				on: hooks,
			},
			context.data
		)

		context.children.forEach((child) => {
			child.data = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
				},
				child.data
			)
		})

		return createElement('transition', data, context.children)
	},
}
