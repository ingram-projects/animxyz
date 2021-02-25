import * as defaultTypes from './defaultTypes'

function defaultSortedBy([a], [b]) {
	return a.localeCompare(b)
}

export default {
	content: [],
	types: defaultTypes,
	captures: {},
	modifiers: {},
	genes: {},
	layers: {},
	sortedBy: defaultSortedBy,
}
