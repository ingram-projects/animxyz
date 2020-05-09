import xyzTransitionProps from './xyzTransitionProps'
import defaultsDeep from 'lodash/defaultsDeep'

export default {
	name: 'XyzTransition',
	functional: true,
	render(createElement, context) {
		const data = {
			...context.data,
			attrs: {
				...xyzTransitionProps,
				...context.data?.attrs,
			},
		}

		context.children.forEach((child) => {
			defaultsDeep(child, {
				data: {
					attrs: {
						xyz: data.attrs?.xyz,
					},
				},
			})
		})

		return createElement('transition', data, context.children)
	},
}
