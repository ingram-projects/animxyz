import * as types from './types'

function defaultSortedBy([a], [b]) {
	return a.localeCompare(b)
}

export default {
	content: [],
	types,
	captures: {},
	modifiers: {},
	genes: {},
	sortedBy: defaultSortedBy,
}
