'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const { compileSass } = require('./helpers/sass')
const { normalizeCss } = require('./helpers/normalize-css')

const SNAPSHOT_PATH = path.join(__dirname, '__snapshots__', 'animxyz.css')

test('build.scss output matches the committed CSS snapshot', () => {
	const result = compileSass('build.scss')
	assert.equal(result.status, 0, `build.scss failed to compile:\n${result.stderr}`)

	const actual = normalizeCss(result.stdout)

	assert.ok(
		fs.existsSync(SNAPSHOT_PATH),
		`Snapshot missing at ${SNAPSHOT_PATH}. Run "npm run test:update-snapshot -w @animxyz/core" to create it.`
	)
	const expected = fs.readFileSync(SNAPSHOT_PATH, 'utf8').trim()

	assert.equal(
		actual,
		expected,
		'Compiled build.scss output no longer matches test/__snapshots__/animxyz.css.\n' +
			'If this change is intentional, regenerate the snapshot with:\n' +
			'  npm run test:update-snapshot -w @animxyz/core\n' +
			'then review the diff and explain it in the PR description.'
	)
})
