import applyCaptureMap from './applyCaptureMap'
import exactifyRegex from './exactifyRegex'
import injectCaptures from './injectCaptures'
import injectModifiers from './injectModifiers'
import injectTypes from './injectTypes'
import parseNode from './parseNode'

// Parses gene by merging global modifiers, types, and captures
export default function (gene, config) {
	if (!gene.matches) throw new Error(`gene '${gene.name}' must have a 'matches' property defined`)
	if (!gene.generates) throw new Error(`gene '${gene.name}' must have a 'generates' property defined`)

	const { types: globalTypes, captures: globalCaptures, modifiers: globalModifiers } = config

	const modifiers = {}
	const modifierTypes = {}
	const modifierCaptures = {}
	if (gene.modifiedBy) {
		for (const modifierName of gene.modifiedBy) {
			const modifier = globalModifiers[modifierName]
			if (!modifier) throw new Error(`gene '${gene.name}' cannot use undefined modifier '${modifierName}'`)
			modifiers[modifierName] = modifier
			Object.assign(modifierTypes, modifier.types)
			Object.assign(modifierCaptures, modifier.captures)
		}
	}

	const types = { ...globalTypes, ...modifierTypes, ...gene.types }

	const captures = { ...globalCaptures, ...modifierCaptures, ...gene.captures }

	const matches = injectTypes(injectCaptures(injectModifiers(gene.matches, modifiers), captures), types)

	const generates = (matchStr) => {
		const exactMatch = exactifyRegex(matches)
		const matchObj = matchStr.match(exactMatch)
		if (!matchObj) throw new Error(`string '${matchStr}' does not match gene '${gene.name}'`)
		const capturedValues = {}
		for (const [groupName, groupValue] of Object.entries(matchObj.groups)) {
			const capture = captures[groupName]
			capturedValues[groupName] = capture ? applyCaptureMap(groupValue, capture, types) : groupValue
		}

		let node = parseNode(gene.generates(matchStr, capturedValues))

		for (const [modifierName, modifier] of Object.entries(modifiers)) {
			if (matchObj.groups[`__modifier__${modifierName}`]) {
				node = parseNode(modifier.modifies(node, capturedValues))
			}
		}

		return node
	}

	return {
		...gene,
		modifiers,
		types,
		captures,
		matches,
		generates,
	}
}
