import { mergeData, xyzTransitionProps, getXyzTransitionData } from '../utils'

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
				appear: props.appear || props.appearVisible,
			},
		})

		const childDirectives = props.appearVisible
			? [
					{
						name: 'xyz-appear-visible',
						value: props.appearVisible,
					},
			  ]
			: []

		children.forEach((node) => {
			// Iterate through children and merge transition directives and styles
			node.data = mergeData(
				{
					directives: childDirectives,
				},
				data,
				node.data
			)
		})

		return createElement('transition', newData, children)
	},
}
