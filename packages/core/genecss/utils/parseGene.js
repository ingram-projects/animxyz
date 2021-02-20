import postcss from 'postcss'

import exactifyRegex from './exactifyRegex'
import injectCaptures from './injectCaptures'
import injectModifiers from './injectModifiers'
import injectTypes from './injectTypes'

function applyValueMap(value, valueMap, types) {
	if (typeof valueMap === 'object') {
		for (const [mappingKey, mapping] of Object.entries(valueMap)) {
			let matchesKey = false

			if (value !== undefined) {
				const mappingMatches = exactifyRegex(injectTypes(mappingKey, types))
				matchesKey = mappingMatches.test(value)
			} else if (mappingKey === '') {
				matchesKey = true
			}

			if (matchesKey) {
				if (typeof mapping === 'boolean') return mapping ? mappingKey : undefined
				if (typeof mapping === 'function') return mapping(value)
				return mapping
			}
		}
	}
}

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
		const capturedValues = {}
		for (const [groupName, groupValue] of Object.entries(matchObj.groups)) {
			const capture = captures[groupName]
			capturedValues[groupName] = capture ? applyValueMap(groupValue, capture, types) : groupValue
		}

		let node = gene.generates(matchStr, capturedValues)
		if (typeof node === 'string') {
			node = postcss.parse(node)
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
