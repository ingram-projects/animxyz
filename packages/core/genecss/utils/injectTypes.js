import isEmptyObject from './isEmptyObject'
import stringifyRegex from './stringifyRegex'

// Injects types into regex string
function injectTypes(regex, types) {
	if (isEmptyObject(types)) return regex

	const regexString = stringifyRegex(regex)
	let newRegexString = regexString

	Object.entries(types).forEach(([typeName, type]) => {
		newRegexString = newRegexString.replace(new RegExp(`@${typeName}`, 'g'), `(${stringifyRegex(type)})`)
	})
	// Recurse until all types have been replaced
	if (newRegexString !== regexString) return injectTypes(new RegExp(newRegexString), types)
	return new RegExp(newRegexString)
}

export default injectTypes
