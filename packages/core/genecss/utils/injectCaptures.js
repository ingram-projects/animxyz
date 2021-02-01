import getRegexString from './getRegexString'

// Injects capture groups into regex string
export default function (regex, captures) {
	let newRegexString = getRegexString(regex)
	Object.entries(captures).forEach(([captureName, capture]) => {
		let captureRegex
		if (capture.matches) {
			captureRegex = capture.matches
		} else if (capture.values) {
			captureRegex = Object.keys(capture.values).join('|')
		} else {
			throw new Error(`capture <${captureName}> must have a 'matches' and/or a 'values' property defined`)
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, `(?<${captureName}>${getRegexString(captureRegex)})`)
	})
	return new RegExp(newRegexString)
}
