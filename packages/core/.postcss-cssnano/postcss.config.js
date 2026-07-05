'use strict'

// cssnano config for the build:cssnano step.
//
// The `calc` sub-plugin is disabled here. cssnano-preset-default bundles its
// own (old, transitively-pinned) copy of postcss-calc, which cannot parse a
// calc() expression whose operands are var() calls with deeply nested
// parenthesized fallback chains -- exactly the shape xyz-var()'s cascading
// fallbacks produce (see src/_functions.scss, xyz-animation()). It throws a
// hard parse error rather than warning and passing the value through.
//
// Previously, this was worked around by writing the calc() expression into
// an intermediate `--xyz-*-calc` custom property first (a bare declaration,
// never itself wrapped in calc()) and only calling calc() on a single-token
// var() reference to it (`calc(var(--xyz-total-delay-calc))`), which kept
// the raw expression out of any calc() a postcss-calc pass would try to
// parse. Those shim variables were removed as dead 2020-era scaffolding
// (A3 / fix/build-hygiene) once the standalone `postcss-calc` package (which
// ran earlier in the pipeline and mostly just warned-and-skipped instead of
// throwing) was also dropped -- but cssnano's own bundled calc plugin still
// hits the same parser limitation on the now-inlined expressions. Disabling
// just this one sub-plugin avoids the crash; the minification cost is only
// the loss of calc() numeric folding (e.g. `calc(1 + 0.25)` -> `1.25`) for
// the handful of literal-only calc() expressions elsewhere in the sheet --
// everything else in the default preset (whitespace, comments, selector/
// value minification, etc.) is unaffected.
module.exports = {
  plugins: [
    require('cssnano')({ preset: ['default', { calc: false }] }),
  ],
}
