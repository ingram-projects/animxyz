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

function getXyzDurationForMode(mode, duration) {
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

function clearXyzElementProperties(el) {
	clearTimeout(el.xyzAnimTimeout)
	el.removeEventListener('animationstart', el.xyzAnimStart)
	el.removeEventListener('animationend', el.xyzAnimEnd)

	delete el.xyzAnimDone
	delete el.xyzAnimTimeout
	delete el.xyzAnimStart
	delete el.xyzAnimEnd
}

function getXyzBeforeAnimationHook(mode, duration, hook) {
	const modeDuration = getXyzDurationForMode(mode, duration)

	return (el) => {
		if (hook) {
			hook()
		}

		clearXyzElementProperties(el)

		function xyzAnimDone () {
			if (el.xyzAnimDone) {
				el.xyzAnimDone()
				clearXyzElementProperties(el)
			}
		}

		if (typeof modeDuration === 'number') {
			el.xyzAnimTimeout = setTimeout(xyzAnimDone, modeDuration)
		}

		const animatingElsSet = new Set()
		if (modeDuration === 'auto') {
			el.xyzAnimStart = (event) => {
				if (event.animationName === `xyz-${mode}-keyframes`) {
					animatingElsSet.add(event.target)
				}
			}
		} else {
			el.xyzAnimStart = (event) => {
				if (event.target === el) {
					animatingElsSet.add(event.target)
				}
			}
		}
		el.xyzAnimEnd = (event) => {
			animatingElsSet.delete(event.target)
			if (animatingElsSet.size === 0) {
				xyzAnimDone()
			}
		}

		el.addEventListener('animationstart', el.xyzAnimStart, false)
		el.addEventListener('animationend', el.xyzAnimEnd, false)
	}
}

function xyzAnimationHook(el, done) {
	el.xyzAnimDone = done
}

export function getXyzTransitionData(data, customData = {}) {
	const { appear, duration } = data.attrs || {}
	const { beforeEnter, beforeLeave, beforeAppear } = data.on || {}

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

	const on = {
		enter: xyzAnimationHook,
		leave: xyzAnimationHook,
	}

	if (typeof appear !== 'undefined') {
		on.appear = xyzAnimationHook
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
		data
	)

	mergedData.on.beforeEnter = getXyzBeforeAnimationHook('in', duration, beforeEnter)
	mergedData.on.beforeLeave = getXyzBeforeAnimationHook('out', duration, beforeLeave)

	if (typeof appear !== 'undefined') {
		mergedData.on.beforeAppear = getXyzBeforeAnimationHook('appear', duration, beforeAppear)
	}

	delete mergedData.attrs.duration

	return mergedData
}
