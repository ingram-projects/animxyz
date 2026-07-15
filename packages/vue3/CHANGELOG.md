# Change Log

## 0.6.8

### Patch Changes

- babc063: Fix the wrapper animation-done hook so cancelled animations no longer hang the transition (work brief A4).

  - Correct the DOM event name from the nonexistent `animationcancelled` to `animationcancel` in the shared `getXyzAnimationHook`.
  - Add a safety-net timeout to the `duration: 'auto'` path: once animations are running, resolve `done()` no later than a worst-case bound computed from the elements' computed `animation-duration` + `animation-delay` (with a 100ms buffer), falling back to a generous 10s constant. This guarantees `done()` fires even when a cancelled animation (element hidden, `animation-name` overridden, `xyz-none` applied mid-flight) emits neither `animationend` nor `animationcancel` (Chromium historically never fired the latter).
  - Harden `getXyzDurationForMode` to coerce fully-numeric duration strings (e.g. `duration="500"` without `v-bind`) via `parseFloat` so they take the timeout path; `'auto'` and mode-object behavior unchanged.
  - Export a named, idempotent `clearXyzElement(el)` teardown that clears pending safety-net/animation timeouts, event listeners, and the `appearVisible` IntersectionObserver, for wrappers to call on unmount.

- 7bd88e8: Fix three Vue wrapper bugs plus per-package hygiene (work brief A5).

  - **Vue 2 reverse-stagger off-by-N** (`XyzTransitionGroup`): `--xyz-index-rev` was computed from the unfiltered `children.length` while the forward index iterates the filtered `rawChildren`, so any text/whitespace, `v-if` comment placeholder, or unkeyed node skewed every reverse index. It now uses `rawChildren.length - index - 1`, matching the forward index and the Vue 3 implementation.
  - **Vue 3 listener clobbering** (`mergeData`): a consumer's `@enter`/`@leave`/`@appear` on `<XyzTransition>` previously replaced the internal animation hook (which owns `duration="auto"`, nested end-detection, and `appearVisible`), because the merge was a plain object spread. Same-named `on*` handlers are now composed — both run, and the internal hook keeps ownership of the `done` callback. The `style` merge now normalizes string/array `style` values before spreading, so a child with `style="color: red"` is no longer destroyed by spreading a string into character-indexed keys.
  - **Vue 3 undeclared internal dependency** (`XyzTransitionGroup`): dropped the import of `getTransitionRawChildren` from `@vue/runtime-core` (an undeclared dependency that resolved only via npm hoisting, and an undocumented internal export) in favor of a small vendored filter modeled on the Vue 2 package — it flattens single-level Fragments and drops Comment/Text/unkeyed nodes.
  - **Hygiene**: replaced the one-line `declare module` stubs in both packages with real `index.d.ts` typings (components, the `v-xyz` directive, the plugin default export, and `XyzTransitionProps`/`XyzTransitionGroupProps`), and added directive `unbind`/`unmounted` cleanup that calls the shared `clearXyzElement(el)` so `appearVisible` IntersectionObservers and pending timeouts don't outlive unmounted elements.

