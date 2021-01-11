import clsx from 'clsx'

export default {
	beforeMount(el, { value }) {
		el._xyzOriginal = el.getAttribute('xyz')
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	updated(el, { value }) {
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	beforeUnmount(el, { value }) {
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
}
