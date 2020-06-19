const fs = require('fs')
const gzipSize = require('gzip-size')
const prettyBytes = require('pretty-bytes')

const files = process.argv.slice(2)

files.forEach((file) => {
	const stats = fs.statSync(file)
	const gzipped = gzipSize.fileSync(file)

	console.table({
		Stats: {
			File: file,
			Size: prettyBytes(stats.size),
			Gzipped: prettyBytes(gzipped),
		},
	})
})
