'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const { compileSass } = require('./helpers/sass')

test('xyz-var: emits cascading var() chains', () => {
	const result = compileSass('test/fixtures/xyz-var.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /--test-all: var\(--xyz-duration, var\(--xyz-duration-default\)\);/)
	assert.match(
		result.stdout,
		/--test-mode: var\(--xyz-in-duration, var\(--xyz-duration, var\(--xyz-in-duration-default, var\(--xyz-duration-default\)\)\)\);/
	)
	assert.match(result.stdout, /--test-fallback: var\(--xyz-duration, 0s\);/)
})

// A3 (fix/build-hygiene) dedups $xyz-duration-levels / $xyz-delay-levels /
// $xyz-stagger-levels by deriving them all from a shared $xyz-time-levels
// map, while keeping every one of the three public names independently
// !default-overridable. This proves a consumer who overrides just
// $xyz-delay-levels still gets that override applied, and that it doesn't
// leak into the sibling duration/stagger maps.
test('$xyz-delay-levels: remains independently overridable after the time-map dedup', () => {
	const result = compileSass('test/fixtures/xyz-time-levels-override.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-delay-override \{\n\s*--xyz-delay: 42s;/)
	assert.match(result.stdout, /\.xyz-duration-unaffected \{\n\s*--xyz-duration: 0\.5s;/)
	assert.match(result.stdout, /\.xyz-stagger-unaffected \{\n\s*--xyz-stagger: 0\.5s;/)
})

test('xyz-set-all: sets every variable/mode combination to the given value', () => {
	const result = compileSass('test/fixtures/xyz-set-all.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /--xyz-duration: unset;/)
	assert.match(result.stdout, /--xyz-in-duration: unset;/)
	assert.match(result.stdout, /--xyz-out-duration: unset;/)
	assert.match(result.stdout, /--xyz-appear-duration: unset;/)
})

test('xyz-utility: default level falls back to the -default custom property', () => {
	const result = compileSass('test/fixtures/xyz-utility.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-utility-default \{\n\s*--xyz-duration: var\(--xyz-duration-default\);/)
})

test('xyz-utility: explicit level resolves to its mapped value', () => {
	const result = compileSass('test/fixtures/xyz-utility.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-utility-leveled \{\n\s*--xyz-duration: 0\.5s;/)
})

test('xyz-utility: mode argument namespaces the emitted variable', () => {
	const result = compileSass('test/fixtures/xyz-utility.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-utility-moded \{\n\s*--xyz-in-duration: 0\.5s;/)
})

test('xyz-utility: invalid level raises a Sass @error', () => {
	const result = compileSass('test/fixtures/xyz-utility-invalid-level.scss')

	assert.notEqual(result.status, 0)
	assert.match(result.stderr, /not-a-real-level is not a valid level for the duration utility\./)
})

test('xyz-animation: emits the delay chain, transform-origin, and animation shorthand', () => {
	const result = compileSass('test/fixtures/xyz-animation.scss')

	assert.equal(result.status, 0, result.stderr)
	// A3 (fix/build-hygiene) removed the undocumented --xyz-*-calc shim
	// variables (a postcss-calc workaround no longer needed); the calc()
	// expressions are now written directly into these custom properties.
	assert.match(result.stdout, /--xyz-stagger-delay: calc\(var\(--xyz-nested-stagger-delay,/)
	assert.match(result.stdout, /--xyz-total-delay: calc\(var\(--xyz-stagger-delay,/)
	assert.doesNotMatch(result.stdout, /--xyz-stagger-delay-calc/)
	assert.doesNotMatch(result.stdout, /--xyz-total-delay-calc/)
	assert.doesNotMatch(result.stdout, /--xyz-delay-calc/)
	assert.match(result.stdout, /transform-origin: var\(--xyz-in-origin,/)
	// backface-visibility: visible was removed in v1 (it only re-forced the
	// initial value; kept only for consumers who relied on the library forcing it).
	assert.doesNotMatch(result.stdout, /backface-visibility/)
	assert.match(result.stdout, /animation:\n?\s*var\(--xyz-in-duration,/)
	assert.match(result.stdout, /animation-name: xyz-in-keyframes, var\(--xyz-in-keyframes,/)
})

test('xyz-make-keyframes: emits per-mode @keyframes and utility selectors', () => {
	const result = compileSass('test/fixtures/xyz-make-keyframes.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /@keyframes xyz-in-fade \{/)
	assert.match(result.stdout, /@keyframes xyz-out-fade \{/)
	assert.match(result.stdout, /@keyframes xyz-appear-fade \{/)
	assert.match(result.stdout, /\[data-xyz~=fade\], \[data-xyz~=in-fade\] \{/)
	assert.match(result.stdout, /--xyz-in-keyframes: xyz-in-fade;/)
})

// xyz-apply() -- repaired by work brief A2 · fix/xyz-apply. The parser turns a
// space-separated attribute string into xyz-utility() calls. These assertions
// cover the happy paths plus regressions for the three original bugs (swapped
// level/mode args, substring mode detection, substring name detection).

test('xyz-apply: bare utility resolves to its default-level declaration', () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-bare \{\n\s*--xyz-opacity: calc\(1 - var\(--xyz-opacity-default\)\);/)
})

test('xyz-apply: leveled utility resolves to its mapped level value', () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-leveled \{\n\s*--xyz-opacity: calc\(1 - 0\.5\);/)
})

test('xyz-apply: mode prefix namespaces the emitted variable (bug 1 regression)', () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-moded \{\n\s*--xyz-in-opacity: calc\(1 - var\(--xyz-opacity-default\)\);/)
})

test('xyz-apply: mode + level parse together, not swapped (bug 1 regression)', () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-moded-leveled \{\n\s*--xyz-in-opacity: calc\(1 - 0\.5\);/)
})

test('xyz-apply: multiple tokens in one string each emit their own declaration', () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	// 'fade up-100% in-rotate-right'
	assert.match(
		result.stdout,
		/\.xyz-apply-multi \{\n\s*--xyz-opacity: calc\(1 - var\(--xyz-opacity-default\)\);\n\s*--xyz-translate-y: calc\(100% \* -1\);\n\s*--xyz-in-rotate-z: var\(--xyz-rotate-default\);/
	)
})

test("xyz-apply: 'thin' is a utility, not mode 'in' (bug 2 regression)", () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-thin \{\n\s*--xyz-scale-z: calc\(1 - var\(--xyz-scale-default\)\);/)
	// Must NOT be mis-namespaced as an 'in' mode variable.
	assert.doesNotMatch(result.stdout, /\.xyz-apply-thin \{\n\s*--xyz-in-/)
})

test("xyz-apply: 'origin' is a utility, not mode 'in' (bug 2 regression)", () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-origin \{\n\s*--xyz-origin: top;/)
})

test("xyz-apply: 'flip-up' wins over 'up' (bug 3 regression)", () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	// flip-up-100% -> rotate-x 1turn, NOT translate-y.
	assert.match(result.stdout, /\.xyz-apply-flip-up \{\n\s*--xyz-rotate-x: 1turn;/)
	assert.doesNotMatch(result.stdout, /\.xyz-apply-flip-up \{\n\s*--xyz-translate-y:/)
})

test("xyz-apply: bare 'up' still resolves to translate-y (bug 3 regression)", () => {
	const result = compileSass('test/fixtures/xyz-apply.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(result.stdout, /\.xyz-apply-up \{\n\s*--xyz-translate-y: calc\(100% \* -1\);/)
})

test('xyz-apply: unknown utility token raises a Sass @error', () => {
	const result = compileSass('test/fixtures/xyz-apply-invalid.scss')

	assert.notEqual(result.status, 0, 'expected an unknown utility token to fail to compile')
	assert.match(result.stderr, /notautility is not a valid xyz utility\./)
})

test('xyz-make-properties: registers all-mode dials with typed syntax', () => {
	const result = compileSass('test/fixtures/xyz-make-properties.scss')

	assert.equal(result.status, 0, result.stderr)

	// Registered with the correct type, inheritance, and identity initial-value.
	// The initial-value MUST equal the keyframe identity fallback so registration
	// stays behavior-preserving.
	assert.match(
		result.stdout,
		/@property --xyz-opacity \{\s*syntax: "<number>";\s*inherits: true;\s*initial-value: 1;\s*\}/
	)
	assert.match(
		result.stdout,
		/@property --xyz-translate-x \{\s*syntax: "<length-percentage>";\s*inherits: true;\s*initial-value: 0px;\s*\}/
	)
	assert.match(
		result.stdout,
		/@property --xyz-rotate-z \{\s*syntax: "<angle>";\s*inherits: true;\s*initial-value: 0deg;\s*\}/
	)

	// A garbage value assigned to a registered dial (e.g. `--xyz-opacity: red`)
	// is rejected at computed-value time and falls back to the typed
	// initial-value instead of poisoning the animation — that is the type-safety
	// this registration buys.

	// CRITICAL INVARIANT: mode-specific dials are NEVER registered. Registering
	// them with an initial-value would make them always-valid and kill the
	// `var(--xyz-<mode>-<name>, var(--xyz-<name>, …))` fallthrough that the mode
	// cascade depends on (a plain `fade` would stop fading).
	assert.doesNotMatch(result.stdout, /@property --xyz-in-opacity\b/)
	assert.doesNotMatch(result.stdout, /@property --xyz-out-translate-x\b/)
	assert.doesNotMatch(result.stdout, /@property --xyz-appear-scale-y\b/)

	// Freeform/keyword-bearing vars stay unregistered (registration buys nothing
	// or cannot express the value, e.g. perspective's `none`).
	assert.doesNotMatch(result.stdout, /@property --xyz-perspective\b/)
	assert.doesNotMatch(result.stdout, /@property --xyz-transform\b/)
})

test('cascade output is wrapped in @layer with the documented order', () => {
	const result = compileSass('build.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.match(
		result.stdout,
		/@layer xyz\.defaults, xyz\.index\.ladder, xyz\.index\.modern, xyz\.utilities, xyz\.triggers\.in, xyz\.triggers\.out, xyz\.triggers\.appear, xyz\.overrides;/
	)
	// No !important anywhere — precedence is by layer, not by force.
	assert.doesNotMatch(result.stdout, /!important/)
})

test('@layer order is independent of $xyz-modes source order (appear stays last)', () => {
	const result = compileSass('test/fixtures/xyz-layer-reorder.scss')

	assert.equal(result.status, 0, result.stderr)

	// Even with $xyz-modes flipped to [appear, out, in], `appear` is pinned last
	// among the trigger sublayers and `overrides` is last overall — so the
	// rendered cascade behaves identically regardless of mode source order.
	const declaration = result.stdout.match(/@layer ([^;]+);/)[1]
	const order = declaration.split(',').map((name) => name.trim())
	assert.ok(
		order.indexOf('xyz.triggers.appear') > order.indexOf('xyz.triggers.in'),
		`appear must be declared after in: ${declaration}`
	)
	assert.ok(
		order.indexOf('xyz.triggers.appear') > order.indexOf('xyz.triggers.out'),
		`appear must be declared after out: ${declaration}`
	)
	assert.equal(order[order.length - 1], 'xyz.overrides', `overrides must be last: ${declaration}`)
})

test('sibling-index() uses a real-property @supports test, not the always-true form', () => {
	const result = compileSass('build.scss')

	assert.equal(result.status, 0, result.stderr)

	// `@supports (--x: sibling-index())` is ALWAYS true — must feature-detect
	// against a property that actually consumes the function.
	assert.match(
		result.stdout,
		/@supports \(animation-delay: calc\(1s \* \(sibling-index\(\) - 1\)\)\)/
	)
	assert.doesNotMatch(result.stdout, /@supports \(--[\w-]+: sibling-index/)

	// The enhancement sets both index vars from sibling-index()/sibling-count().
	assert.match(result.stdout, /--xyz-index: calc\(sibling-index\(\) - 1\)/)
	assert.match(result.stdout, /--xyz-index-rev: calc\(sibling-count\(\) - sibling-index\(\)\)/)

	// index.modern is declared after index.ladder so it wins over the ladder's
	// higher-specificity nth-child rules by layer order.
	const declaration = result.stdout.match(/@layer ([^;]+);/)[1]
	const order = declaration.split(',').map((name) => name.trim())
	assert.ok(
		order.indexOf('xyz.index.modern') > order.indexOf('xyz.index.ladder'),
		`index.modern must be declared after index.ladder: ${declaration}`
	)
})

test('$xyz-index-levels: 0 skips the nth-child ladder but keeps sibling-index()', () => {
	const result = compileSass('test/fixtures/xyz-index-levels-zero.scss')

	assert.equal(result.status, 0, result.stderr)
	assert.doesNotMatch(result.stdout, /nth-child/)
	assert.match(result.stdout, /sibling-index\(\)/)
})
