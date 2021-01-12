import clsx from 'clsx'

function updateDirective(el, { value }) {
	el.setAttribute('xyz', clsx(el._xyzOriginal, value))
}

export default {
	beforeMount(el, { value }) {
		el._xyzOriginal = el.getAttribute('xyz')
		updateDirective(...arguments)
		el.setAttribute('xyz', clsx(el._xyzOriginal, value))
	},
	updated: updateDirective,
	beforeUnmount: updateDirective,
}
