import fs from 'fs'
import glob from 'glob'

export default async function (content, cb) {
	const contentArray = Array.isArray(content) ? content : [content]
	const globfiles = contentArray.filter((item) => typeof item === 'string')
	const rawcontents = contentArray.filter((item) => typeof item === 'object' && item.content)

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
			await cb(contentString)
		}
	}

	// extract raw contents
	for (const rawcontent of rawcontents) {
		const contentString = rawcontent.content
		await cb(contentString)
	}
}
