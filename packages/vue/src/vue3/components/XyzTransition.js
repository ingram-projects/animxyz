import { Transition, h } from 'vue'
import { getXyzTransitionData, mergeData } from '../utils'

function XyzTransition(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})
	const children = context.slots.default()

	children.forEach((child) => {
		child.data = mergeData(
			{
				directives: data.directives,
				style: data.style,
				xyz: data.xyz,
			},
			child.data
		)
	})

	return h(Transition, data, () => children)
}

XyzTransition.props = {
	appear: {
		type: Boolean,
	},
	duration: {
		type: [Number, String, Object],
	},
	mode: {
		type: String,
	},
}

export default XyzTransition
