import get from 'lodash/get'
import postcss from 'postcss'
import { escapeCSS } from '../utils'

export default function (obj, config) {
	const { theme } = config

	function getThemeKey(key) {
		return get(theme, key)
	}

	const helpers = {
		theme: getThemeKey,
		escapeCSS,
		postcss,
	}

	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'function') {
			obj[key] = value(helpers)
		}
	}
}
