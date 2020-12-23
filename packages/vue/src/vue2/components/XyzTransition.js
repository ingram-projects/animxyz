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
		const data = getXyzTransitionData({
			...context.data,
			attrs: {
				...context.data.attrs,
				...context.props,
			},
		})
		const children = context.children

		children.forEach((node) => {
			node.data = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
					staticStyle: data.staticStyle,
					style: data.style,
				},
				node.data
			)
		})

		return createElement('transition', data, children)
	},
}
