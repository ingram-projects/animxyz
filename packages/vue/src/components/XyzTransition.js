import { xyzTransitionProps, getXyzAttrs } from './xyzTransitionUtils'
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

		const xyzAttrs = getXyzAttrs(data.attrs)
		if (Object.keys(xyzAttrs).length) {
			context.children.forEach((child) => {
				defaultsDeep(child, {
					data: {
						attrs: xyzAttrs,
					},
				})
			})
		}

		return createElement('transition', data, context.children)
	},
}
