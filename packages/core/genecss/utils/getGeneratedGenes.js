import isEmptyObject from './isEmptyObject'
import getContentString from './getContentString'
import globalizeRegex from './globalizeRegex'
import parseGene from './parseGene'

export default function (genes, config) {
	const { content } = config

	if (isEmptyObject(genes)) throw new Error('no genes are defined')

	const contentString = getContentString(content)
	const generatedGenes = {}

	for (const [geneName, gene] of Object.entries(genes)) {
		const parsedGene = parseGene(geneName, gene, config)
		const contentMatched = contentString.match(globalizeRegex(parsedGene.matches))

		if (contentMatched) {
			let generatedGene = {
				gene: parsedGene,
				matched: {},
			}

			for (const match of contentMatched) {
				const { captured } = parsedGene.matchesString(match)

				let geneMatch = generatedGene.matched[match]
				if (!geneMatch) {
					const node = parsedGene.generates(match, captured)
					geneMatch = {
						match,
						captured,
						node,
						count: 0,
					}
					generatedGene.matched[match] = geneMatch
				}
				geneMatch.count += 1
			}

			generatedGene.matched = Object.fromEntries(
				Object.entries(generatedGene.matched).sort(([, a], [, b]) => {
					return parsedGene.sortedBy([a.match, a.captured], [b.match, b.captured])
				})
			)

			generatedGenes[geneName] = generatedGene
		}
	}

	return generatedGenes
}
