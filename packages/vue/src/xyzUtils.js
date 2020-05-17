export { default as xyz } from 'clsx'

export const xyzTransitionClasses = {
	appearFrom: 'xyz-appear-from',
	appearActive: 'xyz-appear',
	appearTo: 'xyz-appear-to',
	enterFrom: 'xyz-in-from',
	enterActive: 'xyz-in',
	enterTo: 'xyz-in-to',
	leaveFrom: 'xyz-out-from',
	leaveActive: 'xyz-out',
	leaveTo: 'xyz-out-to',
	move: 'xyz-move',
}

export const xyzTransitionProps = {
	name: 'xyz',
	appearClass: `${xyzTransitionClasses.enterFrom} ${xyzTransitionClasses.appearFrom}`,
	appearActiveClass: `${xyzTransitionClasses.enterActive} ${xyzTransitionClasses.appearActive}`,
	appearToClass: `${xyzTransitionClasses.enterTo} ${xyzTransitionClasses.appearTo}`,
	enterClass: xyzTransitionClasses.enterFrom,
	enterActiveClass: xyzTransitionClasses.enterActive,
	enterToClass: xyzTransitionClasses.enterTo,
	leaveClass: xyzTransitionClasses.leaveFrom,
	leaveActiveClass: xyzTransitionClasses.leaveActive,
	leaveToClass: xyzTransitionClasses.leaveTo,
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
