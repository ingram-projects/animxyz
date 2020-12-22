import { Transition, h } from 'vue'
import { getXyzTransitionData } from '../utils'

function XyzTransition(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})

	return h(Transition, data, context.slots)
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
