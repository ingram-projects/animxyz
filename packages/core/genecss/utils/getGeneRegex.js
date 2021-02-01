import injectCaptures from './injectCaptures'
import injectTypes from './injectTypes'

// Injects captures and types into gene regex
export default function (gene, config) {
	const { types, captures } = config
	const mergedTypes = { ...types, ...gene.types }
	const mergedCaptures = { ...captures, ...gene.captures }

	if (!gene.matches) throw new Error(`gene '${gene.name}' must have a 'matches' property defined`)

	return injectTypes(injectCaptures(gene.matches, mergedCaptures), mergedTypes)
}
