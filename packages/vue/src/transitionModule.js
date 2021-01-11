// Based on https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/modules/transition.js

function once(fn) {
	let called = false
	return function () {
		if (!called) {
			called = true
			fn.apply(this, arguments)
		}
	}
}

function nextFrame(fn) {
	requestAnimationFrame(() => {
		requestAnimationFrame(fn)
	})
}

function addTransitionClass(el, cls) {
	const transitionClasses = el._transitionClasses || (el._transitionClasses = [])
	if (transitionClasses.indexOf(cls) < 0) {
		transitionClasses.push(cls)
		el.classList.add(cls)
	}
}

function removeTransitionClass(el, cls) {
	if (el._transitionClasses && el._transitionClasses.length) {
		const index = el._transitionClasses.indexOf(cls)
		if (index > -1) {
			return el._transitionClasses.splice(index, 1)
		}
	}
	el.classList.remove(cls)
}

export function enter(vnode, toggleStyle, isAppear = false) {
	const el = vnode.elm

	// call leave callback now
	if (el._leaveCb) {
		el._leaveCb.cancelled = true
		el._leaveCb()
	}

	const data = vnode.data.transition
	if (!data || el.nodeType !== 1 || el._enterCb) {
		return
	}

	const {
		enterClass,
		enterToClass,
		enterActiveClass,
		appearClass,
		appearToClass,
		appearActiveClass,
		beforeEnter,
		enter,
		afterEnter,
		enterCancelled,
		beforeAppear,
		appear,
		afterAppear,
		appearCancelled,
	} = data

	if (isAppear && !appear && appear !== '') {
		return
	}

	const fromClass = isAppear && appearClass ? appearClass : enterClass
	const activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass
	const toClass = isAppear && appearToClass ? appearToClass : enterToClass

	const beforeHook = isAppear ? beforeAppear || beforeEnter : beforeEnter
	const activeHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter
	const afterHook = isAppear ? afterAppear || afterEnter : afterEnter
	const cancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled

	const cb = (el._enterCb = once(() => {
		removeTransitionClass(el, toClass)
		removeTransitionClass(el, activeClass)
		if (cb.cancelled) {
			removeTransitionClass(el, fromClass)
			cancelledHook && cancelledHook(el)
		} else {
			afterHook && afterHook(el)
		}
		el._enterCb = null
	}))

	// start enter transition
	beforeHook && beforeHook(el)
	addTransitionClass(el, fromClass)
	addTransitionClass(el, activeClass)
	nextFrame(() => {
		removeTransitionClass(el, fromClass)
		if (!cb.cancelled) {
			addTransitionClass(el, toClass)
		}
	})

	toggleStyle && toggleStyle()
	activeHook && activeHook(el, cb)
}

export function leave(vnode, toggleStyle) {
	const el = vnode.elm

	// call enter callback now
	if (el._enterCb) {
		el._enterCb.cancelled = true
		el._enterCb()
	}

	const data = vnode.data.transition
	if (!data || el.nodeType !== 1) {
		toggleStyle()
		return
	}

	if (el._leaveCb) {
		return
	}

	const {
		leaveClass,
		leaveToClass,
		leaveActiveClass,
		beforeLeave,
		leave,
		afterLeave,
		leaveCancelled,
		delayLeave,
	} = data

	const cb = (el._leaveCb = once(() => {
		removeTransitionClass(el, leaveToClass)
		removeTransitionClass(el, leaveActiveClass)
		if (cb.cancelled) {
			removeTransitionClass(el, leaveClass)
			leaveCancelled && leaveCancelled(el)
		} else {
			toggleStyle()
			afterLeave && afterLeave(el)
		}
		el._leaveCb = null
	}))

	function performLeave() {
		// the delayed leave may have already been cancelled
		if (cb.cancelled) {
			return
		}
		// record leaving element
		beforeLeave && beforeLeave(el)
		addTransitionClass(el, leaveClass)
		addTransitionClass(el, leaveActiveClass)
		nextFrame(() => {
			removeTransitionClass(el, leaveClass)
			if (!cb.cancelled) {
				addTransitionClass(el, leaveToClass)
			}
		})
		leave && leave(el, cb)
	}

	if (delayLeave) {
		delayLeave(performLeave)
	} else {
		performLeave()
	}
}
