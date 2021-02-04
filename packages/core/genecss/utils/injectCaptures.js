import isEmptyObject from './isEmptyObject'
import stringifyRegex from './stringifyRegex'
import joinRegexes from './joinRegexes'

// Injects capture groups into regex string
export default function (regex, captures) {
	if (isEmptyObject(captures)) return regex

	let newRegexString = stringifyRegex(regex)
	Object.entries(captures).forEach(([captureName, capture]) => {
		let captureRegexString
		if (capture instanceof RegExp || typeof capture === 'string') {
			captureRegexString = stringifyRegex(capture)
		} else if (typeof capture === 'object') {
			captureRegexString = stringifyRegex(joinRegexes(...Object.keys(capture)))
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, `(?<${captureName}>${captureRegexString})`)
	})
	return new RegExp(newRegexString)
}
