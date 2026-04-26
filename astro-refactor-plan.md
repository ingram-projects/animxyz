# Refactor docs site → Astro + Vue islands (lift-and-shift)

## Context

The current docs site at `docs/` is built with **Gridsome 0.7.23**, a Vue-2-only static site generator that is no longer actively maintained. This locks the site to Vue 2 (the docs depend on `@animxyz/vue` rather than the existing `@animxyz/vue3` package), blocks ecosystem upgrades, and makes routine maintenance increasingly painful.

We're migrating to **Astro with Vue 3 islands** in a new `site/` folder at the repo root. This keeps the existing `docs/` running untouched during migration, preserves the current visual design and feature set 1:1 (lift-and-shift — no redesign), and ships less JavaScript by hydrating only the genuinely-interactive components. At cutover, `docs/` is deleted and deploy config is repointed at `site/dist/`.

Alongside this, the monorepo itself is being modernized: **yarn workspaces + Lerna → npm workspaces + Turborepo + Changesets**. Lerna is in maintenance mode and the project's task orchestration / publish flow benefits from the more modern stack. This is done up front (Phase 0) because the new `site/` package is built directly on top of npm workspaces.

## Target stack

- **Framework**: Astro (latest), `output: 'static'`
- **Vue integration**: `@astrojs/vue` with Vue 3 (runtime-with-compiler build — required by `DynamicTemplate.vue`, see Risks)
- **Markdown**: Astro Content Collections (Zod-typed frontmatter), reusing existing remark plugins
- **Styling**: Sass (built into Astro/Vite), keep current SCSS structure
- **SVG**: `vite-svg-loader` (preserves `import Foo from './foo.svg'` → Vue component pattern)
- **Local packages**: `@animxyz/core` and `@animxyz/vue3` via the existing yarn workspace

## Directory layout (new `site/`)

```
site/
├── astro.config.mjs        # @astrojs/vue, remark plugins, Sass options
├── package.json            # @animxyz/site, workspace member
├── tsconfig.json
├── public/                 # favicons, og image (from docs/static + assets/images)
└── src/
    ├── content/
    │   ├── config.ts       # Zod schema for Section frontmatter
    │   └── sections/       # 27 .md files moved verbatim from docs/content/sections/
    ├── pages/
    │   ├── index.astro     # ← docs/src/pages/Index.vue
    │   └── docs.astro      # ← docs/src/pages/Docs.vue (mounts <DocsApp> island)
    ├── layouts/
    │   └── Default.astro   # static shell + <slot/>; islands inside
    ├── components/
    │   ├── vue/            # ports of all docs/src/components/**/*.vue (Vue 3)
    │   │   ├── DocsApp.vue           # top-level island: PageNav + sections + Sandbox
    │   │   ├── reusable/             # Sandbox, CodeExamples, DynamicTemplate, ...
    │   │   ├── examples/             # XyzTransition, XyzTransitionGroup, ...
    │   │   ├── docsSection/
    │   │   └── banner/
    │   └── astro/          # static-only wrappers (Head, OgMeta, ScriptTags)
    ├── styles/             # ← docs/src/assets/styles/ verbatim (core/, variables/)
    │   └── global.scss     # entry; imports @animxyz/core + ress + fonts
    ├── plugins/
    │   └── VueMQ.ts        # ← docs/src/plugins/VueMQ.js, ported to Vue 3 plugin + useMq()
    ├── directives/         # scrollLock, xyzScrollSync (Vue 3 directive shape)
    ├── utils/              # copyToClipboard, openGraphMeta, textToId, xyzVariables, randomArrayItem
    ├── icons/              # SVG files + index.ts re-exports (consumed via vite-svg-loader)
    └── markdown/
        └── remark-codesandbox-modifier.cjs  # ← docs/remark-codesandbox-modifier.js
```

## Critical files referenced

- `docs/gridsome.config.js` — remark pipeline to replicate in `astro.config.mjs`
- `docs/src/main.js` — Vue plugin/directive/global-component registrations to translate into a Vue island `appEntrypoint`
- `docs/src/pages/Docs.vue` — page-query → Astro `getCollection('sections')`; the rest becomes a Vue 3 island
- `docs/src/components/reusable/Sandbox.vue` — most complex component; routing via `$route` must be ported to `window.location` + history listener
- `docs/src/components/reusable/CodeExamples.vue` — uses `DynamicTemplate`, drives the `data` shape consumed by example markdown templates
- `docs/src/components/reusable/DynamicTemplate.vue` — runtime template compilation (drives the runtime-with-compiler build choice)
- `docs/src/components/reusable/PageNav.vue`, `Default.vue` (layout) — nav + dark-mode + X-Ray toggle
- `docs/content/sections/the-basics.md` — canonical content shape; frontmatter `examples[].template` strings are Vue templates compiled at runtime by `DynamicTemplate`
- `docs/remark-codesandbox-modifier.js` — keep as remark plugin in Astro
- `packages/vue3/package.json` — already exists; replaces `@animxyz/vue` in the new site

