import { createRootWithNodes, getGeneratedGenes, mergeConfigs, resolveConfig } from './utils'
import defaultConfig from './defaultConfig'

const genecssPlugin = function (config) {
	const customConfig = resolveConfig(config ? config : './genecss.config.js')
	if (!customConfig) return

	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	return {
		postcssPlugin: 'genecss',
		Once(root) {
			const inlineGenes = {}
			root.walkAtRules('gene', (atRule) => {
				const geneName = atRule.params

				const inlineGene = {}
				let generatesString
				atRule.each((childNode) => {
					if (childNode.type === 'atrule') {
						switch (childNode.name) {
							case 'modified-by':
								inlineGene.modifiedBy = childNode.params.split(',').map((str) => str.trim())
								childNode.remove()
								break
							case 'matches':
								inlineGene.matches = childNode.params
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

				inlineGene.generates = (match, captured) => {
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

				inlineGenes[geneName] = inlineGene
			})

			const mergedGenes = { ...mergedConfig.genes, ...inlineGenes }
			const generatedGenes = getGeneratedGenes(mergedGenes, mergedConfig)

			root.walkAtRules('gene-layer', (atRule) => {
				const layerNodes = []
				for (const generatedGene of Object.values(generatedGenes)) {
					if (atRule.params === '*' || generatedGene.gene.layers.includes(atRule.params)) {
						const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
						layerNodes.push(...geneNodes)
					}
				}
				atRule.replaceWith(layerNodes)
			})
		},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
