import clsx from 'clsx'

function updateDirective(el, { value }) {
	el.setAttribute('xyz', clsx(el._xyzOriginal, value))
}

export default {
	bind(el) {
		el._xyzOriginal = el.getAttribute('xyz')
		updateDirective(...arguments)
	},
	update: updateDirective,
	unbind(el, binding, vnode, oldVnode, isDestroy) {
		if (!isDestroy) {
			el.setAttribute('xyz', el._xyzOriginal)
		}
	},
}
