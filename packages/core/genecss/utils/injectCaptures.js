import isEmptyObject from './isEmptyObject'
import stringifyRegex from './stringifyRegex'
import joinRegexes from './joinRegexes'

// Injects capture groups into regex string
export default function (regex, captures) {
	if (isEmptyObject(captures)) return regex

	let newRegexString = stringifyRegex(regex)
	for (const [captureName, capture] of Object.entries(captures)) {
		let captureRegex
		if (capture instanceof RegExp || typeof capture === 'string') {
			captureRegex = capture
		} else if (typeof capture === 'object') {
			captureRegex = joinRegexes(...Object.keys(capture))
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, `(?<${captureName}>${stringifyRegex(captureRegex)})`)
	}
	return new RegExp(newRegexString)
}
