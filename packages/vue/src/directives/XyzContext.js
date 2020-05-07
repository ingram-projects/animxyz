import clsx from 'clsx'

export default function (el, binding) {
	const xyz = clsx(binding.value)
	el.setAttribute('xyz', xyz)
}
