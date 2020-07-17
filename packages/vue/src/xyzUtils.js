export { default as xyz } from 'clsx'

export function mergeData(data1 = {}, data2 = {}) {
	return {
		...data1,
		...data2,
		attrs: {
			...data1.attrs,
			...data2.attrs,
		},
		directives: [...(data1.directives || []), ...(data2.directives || [])],
		on: {
			...data1.on,
			...data2.on,
		},
		style: {
			...data1.style,
			...data2.style,
		},
	}
}

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

function xyzAnimationActiveHook (el, done) {
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

function xyzAnimationCancelledHook (el) {
	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}

export function getXyzTransitionData (data, customData = {}) {
	const attrs = {
		name: 'xyz',
		css: true,
		type: 'animation',
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

	const on = {}
	if (data.attrs && data.attrs.duration) {
		if (data.attrs.duration === 'auto') {
			if (data.attrs.appear) {
				on.appear = xyzAnimationActiveHook
				on.appearCancelled = xyzAnimationCancelledHook
			}
			on.enter = xyzAnimationActiveHook
			on.enterCancelled = xyzAnimationCancelledHook
			on.leave = xyzAnimationActiveHook
			on.leaveCancelled = xyzAnimationCancelledHook
			delete data.attrs.duration
		} else {
			if (data.attrs.appear && data.attrs.duration.appear === 'auto') {
				on.appear = xyzAnimationActiveHook
				on.appearCancelled = xyzAnimationCancelledHook
				delete data.attrs.duration.appear
			}
			if (data.attrs.duration.enter === 'auto') {
				on.enter = xyzAnimationActiveHook
				on.enterCancelled = xyzAnimationCancelledHook
				delete data.attrs.duration.enter
			}
			if (data.attrs.duration.leave === 'auto') {
				on.leave = xyzAnimationActiveHook
				on.leaveCancelled = xyzAnimationCancelledHook
				delete data.attrs.duration.leave
			}
		}
	}

	return mergeData(
		{
			...customData,
			attrs: {
				...attrs,
				...customData.attrs,
			},
			on: {
				...on,
				...customData.on,
			},
		},
		data,
	)
}
