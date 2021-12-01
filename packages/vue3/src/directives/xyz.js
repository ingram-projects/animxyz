import clsx from 'clsx'

function updateDirective(el, { value }) {
	el.setAttribute('xyz', clsx(el._xyzOriginal, value))
}

export default {
	beforeMount(el) {
		el._xyzOriginal = el.getAttribute('xyz')
		updateDirective(...arguments)
	},
	updated: updateDirective,
}
