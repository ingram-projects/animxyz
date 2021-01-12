import { locateNode, enter, leave } from '../transitionModule'

function setVisibility(el, value) {
	el.style.visibility = value ? el._originalVisibility : 'hidden'
}

function updateDirective(el, { value = {} }, vnode) {
	setVisibility(el, false)
	vnode = locateNode(vnode)
	const transition = vnode.data && vnode.data.transition

	const { once = true, threshold, root, rootMargin } = value

	const observerOptions = {
		threshold,
		root,
		rootMargin,
	}

	function observerCallback(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				enter(
					vnode,
					() => {
						setVisibility(el, true)
					},
					true
				)

				if (once) {
					el._xyzAppearObserver.disconnect()
				}
			} else {
				leave(vnode, () => {
					setVisibility(el, false)
				})
			}
		})
	}

	if (transition && value) {
		el._xyzAppearObserver = new IntersectionObserver(observerCallback, observerOptions)
		el._xyzAppearObserver.observe(el)
	} else {
		el._xyzAppearObserver.disconnect()
		el.style.visibility = el._originalVisibility
	}
}

export default {
	bind(el) {
		el._originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility
		updateDirective(...arguments)
	},
	update: updateDirective,
	unbind(el, binding, vnode, oldVnode, isDestroy) {
		if (!isDestroy) {
			el._xyzAppearObserver.disconnect()
			el.style.visibility = el._originalVisibility
		}
	},
}
