import stringifyRegex from './stringifyRegex'

export default function (...regexes) {
	if (!regexes || !regexes.length) return undefined

	let newRegexString
	if (regexes.length === 1) {
		newRegexString = stringifyRegex(regexes[0])
	} else {
		newRegexString = regexes
			.map(stringifyRegex)
			.filter((regexString) => regexString !== '')
			.map((regexString) => `(?:${regexString})`)
			.join('|')
	}

	return new RegExp(newRegexString)
}
