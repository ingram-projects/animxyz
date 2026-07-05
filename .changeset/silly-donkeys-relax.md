---
"@animxyz/core": patch
---

Build hygiene cleanup (work brief A3, `fix/build-hygiene`):

- `build.scss` now uses `@use 'src/animxyz' as *;` instead of the deprecated
  `@import`, eliminating the Dart Sass deprecation warning on every compile.
- Removed the undocumented internal `--xyz-stagger-delay-calc`,
  `--xyz-total-delay-calc`, and `--xyz-delay-calc` shim custom properties
  from `xyz-animation()`. These existed only to work around a long-fixed
  upstream `postcss-calc` parsing bug
  (https://github.com/postcss/postcss-calc/issues/77); the `calc()`
  expressions are now written directly into `--xyz-stagger-delay`,
  `--xyz-total-delay`, and the `animation-delay` component of the
  `animation` shorthand. These were never public API, but if you referenced
  them directly (e.g. in a custom override), update to the public
  `--xyz-stagger-delay` / `--xyz-total-delay` variables instead.
- Dropped the `postcss-calc` step from `build:postcss` (no longer needed
  now that the shim variables are gone). `build:cssnano` now runs with a
  scoped config (`.postcss-cssnano/postcss.config.js`) that disables
  cssnano's bundled `calc` sub-plugin, which pins an old `postcss-calc`
  version that cannot parse the resulting nested `var()`-in-`calc()`
  expressions; everything else in cssnano's default minification preset is
  unaffected.
- Replaced the hand-rolled `xyz-str-split()` loop with `string.split()`
  (Dart Sass >= 1.57), keeping the same function name/signature for
  existing call sites. Bumped the `sass` devDependency to `^1.57.0` and
  documented this as the minimum Dart Sass version for consumers who `@use`
  `src/*.scss` directly (see `packages/core/README.md`).
- Deduplicated `$xyz-duration-levels`, `$xyz-delay-levels`, and
  `$xyz-stagger-levels`: all three are now derived from a shared
  `$xyz-time-levels` map, while remaining independently `!default`
  overridable (a consumer overriding just one of the three sees identical
  behavior to before).

No compiled CSS changes other than the `-calc` shim variable removal
(verified via the snapshot test).
