export default function (mode, duration) {
	switch (typeof duration) {
		case 'number':
			return duration
		case 'string':
			return duration
		case 'object':
			if (duration === null) return null
			return duration[mode]
	}
	return null
}
