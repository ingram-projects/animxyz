# Change Log

## 0.6.7

### Patch Changes

- e6c0b0b: Fix the `xyz-apply` Sass mixin (work brief A2). It previously errored on every call because it passed level/mode to `xyz-utility` in the wrong order, and its substring-based token parser mis-read `thin`/`origin` as mode `in` and let `up` shadow `flip-up`. The token parser is now deterministic — mode is matched as an exact `in-`/`out-`/`appear-` prefix, and the utility name by exact match then longest `-`-boundary prefix — so `xyz-apply('fade up-100% in-rotate-right')` works. Unknown utilities/levels now raise a Sass `@error` listing the valid names/levels.
- 5a07981: Build hygiene cleanup (work brief A3, `fix/build-hygiene`):

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
    now that the shim variables are gone).
  - Upgraded the build's minifier from `cssnano` 5 to **cssnano 8** (latest
    stable) and bumped `postcss` to `^8.5.15` to satisfy its peer range.
    cssnano 8 bundles `postcss-calc@10`, which correctly parses the nested
    `var()`-fallback-in-`calc()` expressions produced by `xyz-var()` — the
    exact shape the removed `-calc` shim variables were avoiding — so calc
    folding runs with the full default preset. `build:cssnano` uses a scoped
    config (`.postcss-cssnano/postcss.config.js`) purely to pin resolution to
    this package's own cssnano (postcss-cli's `--use cssnano` otherwise picks
    up an older copy hoisted by the Vue/React example tooling).
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

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.6](https://github.com/ingram-projects/animxyz/compare/v0.6.5...v0.6.6) (2022-01-12)

**Note:** Version bump only for package @animxyz/core

## [0.6.4](https://github.com/ingram-projects/animxyz/compare/v0.6.3...v0.6.4) (2021-06-30)

**Note:** Version bump only for package @animxyz/core

## [0.6.3](https://github.com/ingram-projects/animxyz/compare/v0.6.2...v0.6.3) (2021-06-30)

**Note:** Version bump only for package @animxyz/core

## [0.6.2](https://github.com/ingram-projects/animxyz/compare/v0.6.1...v0.6.2) (2021-06-29)

### Bug Fixes

- make xyz utility classes !important ([03503f5](https://github.com/ingram-projects/animxyz/commit/03503f59c3b8f83730c3d91bd27bc4c3b1b0d691))

# [0.6.0](https://github.com/ingram-projects/animxyz/compare/v0.5.0...v0.6.0) (2021-06-22)

**Note:** Version bump only for package @animxyz/core

# [0.5.0](https://github.com/ingram-projects/animxyz/compare/v0.4.1...v0.5.0) (2021-02-16)

### Features

- added animation-direction utilities ([9597ffb](https://github.com/ingram-projects/animxyz/commit/9597ffba63fd59cbeee8911ed34a8a9f22c418f1))

# [0.4.0](https://github.com/ingram-projects/animxyz/compare/v0.3.0...v0.4.0) (2021-01-17)

### Bug Fixes

- temporary workaround for postcss-calc bug ([3bbf7e4](https://github.com/ingram-projects/animxyz/commit/3bbf7e45bc8d16bdfb5b7a957b1c5bfd9b7e4393))

# [0.3.0](https://github.com/ingram-projects/animxyz/compare/v0.2.0...v0.3.0) (2020-12-31)

### Code Refactoring

- modified percentage based utilities and some utility values ([92f2b33](https://github.com/ingram-projects/animxyz/commit/92f2b33912b5bdffc778427562164590ff11be15))

### BREAKING CHANGES

- Utilities with percentage levels (i.e. big-100, left-25) must now be written with a percentage sign.
  big-100 -> big-100%
  left-25 -> left-25%
  rotate-50 -> rotate-50%

## [0.1.2](https://github.com/ingram-projects/animxyz/compare/v0.1.1...v0.1.2) (2020-12-29)

**Note:** Version bump only for package @animxyz/core
