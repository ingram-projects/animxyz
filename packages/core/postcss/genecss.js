// import fs from 'fs'
// import glob from 'glob'

// const defaultDefaultExtractor = (content) => {
// 	return content.match(/[A-Za-z\d_-]+/g) || []
// }

// const defaultGroups = {
// 	integer: /[+-]?\d+/,
// 	float: /[+-]?(\d*\.)?\d+/,
// 	percentage: /[+-]?(\d*\.)?\d+%/,
// 	length: /[+-]?(\d*\.)?\d+px|em|rem|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pc|pt/,
// 	angle: /[+-]?(\d*\.)?\d+deg|turn|rad|grad/,
// 	color: /(?:#|0x)(?:[a-f\d]{3}|[a-f\d]{6})\b|(?:rgb|hsl)a?\([^)]*\)/,
// }

// const genecssPlugin = function (config = {}) {
// 	const {
// 		content = [],
// 		defaultExtractor = defaultDefaultExtractor,
// 		extractors = [],
// 		groups = defaultGroups,
// 		layers = [],
// 	} = config

// 	async function extractSelectors() {
// 		const globfiles = content.filter((item) => typeof item === 'string')
// 		const rawcontents = content.filter((item) => typeof item === 'object')

// 		const selectors = new Set()

// 		// extract file contents
// 		for (const globfile of globfiles) {
// 			let filesNames = []

// 			try {
// 				fs.access(globfile, fs.constants.F_OK)
// 				filesNames.push(globfile)
// 			} catch (err) {
// 				filesNames = glob.sync(globfile, { nodir: true })
// 			}

// 			for (const file of filesNames) {
// 				const content = fs.readFile(file, 'utf-8')
// 				const extractor = extractors.find((e) => e.extensions.find((ext) => file.endsWith(ext))) || defaultExtractor
// 				const extractedSelectors = await extractor(content)
// 				extractedSelectors.forEach(selectors.add, selectors)
// 			}
// 		}

// 		// extract raw contents
// 		for (const rawcontent of rawcontents) {
// 			const content = rawcontent.content
// 			const extractor = extractors.find((e) => e.extensions.includes(content.extension)) || defaultExtractor
// 			const extractedSelectors = await extractor(content)
// 			extractedSelectors.forEach(selectors.add, selectors)
// 		}

// 		return selectors
// 	}

// 	return {
// 		postcssPlugin: 'genecss',
// 		Once() {},
// 	}
// }
// genecssPlugin.postcss = true

// export default genecssPlugin
