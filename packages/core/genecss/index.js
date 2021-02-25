import { parseConfig } from './config'
import { extractContentString, generateGenes, processGeneAtRule, processGeneLayersAtRule } from './core'

const genecssPlugin = function (config) {
	const parsedConfig = parseConfig(config)

	const contentString = extractContentString(parsedConfig.content)
	const generatedGenes = generateGenes(parsedConfig.genes, contentString, parsedConfig)

	return {
		postcssPlugin: 'genecss',
		AtRule: {
			gene(atRule) {
				processGeneAtRule(atRule, contentString, parsedConfig)
			},
			'gene-layers'(atRule) {
				processGeneLayersAtRule(atRule, generatedGenes, parsedConfig)
			},
		},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
