import isEmptyObject from './isEmptyObject'
import stringifyRegex from './stringifyRegex'
import joinRegexes from './joinRegexes'

// Injects modifiers into regex string
export default function (regex, modifiers) {
	if (isEmptyObject(modifiers)) return regex

	let newRegexString = stringifyRegex(regex)

	const prefixRegexes = []
	const postfixRegexes = []
	Object.entries(modifiers).forEach(([modifierName, modifier]) => {
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
	})

	const prefixRegexString = stringifyRegex(joinRegexes(...prefixRegexes))
	const postfixRegexString = stringifyRegex(joinRegexes(...postfixRegexes))

	newRegexString = `(${prefixRegexString})?${newRegexString}(${postfixRegexString})?`
	return new RegExp(newRegexString)
}
