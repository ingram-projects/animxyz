import exactifyRegex from './exactifyRegex'
import injectTypes from './injectTypes'

export default function (value, capture, types) {
	if (typeof capture === 'object') {
		for (const [mappingKey, mapping] of Object.entries(capture)) {
			let matchesKey = false

			if (value !== undefined) {
				const mappingMatches = exactifyRegex(injectTypes(mappingKey, types))
				matchesKey = mappingMatches.test(value)
			} else if (mappingKey === '') {
				matchesKey = true
			}

			if (matchesKey) {
				if (typeof mapping === 'boolean') return mapping ? value : undefined
				if (typeof mapping === 'function') return mapping(value)
				return mapping
			}
		}
	}
}
