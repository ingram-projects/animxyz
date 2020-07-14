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

export function animationDoneHook (el, done) {
	let nested;
	if (el.classList.contains('xyz-in')) {
		nested = el.querySelectorAll('.xyz-nested', '.xyz-in-nested')
	} else
	if (el.classList.contains('xyz-out')) {
		nested = el.querySelectorAll('.xyz-nested', '.xyz-out-nested')
	} else
	if (el.classList.contains('xyz-appear')) {
		nested = el.querySelectorAll('.xyz-nested', '.xyz-appear-nested')
	}

	const animatingEls = [el, ... Array.from(nested)]

	let incompleteAnimations = animatingEls.length

	const onAnimDone = (event) => {
		if (event.animationName.startsWith('xyz')) {
			incompleteAnimations -= 1
			if (incompleteAnimations === 0) {
				el.removeEventListener('animationend', onAnimDone)
				el.removeEventListener('animationcancel', onAnimDone)
				done()
			}
		}
	}

	el.addEventListener('animationend', onAnimDone)
	el.addEventListener('animationcancel', onAnimDone)
}

export const xyzTransitionHooks = {
	enter: animationDoneHook,
	leave: animationDoneHook,
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
