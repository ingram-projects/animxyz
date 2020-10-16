import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

function updateScrollLock(el, binding) {
	if (binding.oldValue === binding.value) {
		return
	}

	if (binding.value) {
		disableBodyScroll(el)
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
