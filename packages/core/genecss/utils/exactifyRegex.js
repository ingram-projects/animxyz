import stringifyRegex from './stringifyRegex'

export default function (regex) {
	let newRegexString = stringifyRegex(regex)
	if (newRegexString.charAt(0) !== '^') {
		newRegexString = `^${newRegexString}`
	}
	if (newRegexString.charAt(-1) !== '$') {
		newRegexString = `${newRegexString}$`
	}
	return new RegExp(newRegexString)
}
