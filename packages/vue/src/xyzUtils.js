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

function xyzAnimationActiveHook (mode, auto = false) {
	return (el, done) => {
		const animatingEls = [el]

		if (auto) {
			const nestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)

			const visibleNestedEls = Array.from(nestedEls).filter((nestedEl) => {
				return nestedEl.offsetParent !== null
			})
			animatingEls.push(...visibleNestedEls)
		}

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

	let newDuration, appearAuto, inAuto, outAuto
	if (data.attrs && typeof data.attrs.duration !== 'undefined') {
		if (data.attrs.duration === 'auto') {
			appearAuto = true
			inAuto = true
			outAuto = true
		} else
		if (typeof data.attrs.duration === 'number') {
			newDuration = data.attrs.duration
		} else
		if (typeof data.attrs.duration === 'object') {
			newDuration = {
				...data.attrs.duration
			}
			if (newDuration.appear === 'auto') {
				appearAuto = true
				delete newDuration.appear
			}
			if (newDuration.enter === 'auto') {
				inAuto = true
				delete newDuration.enter
			}
			if (newDuration.leave === 'auto') {
				outAuto = true
				delete newDuration.leave
			}
		}
	}

	const on = {
		enter: xyzAnimationActiveHook('in', inAuto),
		leave: xyzAnimationActiveHook('out', outAuto),
		enterCancelled: xyzAnimationCancelledHook,
		leaveCancelled: xyzAnimationCancelledHook,
	}

	if (data.attrs && data.attrs.appear) {
		on.appear = xyzAnimationActiveHook('appear', appearAuto)
		on.appearCancelled = xyzAnimationCancelledHook
	}

	const mergedData = mergeData(
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

	mergedData.attrs.duration = newDuration

	return mergedData
}
