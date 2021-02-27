import { createRootWithNodes, processNode } from '../utils'

export default function (atRule, generatedGenes, config) {
	const { layers } = config
	const atRuleLayers = atRule.params.split(',').map((str) => str.trim())

	const layerNodes = []
	for (const atRuleLayer of atRuleLayers) {
		const layer = layers[atRuleLayer]
		const isAllLayer = atRuleLayer === '*'

		if (!isAllLayer && !layer) throw new Error(`layer '${atRuleLayer}' not found in config`)

		const childNodes = []
		for (const generatedGene of Object.values(generatedGenes)) {
			if (isAllLayer || generatedGene.gene.layers.includes(atRuleLayer)) {
				const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
				childNodes.push(...geneNodes)
			}
		}

		let layerNode
		if (layer && layer.generates) {
			layerNode = processNode(layer.generates(childNodes))
		} else {
			layerNode = createRootWithNodes(childNodes)
		}

		layerNodes.push(layerNode)
	}

	const rootNode = createRootWithNodes(layerNodes)
	atRule.replaceWith(rootNode)
}
