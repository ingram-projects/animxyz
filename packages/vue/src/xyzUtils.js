export { default as xyz } from 'clsx'

export const xyzTransitionClasses = {
	active: 'xyz-active',
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
	appearClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterFrom} ${xyzTransitionClasses.appearFrom}`,
	appearActiveClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterActive} ${xyzTransitionClasses.appearActive}`,
	appearToClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterTo} ${xyzTransitionClasses.appearTo}`,
	enterClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterFrom}`,
	enterActiveClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterActive}`,
	enterToClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.enterTo}`,
	leaveClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.leaveFrom}`,
	leaveActiveClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.leaveActive}`,
	leaveToClass: `${xyzTransitionClasses.active} ${xyzTransitionClasses.leaveTo}`,
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

	return merged
}
