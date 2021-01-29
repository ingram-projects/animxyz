import fs from 'fs'
import glob from 'glob'

export default async function (content, extractors, defaultExtractor) {
	const globfiles = content.filter((item) => typeof item === 'string')
	const rawcontents = content.filter((item) => typeof item === 'object')

	const selectors = new Set()

	// extract file contents
	for (const globfile of globfiles) {
		let filesNames = []

		try {
			fs.access(globfile, fs.constants.F_OK)
			filesNames.push(globfile)
		} catch (err) {
			filesNames = glob.sync(globfile, { nodir: true })
		}

		for (const file of filesNames) {
			const content = fs.readFile(file, 'utf-8')
			const extractor = extractors.find((e) => e.extensions.find((ext) => file.endsWith(ext))) || defaultExtractor
			const extractedSelectors = await extractor(content)
			extractedSelectors.forEach(selectors.add, selectors)
		}
	}

	// extract raw contents
	for (const rawcontent of rawcontents) {
		const content = rawcontent.content
		const extractor = extractors.find((e) => e.extensions.includes(content.extension)) || defaultExtractor
		const extractedSelectors = await extractor(content)
		extractedSelectors.forEach(selectors.add, selectors)
	}

	return selectors
}
