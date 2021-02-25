import { exactifyRegex, parseNode } from '../utils'
import applyCaptureMap from './applyCaptureMap'
import injectCaptures from './injectCaptures'
import injectModifiers from './injectModifiers'
import injectTypes from './injectTypes'

// Parses gene by merging global modifiers, types, and captures
export default function (geneName, gene, config) {
	const { types: globalTypes, captures: globalCaptures, modifiers: globalModifiers, sortedBy: globalSortedBy } = config

	if (typeof gene === 'string' || typeof gene === 'function') {
		gene = {
			generates: gene,
		}
	}

	if (!gene.generates) throw new Error(`gene '${geneName}' must have a 'generates' property defined`)

	const layers = gene.layers || []

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

	const matchesString = (matchStr) => {
		const exactMatch = exactifyRegex(matches)
		const matchObj = matchStr.match(exactMatch)
		if (!matchObj) return null

		const match = matchObj[0]
		const groups = matchObj.groups

		const captured = {}
		if (groups) {
			for (const [groupName, groupValue] of Object.entries(groups)) {
				const capture = captures[groupName]
				captured[groupName] = capture ? applyCaptureMap(groupValue, capture, types) : groupValue
			}
		}

		return {
			match,
			captured,
		}
	}

	const generates = (matchStr) => {
		const matchObj = matchesString(matchStr)
		if (!matchObj) return null

		const { match, captured } = matchObj

		let node = parseNode(typeof gene.generates === 'string' ? gene.generates : gene.generates(match, captured))
		for (const [modifierName, modifier] of Object.entries(modifiers)) {
			if (captured[`__modifier__${modifierName}`]) {
				node = parseNode(modifier.modifies(node, captured))
			}
		}
		node.cleanRaws()

		return node
	}

	const sortedBy = gene.sortedBy || globalSortedBy

	return {
		...gene,
		layers,
		modifiers,
		types,
		captures,
		matches,
		matchesString,
		generates,
		sortedBy,
	}
}
