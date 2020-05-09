import clsx from 'clsx'

function updateDirective(el, binding) {
	const xyz = clsx(el.staticXyz?.split(' '), binding.value)
	el.setAttribute('xyz', xyz)
}

export default {
	bind(el, binding) {
		el.staticXyz = el.getAttribute('xyz')
		updateDirective(el, binding)
	},
	update(el, binding) {
		updateDirective(el, binding)
	},
}
