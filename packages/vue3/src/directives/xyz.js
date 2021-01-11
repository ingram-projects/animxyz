import clsx from 'clsx'

export default {
	beforeMount(el, { value }) {
		el._xyzOriginal = el.getAttribute('xyz')
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	updated(el, { value }) {
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	unmounted(el) {
		if (el) {
			el.setAttribute('xyz', el._xyzOriginal)
		}
	},
}
