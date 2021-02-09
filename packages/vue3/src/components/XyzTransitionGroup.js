import { TransitionGroup, h } from 'vue'
import { getTransitionRawChildren } from '@vue/runtime-core'
import { xyzTransitionGroupProps, mergeData, getXyzTransitionData } from '../utils'

function XyzTransitionGroup(props, context) {
	const data = getXyzTransitionData({
		...context.attrs,
		...props,
	})

	function childrenFn() {
		const children = context.slots.default ? context.slots.default() : []

		const rawChildren = getTransitionRawChildren(children)
		rawChildren.forEach((node, index) => {
			node.props = mergeData(
				{
					style: {
						'--xyz-index': index,
						'--xyz-index-rev': rawChildren.length - index - 1,
					},
				},
				node.props
			)
		})

		return children
	}

	return h(TransitionGroup, data, childrenFn)
}

XyzTransitionGroup.props = xyzTransitionGroupProps

export default XyzTransitionGroup
