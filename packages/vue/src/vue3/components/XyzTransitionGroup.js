import { TransitionGroup, h } from 'vue'
import { getTransitionRawChildren } from '@vue/runtime-core'
import { getXyzTransitionData } from '../utils'

function XyzTransitionGroup(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})

	const newChildren = () => {
		const rawChildren = context.slots.default ? getTransitionRawChildren(context.slots.default()) : []
		rawChildren.forEach((node, index) => {
			node.props.style = {
				'--xyz-index': index,
				'--xyz-index-rev': rawChildren.length - index - 1,
				...node.props.style,
			}
		})
		return rawChildren
	}

	return h(TransitionGroup, data, newChildren)
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
