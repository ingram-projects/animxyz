import clsx from 'clsx'

function updateDirective(el, { value }) {
	el.setAttribute('data-xyz', clsx(el._xyzOriginal, value))
}

// NOTE: no `unbind` cleanup here. Vue runs directive `unbind` during the
// unmount patch, while a <transition> leave is still animating the element —
// calling clearXyzElement there tears down the animation hook's
// listeners/timeouts so `done()` never fires and the leave hangs forever.
// The hook cleans up after itself when the animation resolves.
export default {
	bind(el) {
		el._xyzOriginal = el.getAttribute('data-xyz')
		updateDirective(...arguments)
	},
	update: updateDirective,
}
