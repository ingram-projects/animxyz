import * as types from './types'

function defaultSortedBy(a, b) {
	return a.match.localeCompare(b.match)
}

export default {
	content: [],
	types,
	captures: {},
	modifiers: {},
	genes: {},
	sortedBy: defaultSortedBy,
}
