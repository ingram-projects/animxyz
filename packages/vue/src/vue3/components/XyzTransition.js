import { getXyzTransitionData, mergeData } from '../utils'

export default {
	name: 'XyzTransition',
	functional: true,
	props: {
		appear: {
			type: Boolean,
		},
		duration: {
			type: [Number, String, Object],
		},
		mode: {
			type: String,
		},
	},
	render(createElement, context) {
		const data = getXyzTransitionData(context)

		context.children.forEach((child) => {
			child.data = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
					staticStyle: data.staticStyle,
					style: data.style,
				},
				child.data
			)
		})

		return createElement('transition', data, context.children)
	},
}
