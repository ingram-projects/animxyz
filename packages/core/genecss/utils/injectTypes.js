import getRegexString from './getRegexString'

// Injects types into regex string
function injectTypes(regexString, types) {
	let newRegexString = regexString
	Object.entries(types).forEach(([typeName, type]) => {
		newRegexString = newRegexString.replace(new RegExp(`@${typeName}`, 'g'), `(?:${getRegexString(type)})`)
	})
	// Recurse until all types have been replaced
	if (newRegexString !== regexString) return injectTypes(newRegexString, types)
	return newRegexString
}

export default injectTypes
