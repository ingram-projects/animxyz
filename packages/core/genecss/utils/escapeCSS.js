import cssesc from 'cssesc'

export default function (str, isIdentifier = true) {
	return cssesc(str, { isIdentifier })
}
