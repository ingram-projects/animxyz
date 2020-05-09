import xyzTransitionProps from './xyzTransitionProps'

export default {
	name: 'XyzTransitionGroup',
	functional: true,
	render(createElement, context) {
		const data = {
			...context.data,
			attrs: {
				...xyzTransitionProps,
				moveClass: 'xyz-move',
				...context.data.attrs,
			},
		}

		return createElement('transition-group', data, context.children)
	},
}
