function clearIntersectionObserver(el) {
	if (el.intersectionObserver) {
		el.intersectionObserver.disconnect()
		delete el.intersectionObserver
	}
}

function updateDirective(el, binding) {
	const options = binding.value || {}
	const { appear = true, once = true, threshold = 1, margin, container } = options

	function show(el) {
		el.style.visibility = 'visible'
		el.classList.add('xyz-in')
		if (appear) {
			el.classList.add('xyz-appear')
		}
	}

	function hide(el) {
		el.style.visibility = 'hidden'
		el.classList.remove('xyz-in', 'xyz-appear')
	}

	hide(el)

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
					show(entry.target)
					if (once) {
						clearIntersectionObserver()
					}
				}
			} else {
				hide(entry.target)
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
