'use strict'

// Regenerates test/__snapshots__/animxyz.css from the current build.scss
// output. Run via: npm run test:update-snapshot -w @animxyz/core
//
// Always review the resulting `git diff` before committing -- the snapshot
// test exists precisely to make output changes visible and deliberate.

const fs = require('node:fs')
const path = require('node:path')

const { compileSass } = require('./helpers/sass')
const { normalizeCss } = require('./helpers/normalize-css')

const SNAPSHOT_PATH = path.join(__dirname, '__snapshots__', 'animxyz.css')

function main() {
	const result = compileSass('build.scss')

	if (result.status !== 0) {
		console.error('Failed to compile build.scss:')
		console.error(result.stderr)
		process.exit(result.status || 1)
	}

	const normalized = normalizeCss(result.stdout)

	fs.mkdirSync(path.dirname(SNAPSHOT_PATH), { recursive: true })
	fs.writeFileSync(SNAPSHOT_PATH, `${normalized}\n`, 'utf8')

	console.log(`Updated snapshot: ${SNAPSHOT_PATH}`)
	console.log('Review the diff (git diff -- test/__snapshots__/animxyz.css) before committing.')
}

main()
