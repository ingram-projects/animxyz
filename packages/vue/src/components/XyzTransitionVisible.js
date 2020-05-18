import { xyzTransitionProps, getVNodeAttr, getVNodeDirective, setVNodeAttr, setVNodeDirective } from '../xyzUtils'

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

		const xyzAttr = getVNodeAttr(context, 'xyz')
		const xyzDirective = getVNodeDirective(context, 'xyz')

		context.children.forEach((child) => {
			if (xyzAttr) {
				setVNodeAttr(child, 'xyz', xyzAttr)
			}
			if (xyzDirective) {
				setVNodeDirective(child, 'xyz', xyzDirective)
			}
		})

		return createElement('transition', data, context.children)
	},
}
