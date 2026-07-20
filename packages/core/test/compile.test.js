'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const { compileSass } = require('./helpers/sass')

test('build.scss compiles without errors', () => {
	const result = compileSass('build.scss')

	assert.equal(result.status, 0, `expected sass to exit 0, got ${result.status}\n${result.stderr}`)
	assert.ok(result.stdout.length > 0, 'expected compiled CSS output')
})

// A3 (fix/build-hygiene) replaced build.scss's `@import` with
// `@use 'src/animxyz' as *;`, which removes the Dart Sass deprecation
// warning. This assertion now enforces zero deprecation warnings on every
// compile of the entry point.
test('build.scss compiles without deprecation warnings', () => {
	const result = compileSass('build.scss')
	assert.doesNotMatch(result.stderr, /DEPRECATION WARNING/)
})
