import { deleteUndefined, xyzTransitionClasses, getXyzAnimationHook } from '../../../utils'
import clsx from 'clsx'

export const xyzTransitionProps = {
	appear: Boolean,
	appearVisible: [Boolean, Object],
	duration: [Number, String, Object],
	mode: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String,
}

export const xyzTransitionGroupProps = {
	...xyzTransitionProps,
	tag: {
		type: String,
		default: 'div',
	},
	moveClass: String,
}

// Normalize Vue's several accepted `style` shapes (string, array, object,
// nullish) into a plain object so we can merge them without destroying a
// child's inline style. `{...'color: red'}` would otherwise spread a string
// into indexed character keys and drop the actual declarations.
function normalizeStyle(style) {
	if (!style) return {}
	if (Array.isArray(style)) {
		return style.reduce((merged, item) => Object.assign(merged, normalizeStyle(item)), {})
	}
	if (typeof style === 'string') {
		return style.split(';').reduce((merged, declaration) => {
			const [prop, ...rest] = declaration.split(':')
			const name = prop.trim()
			const value = rest.join(':').trim()
			if (name && value) {
				merged[name] = value
			}
			return merged
		}, {})
	}
	if (typeof style === 'object') return style
	return {}
}

// Compose two event-handler values (each may be a single function or an array
// of functions, per Vue's `on*` normalization) into one array-free handler that
// invokes every function. Used so a user's `@enter`/`@leave`/`@appear` runs
// alongside the internal animation hook instead of replacing it.
function mergeHandlers(handler1, handler2) {
	const handlers = [].concat(handler1 ?? [], handler2 ?? [])
	if (handlers.length <= 1) return handlers[0]
	return (...args) => handlers.forEach((handler) => handler(...args))
}

export function mergeData(data1 = {}, data2 = {}) {
	const merged = {
		...data1,
		...data2,
		style: {
			...normalizeStyle(data1?.style),
			...normalizeStyle(data2?.style),
		},
		class: clsx(data1?.class, data2?.class),
	}

	// Compose same-named `on*` handlers from both sources rather than letting
	// data2 clobber data1. The internal animation hook (passed as data1 in
	// getXyzTransitionData) owns the `done` callback, so it must always run
	// even when a consumer also binds `@enter`/`@leave`/`@appear`.
	const keys = new Set([...Object.keys(data1), ...Object.keys(data2)])
	keys.forEach((key) => {
		if (/^on[A-Z]/.test(key) && typeof data1[key] === 'function' && typeof data2[key] === 'function') {
			merged[key] = mergeHandlers(data1[key], data2[key])
		}
	})

	return merged
}

export function getXyzTransitionData(data) {
	deleteUndefined(data)
	data.appear = Boolean(data.appear || data.appearVisible)
	const { appear, appearVisible, duration } = data

	const animationHook = getXyzAnimationHook(duration, appearVisible)

	const transitionData = {
		css: true,
		type: 'animation',
		appearFromClass: xyzTransitionClasses.appearFrom,
		appearActiveClass: xyzTransitionClasses.appearActive,
		appearToClass: xyzTransitionClasses.appearTo,
		enterFromClass: xyzTransitionClasses.inFrom,
		enterActiveClass: xyzTransitionClasses.inActive,
		enterToClass: xyzTransitionClasses.inTo,
		leaveFromClass: xyzTransitionClasses.outFrom,
		leaveActiveClass: xyzTransitionClasses.outActive,
		leaveToClass: xyzTransitionClasses.outTo,
		onEnter: animationHook,
		onLeave: animationHook,
	}

	if (appear) {
		transitionData.onAppear = animationHook
	}

	const mergedData = mergeData(transitionData, data)

	delete mergedData.appearVisible
	delete mergedData.duration
	return mergedData
}
