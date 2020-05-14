export { default as xyz } from 'clsx'

export const xyzTransitionProps = {
	name: 'xyz',
	appearClass: 'xyz-in-from xyz-appear-from',
	appearActiveClass: 'xyz-in xyz-appear',
	appearToClass: 'xyz-in-to xyz-appear-to',
	enterClass: 'xyz-in-from',
	enterActiveClass: 'xyz-in',
	enterToClass: 'xyz-in-to',
	leaveClass: 'xyz-out-from',
	leaveActiveClass: 'xyz-out',
	leaveToClass: 'xyz-out-to',
}

export function getVNodeAttr(vNode, name) {
	return vNode.data?.attrs?.[name]
}

export function getVNodeDirective(vNode, name) {
	return vNode.data?.directives?.find((directive) => {
		return directive.name === name
	})
}

export function setVNodeAttr(vNode, name, value) {
	if (getVNodeAttr(vNode, name)) return
	if (!vNode.data) vNode.data = {}
	if (!vNode.data.attrs) vNode.data.attrs = {}
	vNode.data.attrs[name] = value
}

export function setVNodeDirective(vNode, name, value) {
	if (getVNodeDirective(vNode, name)) return
	if (!vNode.data) vNode.data = {}
	if (!vNode.data.directives) vNode.data.directives = []
	vNode.data.directives.push(value)
}
