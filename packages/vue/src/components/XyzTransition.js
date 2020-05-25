import { xyzTransitionProps, mergeData } from '../xyzUtils'

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
			},
			context.data
		)

		const children = context.children.map((child) => {
			const childData = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
				},
				child.data
			)
			return createElement(child.tag, childData, child.children)
		})

		return createElement('transition', data, children)
	},
}
