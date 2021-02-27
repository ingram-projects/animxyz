import * as defaultTypes from './defaultTypes'

function defaultSortedBy([a], [b]) {
	return a.localeCompare(b)
}

export default {
	content: [],
	theme: {},
	types: defaultTypes,
	captures: {},
	modifiers: {},
	layers: {},
	genes: {},
	sortedBy: defaultSortedBy,
}
