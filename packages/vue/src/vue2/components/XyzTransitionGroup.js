import { mergeData } from 'vue-functional-data-merge'
import { getXyzTransitionData } from '../utils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	props: {
		appear: {
			type: Boolean,
		},
		duration: {
			type: [Number, String, Object],
		},
		tag: {
			type: String,
			default: 'div',
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

		children.forEach((node, index) => {
			// Iterate through children and apply xyz indexes
			node.data = mergeData(
				{
					staticStyle: {
						'--xyz-index': index,
						'--xyz-index-rev': children.length - index - 1,
					},
				},
				node.data || {}
			)
		})

		return createElement('transition-group', data, children)
	},
}
