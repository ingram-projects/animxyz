import { xyzTransitionClasses, xyzTransitionProps, mergeData } from '../xyzUtils'

export default {
	name: 'XyzTransitionGroup',
	render(createElement) {
		const data = mergeData(
			{
				attrs: {
					...xyzTransitionProps,
					moveClass: xyzTransitionClasses.move,
				},
			},
			this.$vnode.data
		)

		return createElement('transition-group', data, this.$slots.default)
	},
}
