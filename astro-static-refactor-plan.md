# Refactor AnimXYZ site to static-first Astro + Vue islands

## Context

The site was ported to Astro but it didn't actually adopt Astro's model. Today each
of the two pages mounts **one giant Vue component as a single island**, so almost
nothing benefits from static rendering:

- `src/pages/index.astro` mounts `IndexApp.vue` with **`client:only="vue"`** → the
  entire homepage (hero, feature cards, "used by", footer — all static prose) is
  blank HTML until JS downloads and Vue renders it. Zero SSG, bad LCP/SEO.
- `src/pages/docs.astro` pre-renders markdown to HTML (good) but then passes it as a
  prop to `DocsApp.vue`, which re-injects it via `v-html` and hydrates the whole tree
  with **`client:load`**. The static docs prose is trapped inside a hydrated SPA.
- `src/vue-app.ts` registers _all_ icons, _all_ example components, and three
  directives globally, and `astro.config.mjs` aliases `vue` → the full
  `vue.esm-bundler` (runtime compiler) for `DynamicTemplate`. Every visitor downloads
  the compiler + every example on every page.

The genuinely interactive surface is small and already well-isolated: the **Sandbox**
playground, **DarkModeToggle**, **XrayToggle**, the animated **Banner**, **PageNav**
(open/close + scroll-spy), and **CodeBlock** copy. Everything else is static content
that merely lives in Vue.

**Goal:** render all main content statically with Astro, ship Vue only as small
targeted islands, preserve the scroll-in animations (the site is a showcase for the
library) using AnimXYZ's pure-CSS classes + one shared `IntersectionObserver`, and
coordinate the few independent islands with nanostores.

**Decisions (confirmed with user):** full refactor of both pages; re-create
appear-visible animations with CSS + observer; coordinate islands via nanostores.

## How appear-visible works in pure CSS (verified)

Vue's `<XyzTransition appear-visible>` internally adds `xyz-appear` + `xyz-paused-all`,
then uses an `IntersectionObserver` to remove `xyz-paused-all` when the element enters
the viewport (`utils/getXyzAnimationHook.js`). We replicate this without Vue:

```html
<div xyz="fade small-2 ease-out delay-1" class="xyz-appear xyz-paused-all">…</div>
```

A single shared observer removes `xyz-paused-all` on intersection and unobserves.
Nested/staggered children keep `class="xyz-nested"` and `--xyz-index` as today.

## Approach

### Phase 1 — Foundation (shared infra)

- **Add deps:** `nanostores`, `@nanostores/vue`. (`@astrojs/vue` already present.)
- **Shared appear observer:** new `src/scripts/appearVisible.ts` — finds
  `.xyz-paused-all`, removes the class on intersect, unobserves. Imported once from the
  layout via an inline `<script>` so it runs on every page for static markup.
- **Stores:** new `src/stores/docs.ts` exporting nanostores atoms
  `activeSectionId`, `activeTab` (`'docs' | 'examples'`), `navOpen`. These replace the
  cross-component state currently held in `DocsApp.vue`'s `data()`.
- **Slim the Vue entrypoint:** rework `src/vue-app.ts` so it no longer globally
  registers all icons/examples. Keep only the directives still needed by surviving
  islands (`scroll-lock`, `click-outside`; drop `xyz-scroll-sync` if its only consumer
  becomes static). Example components get imported locally by `CodeExamples.vue`
  (already the case) so they only enter the Sandbox island bundle.
- **Icons become static:** icons used in static Astro markup (hero tech logos, CTA
  buttons, footer Twitter, section anchor/link, GitHub) are inlined as SVG in `.astro`
  via `import Logo from '…svg?raw'` + `<Fragment set:html={Logo} />` (preserves
  `--icon-color` CSS theming). Only icons rendered _inside_ a Vue island stay Vue.

### Phase 2 — Homepage → static Astro + islands

Rewrite `src/pages/index.astro` to contain the markup currently inside
`IndexApp.vue`'s `<template>` as static Astro HTML, replacing every
`<XyzTransition appear-visible …>` / `<XyzTransitionGroup … appear-visible>` wrapper
with a plain element carrying `xyz="…"` + `xyz-appear xyz-paused-all` (move the `xyz`
string off the Vue wrapper onto the real element). Keep all existing SCSS — move the
`<style lang="scss" scoped>` block into the `.astro` file (Astro supports scoped
SCSS). Remaining islands only:

- `<Banner client:visible />` — `setInterval` cycling, genuinely interactive.
- `<Sandbox client:visible … />` — the playground. The large `sandboxProps` config
  object currently hard-coded in `IndexApp.vue` (lines 194–314) moves to
  `src/data/indexSandbox.ts` and is passed as a prop.
- `<DarkModeToggle client:idle />`.
- `Shine` (mouse-tracking glow on feature cards): re-implement as a tiny vanilla
  `mousemove` script in `appearVisible.ts`'s neighbor (`src/scripts/shine.ts`) updating
  `--mouseX/--mouseY`, OR a `client:visible` island — vanilla script preferred (no Vue
  needed). Keep `Shine.vue` only if reuse elsewhere demands it.
- Delete `IndexApp.vue` once migrated.

### Phase 3 — Docs page → static Astro + islands + coordination

`src/pages/docs.astro` already builds `sectionsData` server-side; keep that. Render the
section list **statically**:

