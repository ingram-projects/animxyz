'use strict'

// Dedicated cssnano config for the build:cssnano step.
//
// Why a config file instead of `postcss --use cssnano`: in this monorepo,
// postcss-cli's `--use cssnano` resolves `cssnano` to an older copy hoisted at
// the repo root (pulled in transitively by the Vue/React *example* tooling),
// which is built against PostCSS 7 and crashes on modern CSS. Requiring cssnano
// from a config file inside this package pins the build to @animxyz/core's own
// cssnano 8 (packages/core/node_modules/cssnano). The default preset runs the
// full minification set, including calc() folding -- cssnano 8's bundled
// postcss-calc@10.x parses xyz-var()'s nested var() fallback chains that the
// old postcss-calc@7.x choked on.
module.exports = {
  plugins: [require('cssnano')({ preset: 'default' })],
}
