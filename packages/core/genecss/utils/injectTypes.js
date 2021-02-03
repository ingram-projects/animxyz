import getRegexString from './getRegexString'

// Injects types into regex string
function injectTypes(regex, types) {
	const regexString = getRegexString(regex)
	let newRegexString = regexString
	Object.entries(types).forEach(([typeName, type]) => {
		newRegexString = newRegexString.replace(new RegExp(`@${typeName}`, 'g'), `(?:${getRegexString(type)})`)
	})
	// Recurse until all types have been replaced
	if (newRegexString !== regexString) return injectTypes(new RegExp(newRegexString), types)
	return new RegExp(newRegexString)
}

export default injectTypes
