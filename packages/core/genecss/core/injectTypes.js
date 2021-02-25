import { isEmptyObject, stringifyRegex } from '../utils'

// Injects types into regex string
function injectTypes(regex, types) {
	if (isEmptyObject(types)) return regex

	const regexString = stringifyRegex(regex)
	let newRegexString = regexString

	for (const [typeName, type] of Object.entries(types)) {
		newRegexString = newRegexString.replace(new RegExp(`@${typeName}`, 'g'), `(?:${stringifyRegex(type)})`)
	}
	// Recurse until all types have been replaced
	if (newRegexString !== regexString) return injectTypes(new RegExp(newRegexString), types)
	return new RegExp(newRegexString)
}

export default injectTypes
