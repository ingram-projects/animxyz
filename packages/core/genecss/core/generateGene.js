import { globalizeRegex } from '../utils'
import parseGene from './parseGene'

export default function (geneName, gene, contentString, config) {
	const parsedGene = parseGene(geneName, gene, config)
	const contentMatched = contentString.match(globalizeRegex(parsedGene.matches))

	let generatedGene = {
		gene: parsedGene,
		matched: {},
	}

	if (contentMatched) {
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
	}

	return generatedGene
}
