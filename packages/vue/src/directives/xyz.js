import clsx from 'clsx'

export default {
	bind(el, { value }) {
		el._xyzOriginal = el.getAttribute('xyz')
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	update(el, { value, oldValue }) {
		if (value === oldValue) return
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	unbind(el) {
		if (el) {
			el.setAttribute('xyz', el._xyzOriginal)
		}
	},
}
