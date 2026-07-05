# AnimXYZ Modernization Plan

Companion to `animxyz-scss-analysis.html` (full analysis of `packages/core/src`).
This plan turns the Issues Found and Modernization sections into eight independent
work briefs, each intended for one subagent in its own git worktree.

## Decisions record (maintainer-approved)

| Decision | Choice |
|---|---|
| Release posture | **Two tracks**: Track A = safe fixes → 0.x patch/minor; Track B = breaking modernization → v1.0 |
| `xyz-apply` | **Fix + document** (arg order, token parsing, tests, docs entry) |
| `_fancy.scss` | **Leave orphaned for now** — no task, do not delete, do not wire in |
| `xyz` attribute | **Clean break to `data-xyz` at v1.0** — no dual-selector emission |
| `@property` | **Adopt fully** in v1.0 (browser floor: Baseline July 2024 — Chrome 85+/Safari 16.4+/Firefox 128+) |
| Stagger indexing | **Progressive enhancement**: keep nth-child ladder as fallback, add `sibling-index()` where supported |
| Cascade layers | **Full `@layer` structure**; remove `!important` and mode source-order dependence |
| `@starting-style` mode, scroll-driven utilities | **Backlog** — out of scope for this effort |
| v1.0 scope | **Core + Vue/Vue3/React wrappers + docs site** |
| Testing | **Compile + snapshot tests + GitHub Actions** (no browser visual tests) |
| Branching | Track A worktrees branch from `master`, PR → `master`. Create long-lived `v1` branch from `master`; Track B worktrees branch from `v1`, PR → `v1`. `v1` → `master` when v1.0 ships |

## Baseline branch & toolchain (updated for the Astro refactor)

