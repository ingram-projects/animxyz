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
	},
	render(createElement, context) {
		const data = getXyzTransitionData({
			...context.data,
			attrs: {
				...context.data.attrs,
				...context.props,
			},
		})

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
