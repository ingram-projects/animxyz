import { getGeneratedGenes, mergeConfigs, resolveConfig } from './utils'
import defaultConfig from './defaultConfig'

const genecssPlugin = function (config) {
	const customConfig = resolveConfig(config ? config : './genecss.config.js')
	if (!customConfig) return

	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	const generatedGenes = getGeneratedGenes(mergedConfig)

	console.log(generatedGenes)

	return {
		postcssPlugin: 'genecss',
		AtRule: {
			// gene(atRule) {
			// 	console.log(atRule)
			// },
			'gene-layer'(atRule) {
				const layerNodes = []
				Object.values(generatedGenes).forEach((generatedGene) => {
					if (generatedGene.gene.layers.includes(atRule.params)) {
						const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)
						layerNodes.push(...geneNodes)
					}
				})
				atRule.replaceWith(layerNodes)
			},
		},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
