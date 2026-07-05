'use strict'

const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const CORE_DIR = path.resolve(__dirname, '..', '..')
const REPO_ROOT = path.resolve(CORE_DIR, '..', '..')

// Prefer the package-local binary (present when sass is hoisted into this
// workspace); fall back to the repo-root node_modules (npm workspaces
// hoisting is the common case in this monorepo).
function resolveSassBin() {
  const candidates = [
    path.join(CORE_DIR, 'node_modules', '.bin', 'sass'),
    path.join(REPO_ROOT, 'node_modules', '.bin', 'sass'),
  ]
  const found = candidates.find((candidate) => fs.existsSync(candidate))
  if (!found) {
    throw new Error(
      `Could not locate the sass binary. Looked in:\n${candidates.join('\n')}\nRun "npm install" at the repo root.`
    )
  }
  return found
}

const SASS_BIN = resolveSassBin()

/**
 * Compile a Sass entry point with the core package as the load path root.
 * Returns { status, stdout, stderr } instead of throwing, so callers can
 * assert on failure cases (e.g. the known xyz-apply bug) as well as success.
 *
 * @param {string} entry - path to the .scss file, relative to packages/core
 * @param {object} [options]
 * @param {string} [options.style] - sass --style value (default: 'expanded')
 * @returns {{status: number, stdout: string, stderr: string}}
 */
function compileSass(entry, options = {}) {
  const { style = 'expanded' } = options
  const entryPath = path.isAbsolute(entry) ? entry : path.join(CORE_DIR, entry)

  const result = spawnSync(
    SASS_BIN,
    [`--load-path=${CORE_DIR}`, `--style=${style}`, entryPath],
    { cwd: CORE_DIR, encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 }
  )

  return {
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  }
}

module.exports = { compileSass, CORE_DIR }
