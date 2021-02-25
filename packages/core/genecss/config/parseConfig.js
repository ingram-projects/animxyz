import defaultConfig from './defaultConfig'
import resolveConfig from './resolveConfig'
import mergeConfigs from './mergeConfigs'

export default function (config) {
	const customConfig = resolveConfig(config ? config : './genecss.config.js')
	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	return mergedConfig
}
