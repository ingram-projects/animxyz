import clsx from 'clsx'

function updateDirective(el, binding) {
	const xyzAttr = clsx(el.xyzStatic?.split(' '), binding.value)
	el.setAttribute('xyz', xyzAttr)
}

export default {
	beforeMount(el, binding) {
		el.xyzStatic = el.getAttribute('xyz')
		updateDirective(el, binding)
	},
	updated(el, binding) {
		updateDirective(el, binding)
	},
}
