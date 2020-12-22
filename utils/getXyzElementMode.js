export default function (el) {
	if (el.classList.contains('xyz-appear')) {
		return 'appear'
	}
	if (el.classList.contains('xyz-in')) {
		return 'in'
	}
	if (el.classList.contains('xyz-out')) {
		return 'out'
	}
	return null
}
