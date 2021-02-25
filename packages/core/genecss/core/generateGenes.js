import generateGene from './generateGene'

export default function (genes, contentString, config) {
	const generatedGenes = {}

	for (const [geneName, gene] of Object.entries(genes)) {
		const generatedGene = generateGene(geneName, gene, contentString, config)

		if (generatedGene) {
			generatedGenes[geneName] = generatedGene
		}
	}

	return generatedGenes
}
