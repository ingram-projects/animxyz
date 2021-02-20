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
		const parsedGene = parseGene(geneName, gene, config)
		const contentMatches = contentString.matchAll(globalizeRegex(parsedGene.matches))

		if (contentMatches) {
			let generatedGene = {}

			for (const matchObj of contentMatches) {
				const match = matchObj[0]
				const groups = matchObj.groups

				let generatedGeneMatch = generatedGene[match]
				if (!generatedGeneMatch) {
					const node = parsedGene.generates(match, groups)
					generatedGeneMatch = {
						gene: parsedGene,
						node,
						match,
						groups,
						count: 0,
					}
					console.log(groups)
					generatedGene[match] = generatedGeneMatch
				}
				generatedGeneMatch.count += 1
			}

			generatedGene = Object.fromEntries(
				Object.entries(generatedGene).sort(([, a], [, b]) => parsedGene.sortedBy(a, b))
			)

			generatedGenes[geneName] = generatedGene
		}
	}

	console.log(generatedGenes)
}
