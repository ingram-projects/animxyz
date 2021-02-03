import getRegexString from './getRegexString'

// Injects capture groups into regex string
export default function (regex, captures) {
	let newRegexString = getRegexString(regex)
	Object.entries(captures).forEach(([captureName, capture]) => {
		let captureRegexString
		if (capture instanceof RegExp || typeof capture === 'string') {
			captureRegexString = getRegexString(capture)
		} else if (typeof capture === 'object') {
			captureRegexString = Object.keys(capture)
				.map(getRegexString)
				.filter((value) => value !== '')
				.join('|')
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, `(?<${captureName}>${captureRegexString})`)
	})
	return new RegExp(newRegexString)
}
