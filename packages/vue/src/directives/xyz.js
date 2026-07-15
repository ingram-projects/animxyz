import clsx from 'clsx'
import { clearXyzElement } from '../../../../utils'

function updateDirective(el, { value }) {
	el.setAttribute('xyz', clsx(el._xyzOriginal, value))
}

export default {
	bind(el) {
		el._xyzOriginal = el.getAttribute('xyz')
		updateDirective(...arguments)
	},
	update: updateDirective,
	unbind(el) {
		// Tear down any appearVisible IntersectionObserver and pending animation
		// timeouts so they don't outlive the unmounted element.
		clearXyzElement(el)
	},
}
