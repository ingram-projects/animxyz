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
  assert.match(result.stdout, /--xyz-stagger-delay-calc:/)
  assert.match(result.stdout, /--xyz-total-delay-calc:/)
  assert.match(result.stdout, /--xyz-stagger-delay: calc\(var\(--xyz-stagger-delay-calc\)\);/)
  assert.match(result.stdout, /transform-origin: var\(--xyz-in-origin,/)
  assert.match(result.stdout, /backface-visibility: visible;/)
  assert.match(result.stdout, /animation:\n?\s*var\(--xyz-in-duration,/)
  assert.match(result.stdout, /animation-name: xyz-in-keyframes, var\(--xyz-in-keyframes,/)
})

test('xyz-make-keyframes: emits per-mode @keyframes and utility selectors', () => {
  const result = compileSass('test/fixtures/xyz-make-keyframes.scss')

  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /@keyframes xyz-in-fade \{/)
  assert.match(result.stdout, /@keyframes xyz-out-fade \{/)
  assert.match(result.stdout, /@keyframes xyz-appear-fade \{/)
  assert.match(result.stdout, /\[xyz~=fade\], \[xyz~=in-fade\] \{/)
  assert.match(result.stdout, /--xyz-in-keyframes: xyz-in-fade;/)
})

// KNOWN BUG -- see test/fixtures/xyz-apply.scss and work brief
// A2 · fix/xyz-apply in modernization-plan.md.
//
// xyz-apply() calls xyz-utility($utility-name, $utility-level, $utility-mode)
// but xyz-utility's signature is xyz-utility($name, $mode, $level) --
// level/mode are swapped, so the mixin currently always errors. Once A2 fixes
// the argument order (and the substring-matching bugs described in the plan),
// flip this test to assert a SUCCESSFUL compile with the expected declarations
// instead of asserting the current @error.
test(
  'xyz-apply: KNOWN BUG -- currently errors due to swapped level/mode arguments (A2 will fix)',
  () => {
    const result = compileSass('test/fixtures/xyz-apply.scss')

    assert.notEqual(result.status, 0, 'expected xyz-apply to currently fail to compile')
    assert.match(result.stderr, /all is not a valid level for the fade utility\./)
  }
)
