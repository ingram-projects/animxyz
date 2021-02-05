export default function (input) {
	if (input instanceof RegExp) {
		return input.source
	}
	if (typeof input === 'string') {
		if (/^\/.+\/$/.test(input)) return input.substring(1, input.length - 1)
		return input.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&')
	}
	return input
}
