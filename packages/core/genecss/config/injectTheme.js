import get from 'lodash/get'

export default function (obj, theme) {
	function getThemeKey(key) {
		return get(theme, key)
	}

	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'function') {
			obj[key] = value(getThemeKey)
		}
	}
}
