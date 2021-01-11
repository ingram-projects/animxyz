import clsx from 'clsx'

export default {
	bind(el, { value }) {
		el._xyzOriginal = el.getAttribute('xyz')
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	update(el, { value }) {
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	unbind(el, binding, vnode, oldVnode, isDestroy) {
		if (!isDestroy) {
			el.setAttribute('xyz', el._xyzOriginal)
		}
	},
}