## Implementation steps

### Phase 0. Modernize the monorepo (yarn + Lerna → npm + Turborepo + Changesets)

This phase touches root tooling only; package source code is unchanged.

- Delete `yarn.lock`; regenerate as `package-lock.json` after switching to npm workspaces
- Root `package.json`:
  - Replace `"workspaces": { "packages": ["packages/*", "examples/*", "docs"] }` with `"workspaces": ["packages/*", "examples/*", "docs", "site"]` (npm-workspaces shape; `site` added now so Phase 1 can install into it)
  - Replace `lerna run build` and friends with Turborepo equivalents: `"build": "turbo run build"`, `"dev": "turbo run dev"`, `"lint": "turbo run lint"`, `"test": "turbo run test"`
  - Replace `lerna publish` flow with Changesets: `"changeset": "changeset"`, `"version-packages": "changeset version"`, `"release": "turbo run build && changeset publish"`
  - devDeps: add `turbo`, `@changesets/cli`; remove `lerna`
- Add `turbo.json` at the repo root with a pipeline covering `build` (with `dependsOn: ["^build"]` and `outputs: ["dist/**"]`), `dev` (`cache: false`, `persistent: true`), `lint`, `test`
- Add `.changeset/config.json` (default config; `access: "public"`, `baseBranch: "main"`)
- Delete `lerna.json`
- Update `.husky/` hooks if they reference yarn; switch to `npm run` equivalents
- CI: search for any GitHub Actions / scripts that call `yarn` or `lerna` and update to `npm ci` / `npm run -w <pkg> <script>` / `turbo run`
- Verify each existing package still builds: `npm install` at the root, then `turbo run build` — `@animxyz/core`, `@animxyz/vue`, `@animxyz/vue3`, `@animxyz/react` should all produce the same `dist/` output as before
- Note: do **not** try to boot the existing Gridsome docs as part of Phase 0 verification. Gridsome 0.7.x depends on packages that no longer install on modern Node / ARM machines — that's part of why we're migrating. Phase 0 verification is limited to the four published packages above.

### 1. Scaffold `site/` and wire it into the workspace

- `npm create astro@latest site -- --template minimal --typescript strict --no-install --no-git`
- `site` is already in the root `workspaces` array from Phase 0; running `npm install` at the root links workspaces
- In `site/package.json`: name `@animxyz/site`, deps include `astro`, `@astrojs/vue`, `vue`, `@animxyz/core` (`workspace:*`), `@animxyz/vue3` (`workspace:*`), `sass`, `vite-svg-loader`, `prismjs`, `remark-codesandbox`, `remark-containers`, `rehype-prism-plus`, `body-scroll-lock`, `lodash`, `query-string`, `ress`, `@fontsource/inter`, `@fontsource/inconsolata`
- Drop these from the old docs deps (do not carry forward): `gridsome*`, `vue-client-only`, `vue-focus-lock` (replace with native `inert`), `vue-observe-visibility` (replace with `IntersectionObserver` composable), `vue-gtag` (no analytics in v1), `vue-prism-component`, `@gridsome/remark-prismjs`, `gridsome-plugin-svg`, `gridsome-plugin-sass-resources-loader`, `v-click-outside` (vendor a tiny Vue 3 directive)
- Add a `site/turbo`-friendly script set: `dev`, `build`, `preview`, `astro` (`astro check`), `lint`

### 2. Configure Astro (`site/astro.config.mjs`)

- Integrations: `vue({ appEntrypoint: '/src/vue-app.ts' })`
- `vite.plugins`: `svgLoader()` (for `.vue`-style SVG imports)
- `vite.resolve.alias.vue`: `'vue/dist/vue.esm-bundler.js'` — needed so `DynamicTemplate.vue` can compile templates at runtime
- `vite.css.preprocessorOptions.scss.additionalData`: `@use "src/styles/variables/index" as *;` to replicate `gridsome-plugin-sass-resources-loader`
- `markdown.remarkPlugins`: `remark-containers` (with the same custom `note` config copied verbatim from `docs/gridsome.config.js`), `remark-codesandbox` (same `customTemplates` map for `animxyz-vue-2/3`, `animxyz-react`, plus `*-router` variants), `./src/markdown/remark-codesandbox-modifier.cjs`
- `markdown.rehypePlugins`: `rehype-prism-plus` (replacement for `@gridsome/remark-prismjs`)
- `markdown.syntaxHighlight: false` (we provide our own via rehype-prism-plus)
- `site: 'https://animxyz.com'` for canonical URL generation

