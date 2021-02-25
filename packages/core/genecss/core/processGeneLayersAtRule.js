import { createRootWithNodes, parseNode } from '../utils'

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
			if (isAllLayer || generatedGene.gene.inLayers.includes(atRuleLayer)) {
				const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
				childNodes.push(...geneNodes)
			}
		}

		let layerNode
		if (layer && layer.generates) {
			layerNode = parseNode(layer.generates(childNodes))
		} else {
			layerNode = createRootWithNodes(childNodes)
		}
		layerNode.cleanRaws()

		layerNodes.push(layerNode)
	}

	atRule.replaceWith(layerNodes)
}