- Updated dependencies [e6c0b0b]
- Updated dependencies [5a07981]
  - @animxyz/core@0.6.7

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.7](https://github.com/ingram-projects/animxyz/compare/v0.6.6...v0.6.7) (2022-07-22)

### Bug Fixes

- changed peer dependencies to allow a broader range of vue and react versions ([b480537](https://github.com/ingram-projects/animxyz/commit/b4805372797cf0bd0da353cd9bb4b23c27902d4a))

## [0.6.6](https://github.com/ingram-projects/animxyz/compare/v0.6.5...v0.6.6) (2022-01-12)

**Note:** Version bump only for package @animxyz/vue3

## [0.6.5](https://github.com/ingram-projects/animxyz/compare/v0.6.4...v0.6.5) (2021-12-01)

### Bug Fixes

- fixed unmount with vue3 directive and ssr error in mergeData function ([93f58e9](https://github.com/ingram-projects/animxyz/commit/93f58e9aa540ba74611a66bf1c9dec2530c5dfdd))

## [0.6.4](https://github.com/ingram-projects/animxyz/compare/v0.6.3...v0.6.4) (2021-06-30)

**Note:** Version bump only for package @animxyz/vue3

## [0.6.3](https://github.com/ingram-projects/animxyz/compare/v0.6.2...v0.6.3) (2021-06-30)

**Note:** Version bump only for package @animxyz/vue3

## [0.6.2](https://github.com/ingram-projects/animxyz/compare/v0.6.1...v0.6.2) (2021-06-29)

**Note:** Version bump only for package @animxyz/vue3

## [0.6.1](https://github.com/ingram-projects/animxyz/compare/v0.6.0...v0.6.1) (2021-06-23)

### Bug Fixes

- fixed StrictMode findDOMNode error with react transition group ([862b643](https://github.com/ingram-projects/animxyz/commit/862b64350cd27e83f7a35f0118f063c955a33b42))

# [0.6.0](https://github.com/ingram-projects/animxyz/compare/v0.5.0...v0.6.0) (2021-06-22)

### Bug Fixes

- fixed an issue where vue3 wasn't adding the essential classes in latest version ([1a23a54](https://github.com/ingram-projects/animxyz/commit/1a23a54ae8e6edba183afc094552924ef1429921))

# [0.5.0](https://github.com/ingram-projects/animxyz/compare/v0.4.1...v0.5.0) (2021-02-16)

**Note:** Version bump only for package @animxyz/vue3

## [0.4.1](https://github.com/ingram-projects/animxyz/compare/v0.4.0...v0.4.1) (2021-02-09)

### Bug Fixes

- add types declaration file ([9838dc0](https://github.com/ingram-projects/animxyz/commit/9838dc04a15f74da351113588ea14cb65e3cda01))
- tweaked peer dependencies ([b5db20b](https://github.com/ingram-projects/animxyz/commit/b5db20bb59efdf2069c9bc152a638b8b0da289b9))

# [0.4.0](https://github.com/ingram-projects/animxyz/compare/v0.3.0...v0.4.0) (2021-01-17)

### Features

- added appear-visible prop to vue2 package ([5db7914](https://github.com/ingram-projects/animxyz/commit/5db791443036081f646230c3c989755d78785867))

# [0.3.0](https://github.com/ingram-projects/animxyz/compare/v0.2.0...v0.3.0) (2020-12-31)

**Note:** Version bump only for package @animxyz/vue3

# [0.2.0](https://github.com/ingram-projects/animxyz/compare/v0.2.0-alpha.2...v0.2.0) (2020-12-30)

**Note:** Version bump only for package @animxyz/vue3

# [0.2.0-alpha.2](https://github.com/ingram-projects/animxyz/compare/v0.2.0-alpha.1...v0.2.0-alpha.2) (2020-12-30)

**Note:** Version bump only for package @animxyz/vue3

# [0.2.0-alpha.1](https://github.com/ingram-projects/animxyz/compare/v0.2.0-alpha.0...v0.2.0-alpha.1) (2020-12-30)

### Bug Fixes

- fixed issues with combined vue2/vue3 package by moving vue3 to new package ([1020121](https://github.com/ingram-projects/animxyz/commit/1020121f43145c9c4bb5d340824932d6fc29c6f2))

# [0.2.0-alpha.0](https://github.com/ingram-projects/animxyz/compare/v0.1.2...v0.2.0-alpha.0) (2020-12-29)

### Features

- **vue:** added vue 3 support ([f0f1aa2](https://github.com/ingram-projects/animxyz/commit/f0f1aa27a85afd3b025ed6ce45f6e38974468e36))

## [0.1.2](https://github.com/ingram-projects/animxyz/compare/v0.1.1...v0.1.2) (2020-12-29)

**Note:** Version bump only for package @animxyz/vue3
