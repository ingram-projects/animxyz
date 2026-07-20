# AnimXYZ functional tests

Cross-framework browser tests that verify AnimXYZ features actually work — in
plain HTML/CSS, Vue 2, Vue 3, and React — against the **built package
artifacts** (`packages/*/dist`), the same files consumers get from npm. Their
job is to catch regressions from dependency updates (Vue, React,
react-transition-group, Sass, bundlers) and from changes to the packages
themselves.

## How it works

```
fixtures/          one small app per target
  html/            static page linking @animxyz/core's compiled CSS
  vue3/            Vue 3 app using @animxyz/vue3 (plugin, components, v-xyz)
  vue2/            Vue 2.7 app using @animxyz/vue ("vue" aliased to the vue2 npm alias)
  react/           React 18 app using @animxyz/react
scripts/
  build-fixtures.mjs   copies the html fixture + bundles the framework apps with Vite into dist/
  serve.mjs            dependency-free static server for dist/ used by Playwright's webServer
specs/
  core.spec.js     plain HTML/CSS feature assertions
  vue3.spec.js     Vue 3 wrapper assertions
  vue2.spec.js     Vue 2 wrapper assertions
  react.spec.js    React wrapper assertions
```

The suite runs headless in Chromium, Firefox, and WebKit via
[Playwright Test](https://playwright.dev/). Real rendering matters here: the
tests assert computed styles (animation names, staggered `animation-delay`,
`--xyz-*` custom properties) and real `animationend`-driven behavior
(transitions completing, elements being removed, `appearVisible`
IntersectionObserver pausing), none of which work in jsdom.

CI always runs all three browsers. Locally, Firefox and WebKit are included
only when they're installed — a Chromium-only checkout skips them with a
warning instead of failing.

## Running

```sh
# from the repo root — builds packages first, then runs every test suite
npx turbo run test

# just the functional tests (packages must already be built)
npm run test -w @animxyz/functional-tests

# one suite, one browser, headed, from tests/functional/
npx playwright test specs/react.spec.js --project=chromium --headed
```

First-time setup needs at least one browser: `npx playwright install chromium`
(add `firefox webkit` to match CI's full matrix).

## What's covered

- **Core** (`core.spec.js`): trigger mode classes (`xyz-in/out/appear`) attach
  keyframes; utilities set variables for every category (fade, translate,
  rotate/flip, scale, skew, timing, origin, perspective) including levels and
  mode-scoped forms; stagger and stagger-rev delays by nth-child; nested
  elements; variable scoping (`[xyz]` reset, `inherit`); `xyz-paused/none/absolute`
  toggles; animations run to completion; `prefers-reduced-motion`.
- **Vue 3 / Vue 2**: `<XyzTransition>` enter/leave/appear completing (the
  `done()` callback firing is the historical hang regression), transition
  classes, `duration` prop (number and `auto` with nested elements, Vue 3),
  `mode="out-in"` ordering (Vue 3), `<XyzTransitionGroup>` tag/class
  passthrough, `--xyz-index(-rev)` stagger variables, add/remove animations,
  and the `v-xyz` directive (composition with an existing `xyz` attribute +
  reactive updates).
- **React**: `<XyzTransition>` enter/exit completing and unmounting,
  `xyz`/`className`/`style` prop merging onto the child, `mode="out-in"`
  ordering, `<XyzTransitionGroup>` index variables and add/remove, and
  `appearVisible` (paused below the fold, animates on scroll into view).

## Adding a test

1. Add markup/behavior to the relevant fixture app (keep animations fast with
   an inline `--xyz-duration` so the suite stays quick; use `xyz-paused` when
   you only need computed styles).
2. Assert in the matching spec. For "the transition finished" assertions,
   prefer event logs (`window.log` / `window.animEvents`) over sleeping.
