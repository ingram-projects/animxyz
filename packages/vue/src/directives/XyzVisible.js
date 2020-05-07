function updateDirective(el, binding) {
	if (el.intersectionObserver) {
		el.intersectionObserver.disconnect()
	}

	const { threshold = 0.5, once = true, container = null, margin = '0' } = binding.value

	el.intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					el.classList.add('xyz-in xyz-appear')
					if (once) {
						el.intersectionObserver.disconnect()
					}
				}
			})
		},
		{
			root: container,
			rootMargin: margin,
			threshold,
		}
	)

	el.intersectionObserver.observe(el)
}

export default {
	bind: updateDirective,
	update: updateDirective,
	unbind(el) {
		if (el.intersectionObserver) {
			el.intersectionObserver.disconnect()
		}
	},
}