### 3. Define the content collection (`src/content/config.ts`)

- One collection `sections`, schema mirrors today's frontmatter:
  - `title: z.string()`, `id: z.string()`, `quote: z.string().optional()`
  - `examples: z.array(z.object({ name, template?, component?, code: z.array(z.object({ name, content })) })).optional()`
  - `modifiers: z.object({ utilities, variables, groups }).optional()`
- Move all 27 `.md` files from `docs/content/sections/` → `site/src/content/sections/` unchanged (frontmatter is already YAML, body is markdown)

### 4. Port the Vue components (Vue 2 → Vue 3)

- Copy `docs/src/components/**` → `site/src/components/vue/**`
- Mechanical changes per file:
  - `beforeDestroy` → `beforeUnmount`
  - `$listeners` removed; bind events explicitly (`v-on="data.listeners"` still works as inline handler binding)
  - Functional/render functions: `createElement` → `h` from `vue`
  - Custom directives: object shape unchanged for our usage
  - `v-model` on custom inputs: rename `value` prop → `modelValue`, `input` event → `update:modelValue` (`XyzModifiersInput`, `XyzVariablesInput`, `XyzUtilitiesInput`, `TabBar`)
  - `@vue/runtime-core`'s `Vue.component()` global registration moves into `vue-app.ts` `app.component()` calls
  - Dark-mode/X-Ray classes: keep on `<html>` via small inline script that reads `localStorage` before hydration to avoid flash
- `DynamicTemplate.vue`: same shape, but use `defineComponent({ template, props })` and `h(component, ...)` — requires the esm-bundler Vue alias from step 2
- `Sandbox.vue` route handling: replace `this.$route` watcher with a small `useLocation()` composable that listens to `popstate` and `hashchange`, and updates URL via `history.replaceState`. Preserve identical query-string contract: `?tab`, `?example`, `?group`, `?utilities=a;b`, `?variables=name:value;...`
- `Docs.vue` GraphQL `<page-query>` → fetched server-side in `docs.astro` via `getCollection('sections')`, passed as a prop to a `<DocsApp client:load>` Vue island. The `sectionDefinitions` ordering array stays in JS (move to `src/content/section-order.ts`)

### 5. Port the Vue app entrypoint (`src/vue-app.ts`)

- Translates `docs/src/main.js` `export default function (Vue, { router, head })` to Astro's `appEntrypoint`:
  - `app.use(VueAnimXyz)` from `@animxyz/vue3`
  - `app.use(VueMQ, { breakpoints: {...} })` — port of `docs/src/plugins/VueMQ.js` to Vue 3 plugin shape, exposes `app.config.globalProperties.$mq` plus a `useMq()` composable
  - Register icon components and example components (preserve names; same pattern as `docs/src/main.js`)
  - Register `v-scroll-lock` and `v-xyz-scroll-sync` directives
  - **No analytics in v1.** `vue-gtag` and the Beam Analytics tracker are intentionally not carried forward; analytics will be added in a follow-up

### 6. Port the layout (`src/layouts/Default.astro`)

