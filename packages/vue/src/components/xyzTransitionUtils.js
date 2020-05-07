export const xyzTransitionProps = {
	name: 'xyz',
	appearClass: 'xyz-in-from xyz-appear-from',
	appearActiveClass: 'xyz-in xyz-appear',
	appearToClass: 'xyz-in-to xyz-appear-to',
	enterClass: 'xyz-in-from',
	enterActiveClass: 'xyz-in',
	enterToClass: 'xyz-in-to',
	leaveClass: 'xyz-out-from',
	leaveActiveClass: 'xyz-out',
	leaveToClass: 'xyz-out-to',
}

export function getXyzAttrs(attrs) {
	const xyzAttrs = {}
	if (attrs) {
		for (const [attrKey, attrValue] of Object.entries(attrs)) {
			if (attrKey === 'xyz' || attrKey.startsWith('xyz-')) {
				xyzAttrs[attrKey] = attrValue
			}
		}
	}
	return xyzAttrs
}
