import xyzTransitionProps from './xyzTransitionProps'

function getXyzAttr(vNode) {
	return vNode.data?.attrs?.xyz
}

function getXyzDirective(vNode) {
	return vNode.data?.directives?.find((directive) => {
		return directive.name === 'xyz'
	})
}

function setXyzAttr(vNode, xyzAttr) {
	if (!vNode.data) vNode.data = {}
	if (!vNode.data.attrs) vNode.data.attrs = {}
	vNode.data.attrs.xyz = xyzAttr
}

function setXyzDirective(vNode, xyzDirective) {
	if (!vNode.data) vNode.data = {}
	if (!vNode.data.directives) vNode.data.directives = []
	vNode.data.directives.push(xyzDirective)
}

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

		const xyzAttr = getXyzAttr(context)
		const xyzDirective = getXyzDirective(context)

		context.children.forEach((child) => {
			const childXyzAttr = getXyzAttr(child)
			if (xyzAttr && !childXyzAttr) {
				setXyzAttr(child, xyzAttr)
			}
			const childXyzDirective = getXyzDirective(child)
			if (xyzDirective && !childXyzDirective) {
				setXyzDirective(child, xyzDirective)
			}
		})

		return createElement('transition', data, context.children)
	},
}
