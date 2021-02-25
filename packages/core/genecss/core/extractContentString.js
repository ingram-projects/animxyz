import fs from 'fs'
import glob from 'glob'

export default function (content) {
	const contentArray = Array.isArray(content) ? content : [content]
	const globfiles = contentArray.filter((item) => typeof item === 'string')
	const rawContents = contentArray.filter((item) => typeof item === 'object' && item.content)

	const contentStrings = []

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
			const contentString = fs.readFile(file, 'utf-8')
			contentStrings.push(contentString)
		}
	}

	// extract raw contents
	for (const rawContent of rawContents) {
		const contentString = rawContent.content
		contentStrings.push(contentString)
	}

	return contentStrings.join()
}
