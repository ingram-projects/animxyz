export default function (atRule, generatedGenes) {
	const layerNodes = []
	for (const generatedGene of Object.values(generatedGenes)) {
		if (atRule.params === '*' || generatedGene.gene.layers.includes(atRule.params)) {
			const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
			layerNodes.push(...geneNodes)
		}
	}
	atRule.replaceWith(layerNodes)
}