- New `src/components/astro/DocsSection.astro` replaces `DocsSection.vue` +
  `MarkdownContent.vue`: outputs the `<article>` header, anchor link, quote, and the
  pre-rendered markdown HTML via `set:html={section.content}` (no `v-html`, no
  hydration). Wrap each section with `xyz-appear xyz-paused-all` for the scroll-in
  effect. The `sectionDefinitions` ordering array (currently in `DocsApp.vue`
  lines 53–87) moves to `src/data/sectionDefinitions.ts` and is imported by the page.
- New `src/components/astro/PageNav.astro` renders the static nav link list (it's just
  `<a href="#id">` links). Interactive bits become small pieces:
  - open/close toggle + mobile menu visibility → a `client:idle` Vue island
    (`NavToggle.vue`) or vanilla script bound to `navOpen` store; scroll-lock via
    existing directive or a class toggle.
  - active-link highlight driven by the `activeSectionId` store.
- **Scroll-spy:** vanilla `src/scripts/scrollSpy.ts` using `IntersectionObserver` over
  the static `.docs-section__wrap[id]` elements, writing the most-covered id to the
  `activeSectionId` store (replaces `DocsApp.onWindowScroll`).
- **Tab toggle (docs/examples, mobile)** + **link interception** (keep same-page
  `?tab=`/`#hash` changes from doing a full reload): vanilla
  `src/scripts/docsRouting.ts` reading/writing `activeTab` store and `window.history`,
  porting `DocsApp.onInternalLinkClick` / `onLocationChange`. The page wrapper's
  `tab--{activeTab}` class is set by subscribing to the store.
- **Sandbox island:** a single `<Sandbox client:visible />` in the right pane. It
  subscribes (via `@nanostores/vue`) to `activeSectionId` to pick which section's
  `examples`/`modifiers` to show. Serialize every section's `examples`+`modifiers` into
  a JS map exposed to the island as a prop (built from `sectionsData` in the page
  frontmatter). Its existing URL-param logic (`utilities`, `variables`, `group`,
  `example`) stays. This is where the Vue runtime compiler + 17 example components live
  now — loaded only when the sandbox hydrates, not on page load.
- Delete `DocsApp.vue`, `DocsSection.vue`, `MarkdownContent.vue` once migrated.

### Phase 4 — Cleanup & verification

- Remove the global icon/example registration from `vue-app.ts`; confirm the
  `vue` → `vue.esm-bundler` alias is only pulled into the Sandbox island chunk.
- Delete now-unused Vue components and any orphaned directives/composables
  (`useMediaQueries` may still be needed by Sandbox/nav island — check before removing).
- Confirm `XrayToggle` stays a `client:load` island in the layout (already fine).

## Critical files

- `src/pages/index.astro`, `src/pages/index` styles (from `IndexApp.vue`)
- `src/pages/docs.astro`
- `src/layouts/Default.astro` (add appear-observer + store-driven body class hooks)
- `src/vue-app.ts`, `astro.config.mjs`
- New: `src/stores/docs.ts`, `src/scripts/{appearVisible,scrollSpy,docsRouting,shine}.ts`,
  `src/components/astro/{DocsSection,PageNav}.astro`,
  `src/data/{indexSandbox,sectionDefinitions}.ts`
- Surviving islands: `Sandbox.vue`, `Banner.vue`, `DarkModeToggle.vue`,
  `XrayToggle.vue`, `CodeExamples.vue`/`CodeBlock.vue`/`DynamicTemplate.vue` + example
  components
- Removed: `IndexApp.vue`, `DocsApp.vue`, `DocsSection.vue`, `MarkdownContent.vue`,
  (likely) `Shine.vue`, `PageNav.vue` template logic

## Reuse (don't rebuild)

- AnimXYZ CSS classes `xyz`, `xyz-appear`, `xyz-paused-all`, `xyz-nested`,
  `--xyz-index` (see `packages/core/src/_core.scss`) — the static animation primitive.
- Replicate the observer pattern from `utils/getXyzAnimationHook.js` rather than
  inventing one.
- Server markdown rendering already in `docs.astro` (`getCollection` + AstroContainer
  `renderToString`) — keep as-is, just consume the HTML in `DocsSection.astro`.
- Existing SCSS blocks move verbatim into the `.astro` files.

## Verification

1. `npm run build` in `site/` succeeds; inspect `dist/` — confirm `index.html` and
   `docs.html` contain the hero/feature/footer and full docs prose as **static HTML**
   (view-source shows content with JS disabled).
2. Run `npm run dev` and check in a browser:
   - Homepage renders instantly with JS disabled; with JS on, sections animate in on
     scroll, Banner cycles, dark-mode toggle works, Sandbox playground is interactive.
   - Docs: nav links scroll to sections, scroll-spy highlights the active link,
     mobile menu opens/closes with scroll-lock, docs/examples tab toggle works on
     mobile, `?tab=examples&utilities=fade;up#sandbox`-style deep links still populate
     the Sandbox, internal same-page links don't full-reload.
3. Compare JS payload before/after (build output / Network tab): homepage should ship
   little/no Vue until the Sandbox scrolls into view; the runtime compiler should be
   absent from the initial document request.
4. Confirm reduced-motion alert and `XrayToggle` still function.
