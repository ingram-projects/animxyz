import { xyzTransitionProps, mergeData, getXyzTransitionData } from '../utils'

export default {
	name: 'XyzTransition',
	functional: true,
	props: xyzTransitionProps,
	render(createElement, context) {
		const { data = {}, props = {}, children = [] } = context

		const newData = getXyzTransitionData({
			...data,
			attrs: {
				...data.attrs,
				...props,
			},
		})

		children.forEach((node) => {
			// Iterate through children and merge transition directives and styles
			node.data = mergeData(data, node.data)
		})

		return createElement('transition', newData, children)
	},
}
