import stringifyRegex from './stringifyRegex'

export default function (...regexes) {
	if (!regexes || !regexes.length) return undefined

	let regexString
	if (regexes.length === 1) {
		regexString = stringifyRegex(regexes[0])
	} else {
		regexString = regexes
			.map(stringifyRegex)
			.filter((regexString) => regexString !== '')
			.map((regexString) => `(?:${regexString})`)
			.join('|')
	}

	return new RegExp(regexString)
}
