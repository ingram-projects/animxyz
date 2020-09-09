import { getXyzTransitionData, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransition',
	functional: true,
	render(createElement, context) {
		const data = getXyzTransitionData(context.data)

		context.children.forEach((child) => {
			child.data = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
					style: data.style,
				},
				child.data
			)
		})

		return createElement('transition', data, context.children)
	},
}
