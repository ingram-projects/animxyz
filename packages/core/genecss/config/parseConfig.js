import defaultConfig from './defaultConfig'
import injectHelpers from './injectHelpers'
import resolveConfig from './resolveConfig'
import mergeConfigs from './mergeConfigs'

export default function (config) {
	const customConfig = resolveConfig(config ? config : './genecss.config.js')
	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	const { theme, captures, modifiers, layers, genes } = mergedConfig
	for (const obj of [theme, captures, modifiers, layers, genes]) {
		injectHelpers(obj, mergedConfig)
	}

	return mergedConfig
}
