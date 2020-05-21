import { xyzTransitionProps, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransition',
	render(createElement) {
		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					mode: 'out-in',
				},
			},
			this.$vnode.data
		)

		const children = this.$slots.default.map((child) => {
			const childData = mergeData(
				{
					attrs: {
						xyz: data.attrs.xyz,
					},
					directives: data.directives,
				},
				child.data
			)
			return createElement(child.tag, childData, child.children)
		})

		return createElement('transition', data, children)
	},
}
