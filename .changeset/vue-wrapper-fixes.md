---
"@animxyz/vue": patch
"@animxyz/vue3": patch
---

Fix three Vue wrapper bugs plus per-package hygiene (work brief A5).

- **Vue 2 reverse-stagger off-by-N** (`XyzTransitionGroup`): `--xyz-index-rev` was computed from the unfiltered `children.length` while the forward index iterates the filtered `rawChildren`, so any text/whitespace, `v-if` comment placeholder, or unkeyed node skewed every reverse index. It now uses `rawChildren.length - index - 1`, matching the forward index and the Vue 3 implementation.
- **Vue 3 listener clobbering** (`mergeData`): a consumer's `@enter`/`@leave`/`@appear` on `<XyzTransition>` previously replaced the internal animation hook (which owns `duration="auto"`, nested end-detection, and `appearVisible`), because the merge was a plain object spread. Same-named `on*` handlers are now composed — both run, and the internal hook keeps ownership of the `done` callback. The `style` merge now normalizes string/array `style` values before spreading, so a child with `style="color: red"` is no longer destroyed by spreading a string into character-indexed keys.
- **Vue 3 undeclared internal dependency** (`XyzTransitionGroup`): dropped the import of `getTransitionRawChildren` from `@vue/runtime-core` (an undeclared dependency that resolved only via npm hoisting, and an undocumented internal export) in favor of a small vendored filter modeled on the Vue 2 package — it flattens single-level Fragments and drops Comment/Text/unkeyed nodes.
- **Hygiene**: replaced the one-line `declare module` stubs in both packages with real `index.d.ts` typings (components, the `v-xyz` directive, the plugin default export, and `XyzTransitionProps`/`XyzTransitionGroupProps`), and added directive `unbind`/`unmounted` cleanup that calls the shared `clearXyzElement(el)` so `appearVisible` IntersectionObservers and pending timeouts don't outlive unmounted elements.
