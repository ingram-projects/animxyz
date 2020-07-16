export { default as xyz } from 'clsx'

export const xyzTransitionClasses = {
	appearFrom: 'xyz-appear-from',
	appearActive: 'xyz-appear',
	appearTo: 'xyz-appear-to',
	enterFrom: 'xyz-in-from',
	enterActive: 'xyz-in',
	enterTo: 'xyz-in-to',
	leaveFrom: 'xyz-out-from',
	leaveActive: 'xyz-out',
	leaveTo: 'xyz-out-to',
	move: 'xyz-move',
}

export const xyzTransitionProps = {
	name: 'xyz',
	css: true,
	appearClass: `${xyzTransitionClasses.enterFrom} ${xyzTransitionClasses.appearFrom}`,
	appearActiveClass: `${xyzTransitionClasses.enterActive} ${xyzTransitionClasses.appearActive}`,
	appearToClass: `${xyzTransitionClasses.enterTo} ${xyzTransitionClasses.appearTo}`,
	enterClass: xyzTransitionClasses.enterFrom,
	enterActiveClass: xyzTransitionClasses.enterActive,
	enterToClass: xyzTransitionClasses.enterTo,
	leaveClass: xyzTransitionClasses.leaveFrom,
	leaveActiveClass: xyzTransitionClasses.leaveActive,
	leaveToClass: xyzTransitionClasses.leaveTo,
}

export function animationActiveHook (el, done) {
	let nestedEls;
	if (el.classList.contains('xyz-appear')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-appear-nested')
	} else
	if (el.classList.contains('xyz-in')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-in-nested')
	} else
	if (el.classList.contains('xyz-out')) {
		nestedEls = el.querySelectorAll('.xyz-nested, .xyz-out-nested')
	}

	const visibleNestedEls = Array.from(nestedEls).filter((nestedEl) => {
		return nestedEl.offsetParent !== null
	})

	const animatingEls = [el, ...visibleNestedEls]

	let incompleteAnimations = animatingEls.length
	el.xyzAnimDone = function () {
		incompleteAnimations -= 1
		if (incompleteAnimations === 0) {
			el.removeEventListener('animationend', el.xyzAnimDone)
			done()
		}
	}
	el.addEventListener('animationend', el.xyzAnimDone)
}

export function animationCancelledHook (el) {
	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}

export function getXyzTransitionHooks (data) {
	const {
		appear,
		duration,
	} = data.attrs || {}

	if (!duration) {
		return
	}

	const hooks = {}

	if (appear && (duration === 'auto' || duration.appear === 'auto')) {
		hooks.appear = animationActiveHook
		hooks.appearCancelled = animationCancelledHook
	}

	if (duration === 'auto' || duration.enter === 'auto') {
		hooks.enter = animationActiveHook
		hooks.enterCancelled = animationCancelledHook
	}

	if (duration === 'auto' || duration.leave === 'auto') {
		hooks.leave = animationActiveHook
		hooks.leaveCancelled = animationCancelledHook
	}

	return hooks
}

export function mergeData(data1 = {}, data2 = {}) {
	const merged = {
		...data1,
		...data2,
	}

	if (data1.attrs || data2.attrs) {
		merged.attrs = {
			...data1.attrs,
			...data2.attrs,
		}
	}

	if (data1.directives || data2.directives) {
		merged.directives = [...(data1.directives || []), ...(data2.directives || [])]
	}

	if (data1.on || data2.on) {
		merged.on = {
			...data1.on,
			...data2.on,
		}
	}

	if (data1.style || data2.style) {
		merged.style = {
			...data1.style,
			...data2.style,
		}
	}

	return merged
}
