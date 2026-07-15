# Change Log

## 0.6.8

### Patch Changes

- babc063: Fix the wrapper animation-done hook so cancelled animations no longer hang the transition (work brief A4).

  - Correct the DOM event name from the nonexistent `animationcancelled` to `animationcancel` in the shared `getXyzAnimationHook`.
  - Add a safety-net timeout to the `duration: 'auto'` path: once animations are running, resolve `done()` no later than a worst-case bound computed from the elements' computed `animation-duration` + `animation-delay` (with a 100ms buffer), falling back to a generous 10s constant. This guarantees `done()` fires even when a cancelled animation (element hidden, `animation-name` overridden, `xyz-none` applied mid-flight) emits neither `animationend` nor `animationcancel` (Chromium historically never fired the latter).
  - Harden `getXyzDurationForMode` to coerce fully-numeric duration strings (e.g. `duration="500"` without `v-bind`) via `parseFloat` so they take the timeout path; `'auto'` and mode-object behavior unchanged.
  - Export a named, idempotent `clearXyzElement(el)` teardown that clears pending safety-net/animation timeouts, event listeners, and the `appearVisible` IntersectionObserver, for wrappers to call on unmount.

- 8db1f0c: Make the React wrapper survive callback refs and empty children (work brief A6).

  - Always hand `CSSTransition` the internal ref OBJECT and compose it with the child's own ref, handling both object and callback ref forms. A callback ref previously became the `nodeRef`, so `nodeRef.current` was `undefined` and the end listener threw `Cannot read properties of undefined (reading 'classList')` in the animation hook.
  - Stop injecting `xyz`/`className`/`style`/`ref` onto the empty-state placeholder `<Fragment/>` (Fragments accept only `key`/`children`). This removes the React warning and the null-element crash on `mode="out-in"` transitions to empty.
  - Guard the `addEndListener` hook against a missing element regardless: with no attached node there is nothing to wait on, so it resolves `done()` immediately instead of dereferencing a null/undefined element (defense in depth for both paths above).
  - Clear the `appearVisible` IntersectionObserver and pending animation timeouts on `onExited` and on unmount via the shared idempotent `clearXyzElement(el)`.
  - Replace the one-line `index.d.ts` stub with real typings for `XyzTransition`, `XyzTransitionGroup`, and the `xyz` helper (`xyz`, `duration`, `appearVisible`, lifecycle callbacks, and transition props), so consumers no longer get `any`.

- Updated dependencies [e6c0b0b]
- Updated dependencies [5a07981]
  - @animxyz/core@0.6.7

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.7](https://github.com/ingram-projects/animxyz/compare/v0.6.6...v0.6.7) (2022-07-22)

### Bug Fixes

- changed peer dependencies to allow a broader range of vue and react versions ([b480537](https://github.com/ingram-projects/animxyz/commit/b4805372797cf0bd0da353cd9bb4b23c27902d4a))

## [0.6.6](https://github.com/ingram-projects/animxyz/compare/v0.6.5...v0.6.6) (2022-01-12)

**Note:** Version bump only for package @animxyz/react

## [0.6.4](https://github.com/ingram-projects/animxyz/compare/v0.6.3...v0.6.4) (2021-06-30)

**Note:** Version bump only for package @animxyz/react

## [0.6.3](https://github.com/ingram-projects/animxyz/compare/v0.6.2...v0.6.3) (2021-06-30)

**Note:** Version bump only for package @animxyz/react

## [0.6.2](https://github.com/ingram-projects/animxyz/compare/v0.6.1...v0.6.2) (2021-06-29)

### Bug Fixes

- addressed issue with findDOMNode ([1776347](https://github.com/ingram-projects/animxyz/commit/1776347a4d2e7e8bca70743bfb2126268e439646))
- small improvement to react package ([917c25f](https://github.com/ingram-projects/animxyz/commit/917c25fea0e593d870af8b5a0f3499290f5a7ade))

## [0.6.1](https://github.com/ingram-projects/animxyz/compare/v0.6.0...v0.6.1) (2021-06-23)

### Bug Fixes

- fixed StrictMode findDOMNode error with react transition group ([862b643](https://github.com/ingram-projects/animxyz/commit/862b64350cd27e83f7a35f0118f063c955a33b42))

# [0.6.0](https://github.com/ingram-projects/animxyz/compare/v0.5.0...v0.6.0) (2021-06-22)

**Note:** Version bump only for package @animxyz/react

# [0.5.0](https://github.com/ingram-projects/animxyz/compare/v0.4.1...v0.5.0) (2021-02-16)

**Note:** Version bump only for package @animxyz/react

## [0.4.1](https://github.com/ingram-projects/animxyz/compare/v0.4.0...v0.4.1) (2021-02-09)

### Bug Fixes

- add types declaration file ([9838dc0](https://github.com/ingram-projects/animxyz/commit/9838dc04a15f74da351113588ea14cb65e3cda01))
- tweaked peer dependencies ([b5db20b](https://github.com/ingram-projects/animxyz/commit/b5db20bb59efdf2069c9bc152a638b8b0da289b9))

# [0.4.0](https://github.com/ingram-projects/animxyz/compare/v0.3.0...v0.4.0) (2021-01-17)

**Note:** Version bump only for package @animxyz/react

# [0.3.0](https://github.com/ingram-projects/animxyz/compare/v0.2.0...v0.3.0) (2020-12-31)

**Note:** Version bump only for package @animxyz/react

# [0.2.0](https://github.com/ingram-projects/animxyz/compare/v0.2.0-alpha.2...v0.2.0) (2020-12-30)

**Note:** Version bump only for package @animxyz/react

# [0.2.0-alpha.1](https://github.com/ingram-projects/animxyz/compare/v0.2.0-alpha.0...v0.2.0-alpha.1) (2020-12-30)

### Bug Fixes

- fixed issues with combined vue2/vue3 package by moving vue3 to new package ([1020121](https://github.com/ingram-projects/animxyz/commit/1020121f43145c9c4bb5d340824932d6fc29c6f2))

# [0.2.0-alpha.0](https://github.com/ingram-projects/animxyz/compare/v0.1.2...v0.2.0-alpha.0) (2020-12-29)

**Note:** Version bump only for package @animxyz/react

## [0.1.2](https://github.com/ingram-projects/animxyz/compare/v0.1.1...v0.1.2) (2020-12-29)

**Note:** Version bump only for package @animxyz/react
