import { mergeData } from 'vue-functional-data-merge'
import { getXyzTransitionData } from '../utils'

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
			// Iterate through children and merge transition directives and styles
			node.data = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					class: data.class,
					staticClass: data.staticClass,
					style: data.style,
					staticStyle: data.staticStyle,
					directives: data.directives || [],
				},
				node.data || {}
			)
		})

		return createElement('transition', data, children)
	},
}
