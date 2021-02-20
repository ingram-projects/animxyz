import isEmptyObject from './isEmptyObject'
import getContentString from './getContentString'
import globalizeRegex from './globalizeRegex'
import parseGene from './parseGene'

export default function (config) {
	const { content, genes } = config

	if (isEmptyObject(genes)) throw new Error('no genes are defined')

	const contentString = getContentString(content)
	const generatedGenes = {}

	for (const [geneName, gene] of Object.entries(genes)) {
		const parsedGene = parseGene(
			{
				name: geneName,
				...gene,
			},
			config
		)

		const contentMatches = contentString.match(globalizeRegex(parsedGene.matches))

		if (contentMatches) {
			for (const match of contentMatches) {
				let generatedGene = generatedGenes[match]
				if (!generatedGene) {
					const node = parsedGene.generates(match)

					console.log(node.toString())

					generatedGene = {
						gene,
						node,
						count: 0,
					}
					generatedGenes[match] = generatedGene
				}
				generatedGene.count += 1
			}
		}
	}
}
