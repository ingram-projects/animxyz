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

function getXyzDurationForMode (mode, duration) {
	if (typeof duration !== 'object' || duration === null) {
		return duration
	}
	switch (mode) {
		case 'appear':
			return duration.appear
		case 'in':
			return duration.enter
		case 'out':
			return duration.leave
	}
	return null
}

function clearXyzProperties (el) {
	clearTimeout(el.xyzAnimTimeout)
	delete el.xyzAnimTimeout

	el.removeEventListener('animationend', el.xyzAnimDone)
	delete el.xyzAnimDone
}

function getXyzAnimationActiveHook (duration) {
	return (el, done) => {
		clearXyzProperties(el)

		let mode;
		if (el.classList.contains('xyz-appear')) {
			mode = 'appear'
		} else
		if (el.classList.contains('xyz-in')) {
			mode = 'in'
		} else
		if (el.classList.contains('xyz-out')) {
			mode = 'out'
		}

		const modeDuration = getXyzDurationForMode(mode, duration)

		if (typeof modeDuration === 'number') {
			el.xyzAnimTimeout = setTimeout(done, modeDuration)
		} else
		if (modeDuration === 'auto') {
			const animatingEls = [el]

			const nestedEls = el.querySelectorAll(`.xyz-nested, .xyz-${mode}-nested`)
			const visibleNestedEls = Array.from(nestedEls).filter((nestedEl) => {
				return nestedEl.offsetParent !== null
			})
			animatingEls.push(...visibleNestedEls)

			let incompleteAnimations = animatingEls.length
			el.xyzAnimDone = () => {
				incompleteAnimations -= 1
				if (incompleteAnimations === 0) {
					done()
				}
			}
			el.addEventListener('animationend', el.xyzAnimDone, false)
		} else {
			el.xyzAnimDone = done
			el.addEventListener('animationend', el.xyzAnimDone, false)
		}
	}
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

	const { duration } = data.attrs || {}
	const animationActiveHook = getXyzAnimationActiveHook(duration)

	const on = {
		enter: animationActiveHook,
		leave: animationActiveHook,
	}

	if (data.attrs && data.attrs.appear) {
		on.appear = animationActiveHook
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
	delete mergedData.attrs.duration

	return mergedData
}
