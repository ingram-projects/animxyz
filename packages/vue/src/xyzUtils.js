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
	el.removeEventListener('animationcancelled', el.xyzAnimEnd)

	delete el.xyzAnimTimeout
	delete el.xyzAnimStart
	delete el.xyzAnimEnd
}

function getXyzAnimationHook(mode, duration) {
	const modeDuration = getXyzDurationForMode(mode, duration)

	return (el, done) => {
		clearXyzElementProperties(el)

		function xyzAnimDone() {
			done()
			clearXyzElementProperties(el)
		}

		if (typeof modeDuration === 'number') {
			el.xyzAnimTimeout = setTimeout(xyzAnimDone, modeDuration)
			return
		}

		const xyzAnimEls = new Set()

		if (modeDuration === 'auto') {
			el.xyzAnimStart = (event) => {
				if (event.animationName === `xyz-${mode}-keyframes`) {
					xyzAnimEls.add(event.target)
				}
			}
		} else {
			el.xyzAnimStart = (event) => {
				if (event.target === el && event.animationName === `xyz-${mode}-keyframes`) {
					xyzAnimEls.add(event.target)
				}
			}
		}

		el.xyzAnimEnd = (event) => {
			if (event.animationName === `xyz-${mode}-keyframes`) {
				xyzAnimEls.delete(event.target)
				if (xyzAnimEls.size === 0) {
					xyzAnimDone()
				}
			}
		}

		el.addEventListener('animationstart', el.xyzAnimStart, false)
		el.addEventListener('animationend', el.xyzAnimEnd, false)
		el.addEventListener('animationcancelled', el.xyzAnimEnd, false)
	}
}

export function getXyzTransitionData(data, customData = {}) {
	const { appear, duration } = data.attrs || {}

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
		enter: getXyzAnimationHook('in', duration),
		leave: getXyzAnimationHook('out', duration),
	}
	if (typeof appear !== 'undefined') {
		on.appear = getXyzAnimationHook('appear', duration)
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

	delete mergedData.attrs.duration

	return mergedData
}
