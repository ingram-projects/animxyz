import fs from 'fs'
import path from 'path'
// import { iterateContent } from './utils'
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

function getRegexString(regex) {
	return regex.source || regex
}

// Injects capture groups into regex string
function injectCaptures(regexString, captures, nameCaptures) {
	let newRegexString = regexString
	Object.entries(captures).forEach(([captureName, capture]) => {
		let captureRegexString
		if (capture.matches) {
			captureRegexString = capture.matches
		} else if (capture.levels) {
			captureRegexString = Object.keys(capture.levels).join('|')
		} else {
			throw new Error(`capture <${captureName}> must have a 'matches' and/or a 'levels property defined`)
		}
		newRegexString = newRegexString.replace(`<${captureName}>`, () => {
			if (nameCaptures) {
				return `(?<${captureName}>${getRegexString(captureRegexString)})`
			}
			return `(?:${getRegexString(captureRegexString)})`
		})
	})
	return newRegexString
}

// Injects types into regex string
function injectTypes(regexString, types) {
	let newRegexString = regexString
	Object.entries(types).forEach(([typeName, type]) => {
		newRegexString = newRegexString.replace(new RegExp(`@${typeName}`, 'g'), `(?:${getRegexString(type)})`)
	})
	// Recurse until all types have been replaced
	if (newRegexString !== regexString) return injectTypes(newRegexString, types)
	return newRegexString
}

// Injects captures and types into gene regex
function getGeneRegex(gene, config, nameCaptures) {
	const { types, captures } = config
	const mergedTypes = { ...types, ...gene.types }
	const mergedCaptures = { ...captures, ...gene.captures }

	if (!gene.matches) throw new Error(`gene '${gene.name}' must have a 'matches' property defined`)

	return injectTypes(injectCaptures(getRegexString(gene.matches), mergedCaptures, nameCaptures), mergedTypes)
}

function getUsedSelectors(config) {
	const { genes } = config

	const geneRegexes = []
	Object.entries(genes).forEach(([geneName, gene]) => {
		const geneRegex = getGeneRegex(gene, config)
		geneRegexes.push(`(?<gene_${geneName}>${geneRegex})`)
	})

	const findGenesRegex = new RegExp(`${geneRegexes.join('|')}`)
	console.log(findGenesRegex)
	// iterateContent(content, processContent)
}

const genecssPlugin = function (config) {
	const customConfig = resolveConfig(config)
	const mergedConfig = mergeConfigs(defaultConfig, customConfig)

	getUsedSelectors(mergedConfig)

	return {
		postcssPlugin: 'genecss',
		Once() {},
	}
}
genecssPlugin.postcss = true

export default genecssPlugin
