import { TransitionGroup, h, Comment, Text, Fragment } from 'vue'
import { xyzTransitionGroupProps, mergeData, getXyzTransitionData } from '../utils'

// Local filter to the "real" animatable children, modeled on the Vue 2
// package's getTransitionRawChildren. We vendor this instead of importing
// `getTransitionRawChildren` from `@vue/runtime-core`: that specifier is not a
// declared dependency (it resolves only via npm hoisting Vue's transitive copy)
// and is an undocumented internal export. Flatten single-level Fragments (a
// `v-for` renders as a Fragment) and drop Comment placeholders (`v-if` false),
// Text/whitespace nodes, and unkeyed nodes so the stagger index only counts
// nodes that actually receive the `--xyz-index*` custom properties.
function getTransitionRawChildren(children) {
	const rawChildren = []
	children.forEach((node) => {
		if (node.type === Fragment) {
			rawChildren.push(...getTransitionRawChildren(node.children || []))
		} else if (node.type !== Comment && node.type !== Text && node.key != null) {
			rawChildren.push(node)
		}
	})
	return rawChildren
}

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
