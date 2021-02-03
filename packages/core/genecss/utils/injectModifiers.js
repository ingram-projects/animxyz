import getRegexString from './getRegexString'

// Injects modifiers into regex string
export default function (regex, modifiers) {
	let newRegexString = getRegexString(regex)

	const prefixes = Object.values(modifiers).filter((modifier) => modifier.type === 'prefix')
	const postfixes = Object.values(modifiers).filter((modifier) => modifier.type === 'postfix')

	const prefixRegex = prefixes.map((prefix) => getRegexString(prefix.matches)).join('|')
	const postfixRegex = postfixes.map((postfix) => getRegexString(postfix.matches)).join('|')

	newRegexString = `(?:${prefixRegex})?${newRegexString}(?:${postfixRegex})?`
	return new RegExp(newRegexString)
}
