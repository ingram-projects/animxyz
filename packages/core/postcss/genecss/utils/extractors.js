export function basic(content) {
	return content.match(/[\w-]+/g) || []
}

export function greedy(content) {
	const broadMatches = content.match(/[^\s<>"'`]*[^\s<>"'`]/g) || []
	const innerMatches = content.match(/[^\s<>"'`.(){}[\]#=%]*[^\s<>"'`.(){}[\]#=%]/g) || []
	return broadMatches.concat(innerMatches)
}
