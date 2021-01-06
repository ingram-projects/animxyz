import clsx from 'clsx'

function updateDirective(el, { value, oldValue }) {
	if (!value === !oldValue) return

	const xyzAttr = clsx(el._xyzOriginal, value)
	el.setAttribute('xyz', xyzAttr)
}

export default {
	beforeMount(el) {
		el._xyzOriginal = el.getAttribute('xyz')
		updateDirective(...arguments)
	},
	componentUpdated: updateDirective,
}
