function clearIntersectionObserver(el) {
	if (el.intersectionObserver) {
		el.intersectionObserver.disconnect()
		delete el.intersectionObserver
	}
}

function updateDirective(el, binding) {
	const options = binding.value || {}
	const { appear = true, once = true, threshold = 1, margin, container } = options

	function addXyzClasses() {
		el.classList.add('xyz-paused', 'xyz-in')
		if (appear) {
			el.classList.add('xyz-appear')
		}
	}

	addXyzClasses()

	const intersectionObserverOptions = {
		root: container,
		rootMargin: margin,
		threshold: [0, threshold],
	}

	clearIntersectionObserver(el)
	el.intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (entry.intersectionRatio >= threshold) {
					el.classList.remove('xyz-paused')
					if (once) {
						clearIntersectionObserver(el)
					}
				}
			} else {
				el.classList.remove('xyz-in', 'xyz-appear')
				el.offsetWidth
				addXyzClasses()
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
