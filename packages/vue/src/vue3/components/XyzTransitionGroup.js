import { TransitionGroup, h } from 'vue'
import { getXyzTransitionData } from '../utils'

function XyzTransitionGroup(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})

	const newChildren = () => {
		if (!context.slots.default) return null
		const children = context.slots.default()
		children[0].children.forEach((child, index) => {
			child.props.style = {
				'--xyz-index': index,
				'--xyz-index-rev': children.length - index - 1,
				...child.props.style,
			}
		})
		return children
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
