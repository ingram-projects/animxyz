function clearIntersectionObserver(el) {
	if (el.intersectionObserver) {
		el.intersectionObserver.disconnect()
		delete el.intersectionObserver
	}
}

function updateDirective(el, binding) {
	const { container = null, threshold = 0.5, margin = '0', once = true } = binding.value

	const thresholds = [0, threshold]

	const intersectionObserverOptions = {
		root: container,
		rootMargin: margin,
		thresholds,
	}

	clearIntersectionObserver(el)
	el.intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (entry.intersectionRatio >= threshold) {
					el.classList.add('xyz-in', 'xyz-appear')
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
