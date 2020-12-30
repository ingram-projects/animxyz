import { Transition, h } from 'vue'
import { xyzTransitionProps, getXyzTransitionData } from '../utils'

function XyzTransition(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})

	return h(Transition, data, context.slots)
}

XyzTransition.props = xyzTransitionProps

export default XyzTransition
