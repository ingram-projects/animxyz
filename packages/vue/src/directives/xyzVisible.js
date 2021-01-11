import { enter, leave } from '../transitionModule'

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
	return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
		? locateNode(vnode.componentInstance._vnode)
		: vnode
}

function setVisibility(el, value) {
	el.style.visibility = value ? el._originalVisibility : 'hidden'
}

export default {
	bind(el, { value }, vnode) {
		el._originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility
		vnode = locateNode(vnode)
		const transition = vnode.data && vnode.data.transition

		if (transition && value) {
			enter(vnode, () => {
				setVisibility(el, value)
			})
		} else {
			setVisibility(el, value)
		}
	},
	update(el, { value, oldValue }, vnode) {
		if (!value === !oldValue) return

		vnode = locateNode(vnode)
		const transition = vnode.data && vnode.data.transition

		if (transition) {
			if (value) {
				enter(vnode, () => {
					setVisibility(el, value)
				})
			} else {
				leave(vnode, () => {
					setVisibility(el, value)
				})
			}
		} else {
			setVisibility(el, value)
		}
	},
	unbind(el) {
		if (el) {
			el.style.visibility = el._originalVisibility
		}
	},
}
