import isEmptyObject from './isEmptyObject'
import getGeneRegex from './getGeneRegex'
import getContentString from './getContentString'

export default function (config) {
	const { content, genes } = config

	if (isEmptyObject(genes)) throw new Error('no genes are defined')

	const contentString = getContentString(content)
	const contentMatches = {}

	Object.entries(genes).forEach(([geneName, gene]) => {
		const geneRegex = new RegExp(getGeneRegex(gene, config), 'g')
		const geneMatches = (contentMatches[geneName] = {})

		let result
		while ((result = geneRegex.exec(contentString)) !== null) {
			const match = result[0]
			const existingMatch = geneMatches[match]
			if (existingMatch) {
				existingMatch.count += 1
			} else {
				geneMatches[match] = {
					groups: result.groups,
					count: 1,
				}
			}
		}
	})
	console.log(contentMatches)
}
