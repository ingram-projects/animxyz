import { getXyzTransitionData, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransition',
	functional: true,
	render(createElement, context) {
		const data = getXyzTransitionData(context.data, {
			attrs: {
				mode: 'out-in',
			},
		})

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
