import { getXyzTransitionData, xyzTransitionClasses, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(createElement, context) {
		const data = getXyzTransitionData(context.data, {
			attrs: {
				moveClass: xyzTransitionClasses.move,
			},
		})

		context.children.forEach((child, index) => {
			child.data = mergeData(
				{
					style: {
						'--xyz-index': index,
						'--xyz-index-rev': context.children.length - index - 1,
					},
				},
				child.data
			)
		})

		return createElement('transition-group', data, context.children)
	},
}
