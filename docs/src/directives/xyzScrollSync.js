function px(v) {
	return v
}

function vh(v) {
	return (v * window.innerHeight) / 100
}

function vw(v) {
	return (v * window.innerWidth) / 100
}

function percent(v, axis) {
	return axis === 'x' ? vw(v) : vh(v)
}

const viewportValueFns = {
	px,
	vh,
	vw,
	'%': percent,
}

function viewportValue(v, axis) {
	if (v) {
		if (typeof v === 'number') return v
		const match = v.match(/([\d]+\.?[\d]+)(px|vh|vw|vmin|vmax|%)/)
		if (match) {
			const [, num, unit] = match
			return viewportValueFns[unit](parseFloat(num, axis))
		}
	}
	return 0
}

function updateDirective(el, { value = {} }) {
	removeDirective(el)
	el.classList.add('xyz-paused-all')

	const { axis = 'y', compare = 'start', offset = 0 } = value
	const offsetPx = viewportValue(offset, axis)

	el._xyzScrollSyncCallback = () => {
		const elementBounds = el.getBoundingClientRect()

		let progress = 0
		if (axis === 'y') {
			if (compare === 'start') {
				progress = (elementBounds.top - offsetPx) / window.innerHeight
			} else if (compare === 'end') {
				progress = (window.innerHeight - elementBounds.bottom - offsetPx) / window.innerHeight
			}
		} else if (axis === 'x') {
			if (compare === 'start') {
				progress = (elementBounds.left - offsetPx) / window.innerWidth
			} else if (compare === 'end') {
				progress = (window.innerWidth - elementBounds.right - offsetPx) / window.innerWidth
			}
		}
		const normalizedProgress = 1 - Math.max(0, progress)
		el.style.setProperty('--xyz-start-offset', normalizedProgress)
	}
	el._xyzScrollSyncCallback()
	window.addEventListener('scroll', el._xyzScrollSyncCallback)
	window.addEventListener('resize', el._xyzScrollSyncCallback)
}

function removeDirective(el) {
	el.classList.remove('xyz-paused-all')
	el.style.removeProperty('--xyz-start-offset')
	window.removeEventListener('scroll', el._xyzScrollSyncCallback)
	window.addEventListener('resize', el._xyzScrollSyncCallback)
}

export default {
	bind: updateDirective,
	update: updateDirective,
	unbind: removeDirective,
}
