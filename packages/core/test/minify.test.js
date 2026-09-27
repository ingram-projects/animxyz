'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const { compileSass } = require('./helpers/sass')

// Runs the same pipeline as `npm run build` (sass -> autoprefixer -> the
// .postcss-cssnano config) in memory, so the minified output is checked
// without depending on a prior build.
const cssnanoConfig = require(path.join(__dirname, '..', '.postcss-cssnano', 'postcss.config.js'))

async function minifiedBuild() {
	const result = compileSass('build.scss')
	assert.equal(result.status, 0, result.stderr)
	const prefixed = await postcss([autoprefixer]).process(result.stdout, { from: undefined })
	const minified = await postcss(cssnanoConfig.plugins).process(prefixed.css, { from: undefined })
	return minified.css
}

// The keyframe var() fallbacks are written as `0px` / `0deg` so they stay valid
// for each dial's registered @property syntax. cssnano's default preset strips
// zero-length units (`0px` -> `0`), which silently undid that in
// dist/animxyz.min.css.
test('minified output keeps units on zero var() fallbacks and @property initial-values', async () => {
	const css = await minifiedBuild()

	// Every fallback the minifier emitted for each dial (kept short so a failure
	// message does not dump the whole stylesheet).
	const fallbacks = (name) => [...new Set(css.match(new RegExp(`var\\(--xyz-${name},[^)]*\\)`, 'g')))]
	for (const axis of ['x', 'y', 'z']) {
		assert.deepEqual(fallbacks(`translate-${axis}`), [`var(--xyz-translate-${axis},0px)`])
		assert.deepEqual(fallbacks(`rotate-${axis}`), [`var(--xyz-rotate-${axis},0deg)`])
	}
	for (const axis of ['x', 'y']) {
		assert.deepEqual(fallbacks(`skew-${axis}`), [`var(--xyz-skew-${axis},0deg)`])
	}

	const initialValue = (name) => {
		const match = css.match(new RegExp(`@property --xyz-${name}\\{[^}]*initial-value:([^;}]+)`))
		assert.ok(match, `expected an @property rule for --xyz-${name}`)
		return match[1]
	}
	for (const name of ['translate-x', 'translate-y', 'translate-z']) {
		assert.equal(initialValue(name), '0px', `--xyz-${name} initial-value`)
	}
	for (const name of ['rotate-x', 'rotate-y', 'rotate-z', 'skew-x', 'skew-y']) {
		// A unitless 0 is not a valid <angle>: it would invalidate the whole rule.
		assert.equal(initialValue(name), '0deg', `--xyz-${name} initial-value`)
	}
})
