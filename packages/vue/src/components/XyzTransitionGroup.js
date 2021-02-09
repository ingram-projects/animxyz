import { xyzTransitionGroupProps, mergeData, getXyzTransitionData } from '../utils'

function getTransitionRawChildren(children) {
	return children.filter((node) => {
		return node.tag && node.key != null && String(node.key).indexOf('__vlist') !== 0
	})
}

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	props: xyzTransitionGroupProps,
	render(createElement, context) {
		const { data = {}, props = {}, children = [] } = context

		const newData = getXyzTransitionData({
			...data,
			attrs: {
				...data.attrs,
				...props,
			},
		})

		const rawChildren = getTransitionRawChildren(children)
		rawChildren.forEach((node, index) => {
			// Iterate through children and apply xyz indexes
			node.data = mergeData(
				{
					staticStyle: {
						'--xyz-index': index,
						'--xyz-index-rev': children.length - index - 1,
					},
				},
				node.data
			)
		})

		return createElement('transition-group', newData, children)
	},
}
