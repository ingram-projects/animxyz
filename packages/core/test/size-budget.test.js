'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const gzipSize = require('gzip-size')

// Budget = measured gzip size of dist/animxyz.min.css at the time this test
// was written (12,004 bytes), +10% headroom, per work brief A1. If this
// starts failing because of an intentional size increase, measure the new
// gzip size and update BUDGET_BYTES with justification in the PR description
// (and re-derive: budget = new measured size * 1.1).
const BUDGET_BYTES = 13205

const MIN_CSS_PATH = path.join(__dirname, '..', 'dist', 'animxyz.min.css')

test('minified build stays under the gzip size budget', () => {
  assert.ok(
    fs.existsSync(MIN_CSS_PATH),
    `${MIN_CSS_PATH} not found. Run "npm run build -w @animxyz/core" (or "turbo run build") first ` +
      '-- the test task depends on the build task, so this should already exist under turbo/CI.'
  )

  const gzipped = gzipSize.fileSync(MIN_CSS_PATH)

  assert.ok(
    gzipped <= BUDGET_BYTES,
    `dist/animxyz.min.css gzipped is ${gzipped} bytes, exceeding the ${BUDGET_BYTES}-byte budget. ` +
      'If this growth is intentional, re-measure and update BUDGET_BYTES in ' +
      'test/size-budget.test.js with justification in the PR description.'
  )
})
