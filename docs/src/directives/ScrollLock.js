import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

function updateScrollLock(el, binding) {
	if (binding.oldValue === binding.value) {
		return
	}

	if (binding.value) {
		disableBodyScroll(el, {
	    allowTouchMove: (node) => {
	      while (node && node !== document.body) {
	        if (node.getAttribute('body-scroll-lock-ignore') !== null) {
	          return true
	        }
	        node = node.parentNode
	      }
			},
    })
	} else {
		enableBodyScroll(el)
	}
}

export default {
	inserted: updateScrollLock,
	componentUpdated: updateScrollLock,
	unbind(el) {
		enableBodyScroll(el)
	},
}
