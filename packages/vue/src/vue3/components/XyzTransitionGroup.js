import { getXyzTransitionData, mergeData } from '../utils'

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
		const data = getXyzTransitionData(context)

		context.children.forEach((child, index) => {
			child.data = mergeData(
				{
					staticStyle: {
						'--xyz-index': index,
						'--xyz-index-rev': context.children.length - index - 1,
					},
				},
				child.data
			)
		})

		return createElement('transition-group', data, context.children)
	},
}
