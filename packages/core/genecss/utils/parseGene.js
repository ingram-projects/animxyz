import applyCaptureMap from './applyCaptureMap'
import injectCaptures from './injectCaptures'
import injectModifiers from './injectModifiers'
import injectTypes from './injectTypes'
import parseNode from './parseNode'

// Parses gene by merging global modifiers, types, and captures
export default function (geneName, gene, config) {
	if (typeof gene === 'string') {
		gene = {
			generates: gene,
		}
	}

	if (!gene.generates) throw new Error(`gene '${geneName}' must have a 'generates' property defined`)

	const { types: globalTypes, captures: globalCaptures, modifiers: globalModifiers, sortedBy: globalSortedBy } = config

	const modifiers = {}
	const modifierTypes = {}
	const modifierCaptures = {}
	if (gene.modifiedBy) {
		for (const modifierName of gene.modifiedBy) {
			const modifier = globalModifiers[modifierName]
			if (!modifier) throw new Error(`gene '${geneName}' cannot use undefined modifier '${modifierName}'`)
			modifiers[modifierName] = modifier
			Object.assign(modifierTypes, modifier.types)
			Object.assign(modifierCaptures, modifier.captures)
		}
	}

	const types = { ...globalTypes, ...modifierTypes, ...gene.types }

	const captures = { ...globalCaptures, ...modifierCaptures, ...gene.captures }

	const matches = injectTypes(injectCaptures(injectModifiers(gene.matches || geneName, modifiers), captures), types)

	const generates = (match, groups) => {
		const capturedValues = {}
		if (groups) {
			for (const [groupName, groupValue] of Object.entries(groups)) {
				const capture = captures[groupName]
				capturedValues[groupName] = capture ? applyCaptureMap(groupValue, capture, types) : groupValue
			}
		}

		let node = parseNode(typeof gene.generates === 'string' ? gene.generates : gene.generates(match, capturedValues))

		for (const [modifierName, modifier] of Object.entries(modifiers)) {
			if (groups[`__modifier__${modifierName}`]) {
				node = parseNode(modifier.modifies(node, capturedValues))
			}
		}

		return node
	}

	const sortedBy = gene.sortedBy || globalSortedBy

	return {
		...gene,
		modifiers,
		types,
		captures,
		matches,
		generates,
		sortedBy,
	}
}