**All briefs base off the docs Astro refactor** (PR #123, branch `astro-refactor`),
which is merging to `master` imminently. Base every worktree on `master` **once #123
has merged**; if you must start before then, branch from `origin/astro-refactor`
instead. That refactor does not touch `packages/core/**` at all (verified: the only
package change is a `vue` devDep bump in `packages/vue3`), so every SCSS brief below
applies verbatim — but it replaces the repo tooling and moves the docs site, which
changes shared mechanics for all briefs:

- **Package manager: Yarn → npm.** npm workspaces (`packages/*`, `examples/*`, `site`),
  `package-lock.json`, `.npmrc`, `packageManager: npm@11.8.0`. `yarn.lock` and
  `lerna.json` are gone. Use `npm` everywhere the briefs say "yarn".
- **Task runner: Lerna → Turborepo.** Root scripts are `turbo run build|dev|lint|test`.
  `turbo.json` defines a `test` task (`dependsOn: ["^build"]`). A package participates
  by defining its own `test`/`lint` scripts; turbo discovers them.
- **Versioning/release: Lerna → Changesets.** `@changesets/cli`, `.changeset/config.json`,
  scripts `changeset` / `version-packages` (`changeset version`) / `release`
  (`turbo run build && changeset publish`). **Every brief must add a changeset**
  (`npx changeset`) describing its version bump — that is now how versions move.
  Track A entries are `patch`/`minor`; Track B (v1.0) entries are `major`.
  `@animxyz/site` is in the changeset `ignore` list (unpublished).
- **Docs site: `docs/` (Gridsome) → `site/` (Astro + Vue 3 islands).** `docs/` is
  fully removed. Doc prose is now markdown in `site/src/content/sections/*.md`
  (27 section files); interactive demos are Vue 3 SFCs in `site/src/components/vue/`;
  the site consumes `@animxyz/core` and `@animxyz/vue3` via workspace `*`. Any brief
  that touched `docs/` now targets `site/`.
- **commitlint still enforced** (root `commit-msg` + `lint-staged`, now also linting
  `.astro`). Conventional-commit rule stands.

**Base branch:** `master`. (`.changeset/config.json` `baseBranch` was corrected to
`master`, matching the repo default, so `changeset status`/`version` detect changed
packages correctly. All briefs base off `master` post-#123.)

## Sequencing

```
A1 (test infra)  ──►  A2 (xyz-apply)      ──►  merge to master
              └──►  A3 (build hygiene)   ──►  merge to master
A4 (animationcancel fix, independent)    ──►  merge to master
A5 (vue wrapper fixes, independent)      ──►  merge to master
A6 (react wrapper fixes, independent)    ──►  merge to master
                                              │
master (with A1–A3) ──► create/rebase v1 ─────┘
   v1 ──► B1 (data-xyz, core+wrappers+docs)   [independent]
   v1 ──► B2 (@property)                      [independent]
   v1 ──► B3 (@layer)  ──►  B4 (sibling-index + cleanup)   [B4 needs B3 merged]
   B1+B2+B3+B4 merged ──► B5 (docs site + migration guide + release prep)
```

A1 must merge first — every other brief's acceptance criteria reference its test
harness. B1/B2/B3 are mutually independent and can run in parallel; expect small
snapshot-fixture merge conflicts when they land (resolution: regenerate the snapshot,
review the diff).

## Agent model & effort assignments

Driver: how much of the work is subtle, correctness-critical reasoning (Opus) vs.
well-specified scaffolding or mechanical sweeps (Sonnet). Everything in Track A/B
below ships in published packages, so correctness-dense briefs get Opus.

| Brief | Model | Effort | Rationale |
|---|---|---|---|
| A1 · test-infra | Sonnet | high | Net-new harness/CI/snapshot, but the design is spelled out; judgment on normalization/thresholds, not deep reasoning. |
| A2 · xyz-apply | Opus | high | Parser rewrite whose original bugs are substring collisions (`thin`/`origin`, `up`/`flip-up`); easy to pass the happy path and reintroduce them. |
| A3 · build-hygiene | Sonnet | high | Mostly mechanical; the one trap is preserving `!default` overridability during the time-map dedup. |
| A4 · animation-cancel | Opus | high | Async lifecycle + browser-quirk reasoning (cancel event never fired, worst-case timeout bound, numeric-string coercion); a wrong fallback reintroduces the hang. |
| A5 · vue-wrappers | Opus | high | Three framework-internals bugs across Vue 2/3 merge semantics; easy to "fix" listener composition by clobbering the internal hook again. |
| A6 · react-wrapper | Opus | high | Ref composition (object + callback) and Fragment edge case, repro-first; genuine React reasoning. |
| B1 · data-xyz | Sonnet | high | ~370-occurrence sweep is breadth not depth; the one hard part (dynamic sandbox attribute generation) is well-scoped in the brief. |
| B2 · @property | Opus | xhigh | Densest reasoning in the plan: per-var `syntax`, `initial-value` independence, `inherits: true` invariant, level tables that must not fail to parse. Most silent failure modes → most headroom. |
| B3 · @layer | Opus | high | Cascade architecture; remove `!important` without regressing reduced-motion precedence. Systemic reasoning across the whole output. |
| B4 · sibling-index | Opus | high | `@supports` always-true trap + specificity/precedence trap dependent on B3's layers; small surface, every step is a trap. |
| B5 · docs-release | Sonnet | medium | Editorial review + Changesets orchestration; low reasoning depth (bump to high only for the browser-support matrix). |

Shared rules for every brief:
- Branch names as given; worktree per branch; conventional commits (repo uses commitlint).
- Add a changeset (`npx changeset`) in every PR: Track A = `patch`/`minor`,
  Track B = `major`.
- "Snapshot diff reviewed" means: regenerate the CSS snapshot, and the PR description
  must summarize what changed in the output and why every change is intended.
- Never edit `dist/` by hand; it is build output.
- The repo is an **npm-workspaces + Turborepo** monorepo (post-#123). Install at the
  root with `npm install`; run a package's scripts from its dir or via
  `npm run <script> -w <workspace>` / `turbo run <task>`.

---

## Track A — fixes on 0.x

### A1 · `fix/test-infra` — compile + snapshot tests, CI

**Agent:** Sonnet / high effort.

**Goal:** a safety net that catches compile errors, output regressions, and size creep.

**Build:**
1. `packages/core/test/` with a Node test runner (plain `node:test` is fine — avoid
   adding heavy frameworks):
   - **Compile test**: `sass build.scss` compiles without errors or deprecation warnings
     (fail on `DEPRECATION`, which currently fires — A3 fixes it; land A1 with the
     deprecation check marked `todo`/allowed-fail until A3 merges, then flip it).
   - **Mixin API tests**: small fixture `.scss` files that `@use` the source and invoke
     `xyz-utility`, `xyz-var`, `xyz-set-all`, `xyz-animation`, `xyz-make-keyframes` —
     assert they compile and spot-check emitted declarations with string matching.
     Include a fixture for `xyz-apply` asserting the CURRENT failure ("all is not a
     valid level"), marked as a known-bug test for A2 to flip to a success assertion.
   - **Snapshot test**: compile `build.scss` (expanded), normalize (strip comments,
     collapse whitespace), commit as `test/__snapshots__/animxyz.css`. Test recompiles
     and diffs; nonzero diff fails with instructions to regenerate via a
     `test:update-snapshot` npm script.
   - **Size budget**: gzipped size of minified build must stay under a threshold
     (current: ~13.2 KB gzip for expanded; measure the actual min.css gzip and set
     budget = measured + 10%).
2. Wire it into the toolchain: add a `test` script to `packages/core/package.json`
   (turbo's `test` task already `dependsOn: ["^build"]`, so the snapshot compiles
   against fresh output). `turbo run test` from the root must run it.
3. `.github/workflows/ci.yml` (net-new — no workflow exists yet, even on
   `astro-refactor`): `npm ci`, then `turbo run lint test` on push/PR to `master`
   and `v1`. Node 20+, `actions/setup-node` with `cache: npm`. No publishing (release
   is a separate changeset flow).

**Toolchain note:** base off post-#123 `master` (npm + Turborepo). Use `npm`, not
`yarn`, throughout. Add a `patch` changeset (test infra is not user-facing but keeps
the changeset habit consistent, or use `npx changeset --empty`).

**Acceptance:** `turbo run test` (and `npm test -w @animxyz/core`) green locally and
in Actions; snapshot committed; README note in `packages/core` on running/updating
tests.

---

### A2 · `fix/xyz-apply` — repair and document the broken mixin

**Agent:** Opus / high effort.

**Goal:** `xyz-apply('fade up-100% in-rotate-right')` works.

**The bugs** (all in `packages/core/src/_functions.scss`, mixin at line 137):
1. Line 169 calls `xyz-utility($utility-name, $utility-level, $utility-mode)` but the
   signature (line 76) is `xyz-utility($name, $mode, $level)` — level and mode are
   swapped, so every invocation errors.
2. Mode detection uses `string.index($utility, $mode)` substring matching: `thin` and
   `origin` both contain `in` and would be mis-assigned mode `in` once bug 1 is fixed.
3. Utility-name detection loops all map keys keeping the LAST substring match — only
   correct today by accident of map ordering (`up` appears before `flip-up`).

**Fix approach:** rewrite the token parser deterministically. For each
space-separated token: (a) check for an exact mode prefix `in-`/`out-`/`appear-` and
strip it; (b) match the remainder against utility names by exact match first, then
longest-prefix match where the next char is `-`; (c) the rest after `name-` is the
level, else `'default'`. Keep `@error` messages listing valid names/levels. Use
`string.split` only if A3 (which bumps the sass floor) has merged — otherwise keep
`xyz-str-split`.

**Also:** flip A1's known-bug fixture to positive assertions covering: bare utility,
leveled, mode-prefixed, mode+level, `thin`/`origin` (regression for bug 2),
`flip-up` vs `up` (regression for bug 3), and an invalid token asserting the `@error`.
Add a short "Using with Sass" docs section for `xyz-apply` as a new markdown file in
`site/src/content/sections/` (Astro content collection — model it on the existing
`utilities.md`/`variables.md`, and register it in whatever section index/ordering the
site uses) with a copy-paste example.

**Acceptance:** all new tests green; snapshot unchanged (this mixin emits nothing
unless called); docs entry renders.

---

### A3 · `fix/build-hygiene` — module entry, dead workarounds, data dedup

**Agent:** Sonnet / high effort.

**Goal:** remove the 2020-era build scaffolding that has no runtime effect.

1. **`packages/core/build.scss`**: `@import 'src/animxyz';` → `@use 'src/animxyz' as *;`.
   Kills the deprecation warning; flip A1's deprecation check to enforcing.
2. **Drop postcss-calc** from `build:postcss` in `packages/core/package.json` and
   remove the `--xyz-*-calc` shim variables in `_functions.scss` (lines ~190–205,
   `TODO` comments reference postcss-calc bug #77, fixed upstream years ago). Write
   the `calc()` expressions directly into `--xyz-stagger-delay`, `--xyz-total-delay`,
   and `animation-delay`. These shim names are undocumented internals — removing them
   is patch-safe, but call it out in the changelog.
3. **`xyz-str-split` → `string.split()`** (Dart Sass ≥ 1.57). Bump the `sass`
   devDependency and note the floor in `packages/core/README.md` for source consumers.
4. **Dedup the time maps**: introduce `$xyz-time-levels` and derive
   `$xyz-duration-levels`/`$xyz-delay-levels`/`$xyz-stagger-levels` from it while
   keeping all three public names and `!default` overridability (users who override
   one of the three today must see identical behavior — add a mixin-API test proving
   an override of `$xyz-delay-levels` still works).
5. Keep `xyz-include-once` (harmless, still guards double-inclusion via multiple
   `@use ... with` entry points).

**Out of scope here:** `backface-visibility`, perspective hack, `[xyz]` reset — those
move with the v1.0 briefs.

**Acceptance:** zero sass warnings; snapshot diff shows ONLY the `-calc` variable
removal; size budget still green; time-map override test green.

---

### A4 · `fix/animation-cancel` — wrapper hook listens for a nonexistent event

**Agent:** Opus / high effort.

**Goal:** the framework wrappers' animation-done hook survives cancelled animations.
(Found by external review; verified. JS bug, not SCSS — independent of A1–A3.)

**The bug** (`utils/getXyzAnimationHook.js`, shared by the Vue/Vue3/React packages):
lines 12 and 77 use the event name `animationcancelled`. The DOM event is
`animationcancel` — the listener has never fired in any browser.

**Impact:** completion normally arrives via `animationend`, but a cancelled
animation (element hidden, `animation-name` overridden, `xyz-none` applied
mid-flight) never fires `animationend`. The numeric-duration path recovers via its
`setTimeout`, but the default `'auto'` path has NO timeout fallback — `done()` is
never called and the wrapper transition hangs (Vue `<XyzTransition>` stuck in its
transition state, React equivalent likewise).

**Fix:**
1. Rename both usages to `animationcancel`.
1b. While in this file's orbit: harden `utils/getXyzDurationForMode.js` to coerce
   numeric strings — `duration="500"` in a Vue template (no `v-bind`) is a string
   and silently takes the event path instead of a 500 ms timeout. Coerce with
   `parseFloat` when the string is fully numeric; keep `'auto'` and mode-object
   behavior unchanged.
2. Do NOT rely on the event alone: Chromium did not fire `animationcancel` at all
   for many years. Add a safety-net timeout to the `'auto'` path — e.g. compute a
   worst-case bound from the elements' computed `animation-duration` +
   `animation-delay` once animations are running, falling back to a generous
   constant — so `done()` always eventually fires even where cancel events are
   missing.
3. Verify manually in `examples/vue` (or vue3): toggle an `<XyzTransition>` and
   force-cancel mid-animation (set `display:none` or add `xyz-none` via devtools);
   confirm the transition completes instead of hanging. Note the verification in
   the PR.

**Acceptance:** both event names corrected; auto-path timeout in place; numeric-string
durations take the timeout path; manual cancel scenario verified in at least one
wrapper example; no change to compiled CSS (snapshot untouched).

---

### A5 · `fix/vue-wrappers` — Vue 2/3 wrapper bugs

**Agent:** Opus / high effort.

**Goal:** fix three verified bugs in the Vue packages plus per-package hygiene.
All patch-safe. Independent of A1–A4 (no SCSS, no shared-utils overlap with A4).

1. **Vue 2 reverse-stagger off-by-N** (`packages/vue/src/components/XyzTransitionGroup.js:31`):
   `--xyz-index-rev` is computed from the UNFILTERED `children.length` while the
   forward index iterates the filtered `rawChildren`. Any filtered node (text/
   whitespace, `v-if` comment placeholder, unkeyed node) skews every reverse index.
   Fix: `rawChildren.length - index - 1` (matching the Vue 3 implementation).
2. **Vue 3 listener clobbering** (`packages/vue3/src/utils.js:29–39, 68`):
   `mergeData` is a plain object spread, so a user's `@enter`/`@leave`/`@appear`
   on `<XyzTransition>` REPLACES the internal animation hook (which owns
   `duration="auto"`, nested end-detection, and `appearVisible`). Vue 2 composes
   handlers via `vue-functional-data-merge`. Fix: compose same-named `on*`
   handlers in `mergeData` (call both; the internal hook owns the `done`
   callback). Also fix the style merge to normalize string/array `style` values
   before spreading (a child with `style="color: red"` currently gets its style
   destroyed by `{...'color: red'}`).
3. **Vue 3 undeclared internal dependency**
   (`packages/vue3/src/components/XyzTransitionGroup.js:2`): imports
   `getTransitionRawChildren` from `@vue/runtime-core`, which is (a) not in
   `dependencies` — it resolves today only because npm hoists Vue's transitive
   copy, and breaks for any consumer whose layout doesn't hoist it — and (b) an
   undocumented internal export Vue can move without notice. Fix: vendor a small
   local filter (the Vue 2 package already has one to model) and drop the import.
4. **Hygiene:** real `index.d.ts` typings for both packages (both are currently
   one-line `declare module` stubs — every consumer gets `any`); add
   `unbind`/`unmounted` cleanup calling the hook's clear routine so
   `appearVisible` IntersectionObservers and pending timeouts don't outlive
   unmounted elements (coordinate the small export needed from
   `utils/getXyzAnimationHook.js` with A4 — rebase whichever lands second).

**Verification:** in `examples/vue` and `examples/vue3`: a keyed list containing a
`v-if` placeholder shows correct `stagger-rev` ordering; a `<XyzTransition @enter>`
user handler fires AND `duration="auto"` still completes. The Vue 3 fixes are also
exercised by the docs site (`site/` consumes `@animxyz/vue3`) — sanity-check
`npm run dev -w @animxyz/site` renders transitions without console errors. Note
results in the PR.

**Acceptance:** fixes in both packages; typings compile against the examples'
usage; no compiled-CSS change.

---

### A6 · `fix/react-wrapper` — ref handling and the empty-state path

**Agent:** Opus / high effort.

**Goal:** the React wrapper survives callback refs and empty children.

1. **Callback refs crash the end listener**
   (`packages/react/src/components/XyzTransitionBase.js:20`, `utils.js:33`):
   `child.ref || fallbackRef` assumes an object ref. A callback ref makes
   `nodeRef` a function: `CSSTransition` receives an invalid `nodeRef` and
   `addEndListener` invokes the animation hook with `nodeRef.current === undefined`,
   which throws in `clearXyzElementProperties`. Fix: always pass the internal ref
   object to `CSSTransition`, and compose it with the child's ref (handle object
   AND callback forms) when cloning.
2. **Empty-state `Fragment` path** (`XyzTransition.js:14` + `XyzTransitionBase.js:29`):
   with no child, `<Fragment/>` flows into `cloneElement(child, { xyz, className,
   style, ref })` — Fragments accept only key/children, so React warns, the ref
   never attaches, and the end listener fires the hook with a null element (same
   TypeError as #1). FIRST STEP: build a repro (toggle `<XyzTransition>` to empty
   under `mode="out-in"`) to confirm severity, then fix — likely by rendering a
   real empty element (or guarding the hook against a missing node AND skipping
   prop injection for Fragments). Guard `animationHook` against null element
   regardless (defense in depth; also covers #1).
3. **Hygiene:** real `index.d.ts` typings (currently a one-line stub); clear
   observer/timeout on `onExited`/unmount (coordinate with A4/A5 as above).

**Verification:** repro from #2 recorded in the PR (before/after); a child with a
callback ref transitions without throwing; `examples/react` runs clean with no
console warnings from the wrapper.

**Acceptance:** no crashes or React warnings across the ref/empty scenarios;
typings compile; no compiled-CSS change.

---

## Track B — v1.0 modernization (branch from `v1`, PR → `v1`)

Setup (whoever starts first): `git branch v1 master && git push -u origin v1`
after A1–A3 have merged to master.

### B1 · `v1/data-xyz` — attribute rename, core + wrappers + docs

**Agent:** Sonnet / high effort. (Consider handing the dynamic sandbox-attribute
tracing in step 4 to Opus if run as a sub-task.)

**Goal:** the configuration attribute becomes standards-conforming `data-xyz`.
Clean break — v1.0 CSS matches `[data-xyz~='…']` only. Selector count stays ~1,441.

1. **Core:** add `$xyz-attribute: 'data-xyz' !default;` in `_variables.scss` and use it
   everywhere selectors/attributes are generated: `xyz-make-utilities` and
   `xyz-make-keyframes` (`_functions.scss:98–135`), and the `[xyz]` reset +
   `[xyz~='inherit']` blocks (`_core.scss:158–165`). The var is the escape hatch for
   users who want to build with the legacy attribute.
2. **Vue + Vue3** (`packages/vue{,3}/src/directives/xyz.js`): `setAttribute('data-xyz', …)`
   and `getAttribute('data-xyz')`. The directive stays `v-xyz`. Check
   `packages/vue{,3}/src/components/` and the shared root `utils/` for any other
   attribute reads/writes.
3. **React** (`packages/react/src/components/`): the `xyz` prop currently passes
   through as a bare attribute; map prop `xyz` → rendered `data-xyz` attribute.
   Keep the `xyz` prop name (it's ergonomic and now legal since it renders data-*).
   Update `index.d.ts` typings in all three wrapper packages if they reference the
   attribute.
4. **Docs site (`site/`) + examples:** migrate every `xyz="…"` usage. Post-#123
   counts (verified on `astro-refactor`): **~321 occurrences in `site/`** — 247 in
   `site/src/content/sections/*.md`, 83 in `*.vue`, 18 in `*.astro` — plus **47 in
   `examples/`**. This is NOT a blind find/replace:
   - Some `xyz="…"` are live demo attributes; others are attribute strings inside
     displayed code samples (both should read `data-xyz` for a consistent v1 story,
     but confirm you're not breaking a code sample that's deliberately showing legacy).
   - **Interactive sandbox** components build the attribute string dynamically —
     `site/src/components/vue/reusable/Sandbox.vue`, `XyzModifiersInput.vue`,
     `XyzModifiersPresets.vue` (and the `v-xyz` directive usages like
     `v-xyz="data.utilities"`). These need code changes to emit `data-xyz`, not text
     swaps. The `v-xyz` directive NAME stays; what it writes is fixed in core/wrapper
     (steps 1–3). Trace the sandbox's generated-markup path end to end.
   - **Site's own SCSS hooks the attribute:** `site/src/styles/core/_animations.scss`
     lines ~22 (`[xyz] {`) and ~51 (`[xyz='']:hover::after`) must become `[data-xyz…]`.
     (Note: a `[xyzUtility]` match in `BannerSquare.vue` is JS array destructuring —
     not an attribute selector, leave it.)
5. **Migration guide:** `MIGRATION-v1.md` at repo root — find/replace guidance
   (`xyz="` → `data-xyz="`), wrapper behavior notes, and the `$xyz-attribute`
   escape hatch for Sass users.

**Gotchas:**
- A5/A6 edit the same wrapper files (directives, XyzTransitionBase) — make sure `v1`
  has been rebased on master with A5/A6 merged before starting, or coordinate.
- The docs render via `@animxyz/vue3` (Astro Vue islands), so the site is a live
  integration test for the attribute change — build it and click through, don't just
  grep-and-commit.

**Acceptance:** core snapshot regenerated (every selector renamed — diff should be
mechanical and complete: zero remaining `[xyz` selectors in the compiled CSS);
`site/` builds (`npm run build -w @animxyz/site`) and demos animate; wrapper
examples in `examples/` run against the rebuilt core CSS; tests green.

---

### B2 · `v1/property-registration` — typed dials via `@property`

**Agent:** Opus / xhigh effort (most invariants to hold simultaneously; most silent
failure modes).

**Goal:** register the dial variables for type safety and individually
transitionable custom properties. Browser floor becomes Baseline July 2024
(document in README).

**Constraints discovered during analysis — read carefully:**
- `inherits: true` on EVERY registered property. Nested composition
  (`.xyz-nested` reading a parent's dials) and the stagger relay depend on
  inheritance. `inherits: false` silently breaks the library.
- `@property initial-value` must be computationally independent — it CANNOT be
  `var(--xyz-…-default)`. Therefore the `--xyz-*-default` theming variables and
  their `:root` block STAY (they are tiers 3–4 of the fallback chain and the
  documented theming API). Register the per-element dial vars
  (`--xyz-translate-x`, `--xyz-in-opacity`, …) with type + identity initial-value;
  since an unset registered property now resolves to its typed initial value, audit
  whether the identity fallbacks written inside the keyframes/`xyz-var()` chains can
  be simplified — but keep `xyz-var()`'s default-var tiers intact.
- Composite/freeform vars (`--xyz-keyframes`, `--xyz-transform`, and anything whose
  value is itself a var() composition) get `syntax: "*"` or stay unregistered —
  `"*"` cannot have an initial-value requirement issue but also gets no typing;
  prefer unregistered where registration buys nothing.
- Suggested types: `<time>` (duration/delay/stagger), `<number>` (opacity, scale,
  iterate is tricky — `infinite` is a keyword, use `"*"`), `<length-percentage>`
  (translate x/y), `<length>` (translate-z, perspective), `<angle>` (rotate, skew).
  Note translate/rotate levels include `%`/`turn` values — verify each level table
  against the chosen syntax; a registered property whose set value fails to parse
  behaves like unset (that's the type safety, but it must not reject legit levels).
- Kill the `--xyz-perspective-none` `@supports` hack (`_core.scss:42–46`):
  `perspective(none)` is universally supported at this browser floor; use it
  directly as the identity value.
- Generate registrations from `$xyz-variables-map` (add a `syntax` key per entry)
  rather than hand-writing ~96 `@property` blocks.

**Acceptance:** snapshot diff = added `@property` blocks + removed perspective hack
(and any agreed fallback simplifications); a new fixture test setting a garbage value
(e.g. `--xyz-duration: red`) documents the typed-reject behavior; size budget
adjusted if needed (registrations add bytes — measure and update with justification).

---

### B3 · `v1/cascade-layers` — `@layer` architecture

**Agent:** Opus / high effort.

**Goal:** cascade correctness by declaration, not source order or `!important`.

1. Layer plan (single top-level `xyz` layer with sublayers, declared up front):
   `@layer xyz.defaults, xyz.index, xyz.utilities, xyz.triggers.in,
   xyz.triggers.out, xyz.triggers.appear, xyz.overrides;`
2. Map existing output: `:root` defaults + `@property` → `defaults`; nth-child
   ladder → `index`; `[data-xyz~=…]` selectors → `utilities`; mode trigger classes →
   `triggers.<mode>` (the sublayer ORDER now guarantees appear beats in/out — remove
   the "Appear must come last" comment/constraint in `$xyz-modes`,
   `_variables.scss:6`); paused/none/absolute/reduced-motion → `overrides`, DROPPING
   their `!important`s (`_core.scss:130–142`).
3. Wrap emission via the existing mixins so Sass users including `xyz-core` /
   `xyz-utilities` get the same layers. Provide `$xyz-layer: 'xyz' !default`
   (empty string = emit unlayered, the escape hatch).
4. Document the new override contract in README: user CSS (unlayered) now beats
   AnimXYZ by default; to lose to AnimXYZ deliberately, put styles in a layer
   declared before `xyz`.

**Gotchas:** `@keyframes` and `@property` at-rules are fine inside layers but
name-collision semantics don't change — keep them in `defaults`. Verify
`prefers-reduced-motion` override still wins against utilities/triggers from its
layer position (it currently relies on being late + same specificity).

**Acceptance:** compiled CSS contains zero `!important`; reorder test — a fixture
that flips `$xyz-modes` order compiles to identical behavior (snapshot proves layer
order, not source order, decides); docs updated; snapshot diff reviewed.

---

### B4 · `v1/sibling-index` — uncapped stagger + leftovers *(after B3 merges)*

**Agent:** Opus / high effort.

**Goal:** `sibling-index()` where supported; ladder fallback elsewhere; misc cleanup.

1. **Feature-detect correctly:** `@supports (--x: sibling-index())` is ALWAYS true —
   custom property declarations accept any value. Test against a real property
   instead: `@supports (animation-delay: calc(1s * (sibling-index() - 1)))`.
2. Inside the `@supports`, set `--xyz-index: calc(sibling-index() - 1)` and
   `--xyz-index-rev: calc(sibling-count() - sibling-index())` on the same targets
   that use `%xyz-indexed` (`_core.scss:54–63`). **Precedence trap:** the nth-child
   ladder rules have higher specificity than a bare class selector — place the
   enhancement in a later sublayer (e.g. `xyz.index.modern` after `xyz.index.ladder`;
   requires B3's layer scaffolding) so it wins regardless of specificity.
3. Keep `$xyz-index-levels: 20` ladder as fallback; add a `$xyz-index-levels: 0`
   option that skips ladder emission entirely for Chromium-only consumers.
4. **Leftover cleanups:** remove `backface-visibility: visible`
   (`_functions.scss:197` — it sets the initial value; breaking only for users who
   relied on the library re-forcing it, hence v1 not 0.x); dedup the per-axis
   boilerplate in `$xyz-variables-map`/`$xyz-utilities-map` with a small generator
   loop (pure refactor, snapshot must be byte-identical for that commit).

**Acceptance:** fixture page with 30 siblings staggers correctly in Chromium
(manual verification note in PR with the compiled fixture attached); snapshot diff =
`@supports` block + removed backface-visibility only; refactor commit is
snapshot-neutral.

---

### B5 · `v1/docs-release` — docs site, migration guide, release prep *(last)*

**Agent:** Sonnet / medium effort (bump to high for the browser-support matrix).

**Goal:** v1.0 is explainable and shippable.

1. Docs site: browser-support section (Baseline 2024 floor, sibling-index
   enhancement matrix), `@layer` override contract, `xyz-apply` docs (from A2)
   verified against v1, `data-xyz` everywhere (B1 did the mechanical sweep; this
   brief does editorial review). Add a note that `XyzTransitionGroup` (all
   frameworks) sets `--xyz-index` inline, so the CSS sibling-index/ladder cap
   does not apply when using the wrapper components.
2. Finish `MIGRATION-v1.md`: data-xyz, browser floor, @layer override behavior
   change, removed `!important`s, removed `-calc` vars, `backface-visibility`,
   `$xyz-attribute`/`$xyz-layer` escape hatches.
3. **Release via Changesets, not Lerna.** Ensure a `major` changeset exists for each
   published package taken to v1.0.0 (`@animxyz/core`, `@animxyz/vue`,
   `@animxyz/vue3`, `@animxyz/react`); `@animxyz/site` is ignored/unpublished.
   `updateInternalDependencies: patch` handles wrapper→core version bumps.
   Run `npx changeset version` on a release branch and review the generated
   CHANGELOGs (Changesets writes them — don't hand-author). Regenerate size stats
   (`buildStats.js`) and update any size claims in READMEs and `site/` content.
4. Update `animxyz-scss-analysis.html`'s Issues section footnotes if kept in-repo
   (optional: mark resolved items). Note its "76 doc examples" figure is pre-#123 and
   now ~321 in `site/`.

**Acceptance:** docs build passes; every item in the decisions record is either
shipped or explicitly listed in the backlog below.

---

## Backlog (explicitly deferred)

- `_fancy.scss`: stays orphaned by decision. Revisit after v1.0.
- `@starting-style` + `transition-behavior: allow-discrete` enter/exit mode
  (no-JS mount/unmount animation) — strongest post-v1 feature candidate.
- Scroll-driven animation utilities (`animation-timeline: view()/scroll()`).
- Typed `attr()` (Chromium-only): reading levels straight from attributes could
  eventually delete most generated selectors. Watch cross-engine progress.
- Browser visual-regression tests (Playwright) if the compile/snapshot net proves
  insufficient.
