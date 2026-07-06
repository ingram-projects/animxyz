export default function (mode, duration) {
	switch (typeof duration) {
		case 'number':
			return duration
		case 'string':
			// A numeric string (e.g. `duration="500"` without `v-bind` in a Vue
			// template) should behave like the numeric timeout path, not the
			// event-driven path. `'auto'` and other keywords fall through unchanged.
			if (duration.trim() !== '' && !isNaN(duration) && !isNaN(parseFloat(duration))) {
				return parseFloat(duration)
			}
			return duration
		case 'object':
			if (duration === null) return null
			return duration[mode]
	}
	return null
}
