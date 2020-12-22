import { TransitionGroup, h } from 'vue'
import { getXyzTransitionData, mergeData } from '../utils'

function XyzTransitionGroup(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})
	const children = context.slots.default()

	children.forEach((child, index) => {
		child.data = mergeData(
			{
				style: {
					'--xyz-index': index,
					'--xyz-index-rev': children.length - index - 1,
				},
			},
			child.data
		)
	})

	return h(TransitionGroup, data, () => children)
}

XyzTransitionGroup.props = {
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
}

export default XyzTransitionGroup
