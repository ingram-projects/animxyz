function clearIntersectionObserver(el) {
	if (el.intersectionObserver) {
		el.intersectionObserver.disconnect()
		delete el.intersectionObserver
	}
}

function updateDirective(el, binding) {
	const options = binding.value || {}
	const { threshold = 0.5, once = true, margin, container } = options

	const thresholds = [0, threshold]

	const intersectionObserverOptions = {
		root: container,
		rootMargin: margin,
		threshold: thresholds,
	}

	clearIntersectionObserver(el)
	el.intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (entry.intersectionRatio >= threshold) {
					if (once) {
						clearIntersectionObserver(el)
					}
				}
			} else {
				el.classList.remove('xyz-in', 'xyz-appear')
			}
		})
	}, intersectionObserverOptions)
	el.intersectionObserver.observe(el)
}

export default {
	bind: updateDirective,
	update: updateDirective,
	unbind(el) {
		clearIntersectionObserver(el)
	},
}
