import getRegexString from './getRegexString'

// Injects capture groups into regex string
export default function (regexString, captures, nameCaptures) {
	let newRegexString = regexString
	Object.entries(captures).forEach(([captureName, capture]) => {
		let captureRegexString
		if (capture.matches) {
			captureRegexString = capture.matches
		} else if (capture.levels) {
			captureRegexString = Object.keys(capture.levels).join('|')
		} else {
			throw new Error(`capture <${captureName}> must have a 'matches' and/or a 'levels property defined`)
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, () => {
			if (nameCaptures) {
				return `(?<${captureName}>${getRegexString(captureRegexString)})`
			}
			return `(?:${getRegexString(captureRegexString)})`
		})
	})
	return newRegexString
}
