import fs from 'fs'
import path from 'path'
import mergeConfigs from './mergeConfigs'

function resolveConfig(config) {
	if (!config) return undefined

	if (Array.isArray(config)) {
		return mergeConfigs(...config.map(resolveConfig))
	}

	if (typeof config === 'object') {
		return config
	}

	if (typeof config === 'string') {
		const configPath = path.resolve(config)
		try {
			fs.accessSync(configPath)
		} catch (err) {
			return undefined
		}
		return require(configPath)
	}

	return undefined
}

export default resolveConfig
