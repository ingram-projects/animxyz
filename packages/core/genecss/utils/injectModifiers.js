import isEmptyObject from './isEmptyObject'
import stringifyRegex from './stringifyRegex'
import joinRegexes from './joinRegexes'

// Injects modifiers into regex string
export default function (regex, modifiers) {
	if (isEmptyObject(modifiers)) return regex

	let newRegexString = stringifyRegex(regex)

	const prefixRegexes = []
	const postfixRegexes = []
	for (const [modifierName, modifier] of Object.entries(modifiers)) {
		if (modifier.matches) {
			switch (modifier.type) {
				case 'prefix':
					prefixRegexes.push(modifier.matches)
					break
				case 'postfix':
					postfixRegexes.push(modifier.matches)
					break
				default:
					throw new Error(`modifier ${modifierName} must have a 'type' property of either 'prefix' or 'postfix'`)
			}
		} else {
			throw new Error(`modifier ${modifierName} must have a defined 'matches' property`)
		}
	}

	const prefixRegex = joinRegexes(...prefixRegexes)
	const postfixRegex = joinRegexes(...postfixRegexes)

	newRegexString = `(?:${stringifyRegex(prefixRegex)})*${newRegexString}(?:${stringifyRegex(postfixRegex)})*`
	return new RegExp(newRegexString)
}
