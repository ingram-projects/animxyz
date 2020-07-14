import { xyzTransitionProps, xyzTransitionHooks, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransition',
	functional: true,
	render(createElement, context) {
		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					mode: 'out-in',
				},
				on: xyzTransitionHooks,
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
