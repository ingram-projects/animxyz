import isEmptyObject from './isEmptyObject'
import getGeneRegex from './getGeneRegex'
// import iterateContent from './iterateContent'

export default function (config) {
	const { genes } = config

	if (isEmptyObject(genes)) throw new Error('no genes are defined')

	const geneRegexes = []
	Object.entries(genes).forEach(([geneName, gene]) => {
		const geneRegex = getGeneRegex(gene, config)
		geneRegexes.push(`(?<${geneName}>${geneRegex})`)
	})
	const findGenesRegex = new RegExp(`${geneRegexes.join('|')}`)
	console.log(findGenesRegex)
	// iterateContent(content, processContent)
}
