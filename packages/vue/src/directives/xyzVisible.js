const enter = () => {}
const leave = () => {}

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
	return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
		? locateNode(vnode.componentInstance._vnode)
		: vnode
}

function setDisplay(el, value) {
	el.style.visibility = value ? el._originalVisibility : 'hidden'
}

export default {
	bind(el, { value }, vnode) {
		vnode = locateNode(vnode)
		const transition = vnode.data && vnode.data.transition

		console.log(transition)

		el._originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility
		if (transition && value) {
			vnode.data.show = true
			enter(vnode, () => {
				setDisplay(el, value)
			})
		} else {
			setDisplay(el, value)
		}
	},
	update(el, { value, oldValue }, vnode) {
		if (!value === !oldValue) return
		vnode = locateNode(vnode)
		const transition = vnode.data && vnode.data.transition

		if (transition) {
			vnode.data.show = true
			if (value) {
				enter(vnode, () => {
					setDisplay(el, value)
				})
			} else {
				leave(vnode, () => {
					setDisplay(el, value)
				})
			}
		} else {
			setDisplay(el, value)
		}
	},
	unbind(el, binding, vnode, oldVnode, isDestroy) {
		if (!isDestroy) {
			setDisplay(el, true)
		}
	},
}
