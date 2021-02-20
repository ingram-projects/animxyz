import { getGeneratedGenes, mergeConfigs, resolveConfig } from './utils'
import defaultConfig from './defaultConfig'

const genecssPlugin = function (config) {
	const customConfig = resolveConfig(config ? config : './genecss.config.js')
	if (!customConfig) return

	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	getGeneratedGenes(mergedConfig)

	return {
		postcssPlugin: 'genecss',
		Once() {},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
