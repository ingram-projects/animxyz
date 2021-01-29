import fs from 'fs'
import path from 'path'
import * as types from './types'

const defaultConfig = {
	content: [],
	types,
	captures: {},
	genes: {},
}

function resolveConfig(config) {
	if (typeof config === 'object') {
		return config
	}

	const configPath = path.resolve('./genecss.config.js')
	try {
		fs.accessSync(configPath)
	} catch (err) {
		return undefined
	}
	return require(configPath)
}

function mergeConfigs(config, extendConfig = {}) {
	return {
		...config,
		...extendConfig,
	}
}

const genecssPlugin = function (config) {
	const customConfig = resolveConfig(config)
	const mergedConfig = mergeConfigs(defaultConfig, customConfig)
	console.log(mergedConfig)
	// const { content, types, captures, genes } = mergedConfig

	return {
		postcssPlugin: 'genecss',
		Once() {},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
