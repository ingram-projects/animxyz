import { parseConfig } from './config'
import { extractContentString, generateGene, generateGenes } from './core'
import { createRootWithNodes } from './utils'

const genecssPlugin = function (config) {
	const parsedConfig = parseConfig(config)

	const contentString = extractContentString(parsedConfig.content)
	const generatedGenes = generateGenes(parsedConfig.genes, contentString, parsedConfig)

	return {
		postcssPlugin: 'genecss',
		AtRule: {
			gene(atRule) {
				const gene = {}

				let generatesString
				atRule.each((childNode) => {
					if (childNode.type === 'atrule') {
						switch (childNode.name) {
							case 'modified-by':
								gene.modifiedBy = childNode.params.split(',').map((str) => str.trim())
								childNode.remove()
								break
							case 'matches':
								gene.matches = childNode.params
								childNode.remove()
								break
							case 'generates':
								generatesString = createRootWithNodes(childNode.nodes).toString()
								childNode.remove()
								break
						}
					}
				})

				if (!generatesString) {
					generatesString = createRootWithNodes(atRule.nodes).toString()
				}

				gene.generates = (match, captured) => {
					let node = generatesString
					const replaceTerms = {
						match,
						...captured,
					}
					for (const [replaceKey, replaceValue] of Object.entries(replaceTerms)) {
						node = node.replace(`$${replaceKey}`, replaceValue)
					}
					return node
				}

				const generatedGene = generateGene(atRule.params, gene, contentString, parsedConfig)
				const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)

				atRule.replaceWith(geneNodes)
			},
			'gene-layer'(atRule) {
				const layerNodes = []
				for (const generatedGene of Object.values(generatedGenes)) {
					if (atRule.params === '*' || generatedGene.gene.layers.includes(atRule.params)) {
						const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
						layerNodes.push(...geneNodes)
					}
				}
				atRule.replaceWith(layerNodes)
			},
		},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
