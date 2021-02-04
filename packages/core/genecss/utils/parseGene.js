import injectCaptures from './injectCaptures'
import injectModifiers from './injectModifiers'
import injectTypes from './injectTypes'

// Parses gene by merging global modifiers, types, and captures
export default function (gene, config) {
	const { types: globalTypes, captures: globalCaptures, modifiers: globalModifiers } = config

	const modifiers = {}
	const modifierTypes = {}
	const modifierCaptures = {}
	if (gene.modifiedBy) {
		gene.modifiedBy.forEach((modifierName) => {
			const modifier = globalModifiers[modifierName]
			if (!modifier) throw new Error(`gene '${gene.name}' cannot use undefined modifier '${modifierName}'`)
			modifiers[modifierName] = modifier
			Object.assign(modifierTypes, modifier.types)
			Object.assign(modifierCaptures, modifier.captures)
		})
	}

	const types = { ...globalTypes, ...modifierTypes, ...gene.types }
	const captures = { ...globalCaptures, ...modifierCaptures, ...gene.captures }

	if (!gene.matches) throw new Error(`gene '${gene.name}' must have a 'matches' property defined`)

	const matches = injectTypes(injectCaptures(injectModifiers(gene.matches, modifiers), captures), types)

	console.log(matches)

	return {
		...gene,
		types,
		captures,
		modifiers,
		matches,
	}
}