- Static `<head>` with OG/meta tags (use `src/utils/openGraphMeta.ts` to build the same shape as today)
- `<link rel="icon">` → `site/public/favicon.png`, `site/public/animxyz-logo-touch.png` (copy from `docs/src/assets/images/`)
- **No analytics scripts** — Beam and GA are intentionally omitted; will be added later
- Inline pre-hydration script: read `localStorage.darkMode` only and set the dark class on `<html>` to avoid a flash. **X-Ray is not persisted** — it always defaults to off on page load (it's a fun local effect mode, not a saved preference)
- `<slot/>` for the page

### 7. Port the styles

- Copy `docs/src/assets/styles/` → `site/src/styles/` verbatim
- `site/src/styles/global.scss` imports: `ress/dist/ress.min.css`, `@fontsource/inter`, `@fontsource/inconsolata`, `prismjs/themes/prism.css` (or current theme), `./core/index.scss` which already does `@include xyz-all;` from `@animxyz/core`
- Import `global.scss` once from `Default.astro`
- Keep `include-media` (lift-and-shift); same breakpoint variables continue to work

### 8. Port utilities, directives, icons

- `src/utils/*` — straight copy, convert `.js` to `.ts` only if trivial (otherwise leave as `.js`)
- `src/directives/scrollLock.ts`, `xyzScrollSync.ts` — Vue 3 directive lifecycle (`mounted`/`updated`/`unmounted`)
- `src/icons/index.ts` — `import Foo from './foo.svg?component'` (vite-svg-loader); export an object mapping `IconFoo` → component, registered in `vue-app.ts` to preserve `<IconFoo/>` usage in templates

### 9. Verification (end-to-end)

- `npm run dev -w @animxyz/site` (or `turbo run dev --filter=@animxyz/site`) and walk through every section in `sectionDefinitions`:
  - Each `.md` renders prose, headings, code blocks, `:::note` containers, and `:::note[tag]` tagged variants
  - Sandbox: utility toggles, variable inputs, preset groups all update the live demo
  - CodeExamples: tab switching, animation loop runs, code panel updates with injected utility/variable strings
  - URL contract: open `/docs?tab=examples&example=Example 1&group=foo&utilities=fade;up&variables=duration:2s#the-basics` and confirm Sandbox restores state on load and on back/forward
  - CodeSandbox links on code blocks open the right template (vue-2 / vue-3 / react / \*-router variants)
  - Dark mode persists across reload (no flash). **X-Ray always starts off on page load** — toggle it on, reload, confirm it's off again
  - `prefers-reduced-motion` banner appears when OS setting is on
  - Hash navigation: clicking PageNav scrolls to section, scroll-spy updates active section
- `npm run build -w @animxyz/site` (or `turbo run build --filter=@animxyz/site`) and serve `dist/`; re-run the same checks against the static output
- `npm run astro -w @animxyz/site -- check` for type errors
- Visual reference: the old Gridsome `docs/` site can't be booted locally (its dependencies no longer install on modern Node / ARM), so use **production animxyz.com** in a side-by-side browser window as the visual baseline for comparison
- Monorepo sanity: `turbo run build` from the root builds all packages + site cleanly with no Lerna/yarn references remaining

### 10. Cutover (single PR after parity is verified)

- Delete `docs/`
- Remove `docs` from the root `package.json` `workspaces` array
- Update root README link and any CI/deploy config (none currently in `docs/`, but check repo root) to point at `site/dist`
- Bump `homepage`/social links if needed

## Risks and mitigations

- **Runtime Vue template compilation** (`DynamicTemplate.vue`) — Astro's default Vue alias is runtime-only. Mitigated by aliasing `vue` to `vue/dist/vue.esm-bundler.js` and ensuring `runtimeCompiler` parity with the current Gridsome setup. Bundle cost is acceptable for a docs-only site.
- **Frontmatter contains Vue 2 template strings with `v-on="data.listeners"`** — Vue 3 still supports this binding shape; verified by reading `the-basics.md` and `CodeExamples.vue`'s `data` computed. No content edits required.
- **Routing model differs** — Gridsome ships a Vue Router; Astro does full-page navigation. Since the live site is essentially two pages (`/` and `/docs`), and the Sandbox state lives in `?query` + `#hash` (not router-internal state), this is fine. The `Docs.vue` `$route` watchers translate cleanly to `popstate`/`hashchange` listeners.
- **`remark-codesandbox` compatibility** — the package is generic remark, not Gridsome-specific. The `mode: 'meta'` option and `customTemplates` map carry over verbatim. Validate by inspecting one rendered code block in dev.
- **`vue-focus-lock` / `v-click-outside` / `vue-observe-visibility` are Vue 2 only** — replace with `inert` attribute, a tiny vendored click-outside directive, and an `IntersectionObserver` composable. Behavior parity, no API surface exposed in markdown content.
- **Publish flow change (Lerna → Changesets)** — `lerna publish` is replaced by `changeset version` (bumps versions + writes CHANGELOGs from `.changeset/*.md` files) and `changeset publish` (npm publish). Contributors will need to run `npm run changeset` to author changesets on PRs. Existing `CHANGELOG.md` files are preserved; Changesets appends to them. `conventional-prerelease` / `conventional-graduate` flows from the old root scripts are dropped — Changesets has its own pre-release mode (`changeset pre enter <tag>`).
- **Workspace protocol** — npm workspaces support `workspace:*` since npm 7+; this matches the current Yarn behavior, so internal cross-package deps keep linking the same way. Verify by inspecting `node_modules/@animxyz/core` after `npm install`.
