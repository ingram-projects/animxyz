---
'@animxyz/core': major
'@animxyz/vue': major
'@animxyz/vue3': major
'@animxyz/react': major
---

Rename the configuration attribute to standards-conforming `data-xyz`

AnimXYZ now reads its utilities from a `data-xyz` attribute instead of the
non-standard `xyz` attribute. The compiled CSS matches `[data-xyz~='…']`
selectors only — there is no dual-selector fallback.

- **Core:** a new `$xyz-attribute: 'data-xyz' !default` Sass variable drives all
  generated selectors, the `[data-xyz]` reset, and `[data-xyz~='inherit']`.
  Override it to build against the legacy `xyz` attribute.
- **Vue 2 / Vue 3:** the `v-xyz` directive keeps its name and now writes to
  `data-xyz`.
- **React:** the `xyz` prop keeps its name on `<XyzTransition>` /
  `<XyzTransitionGroup>` and now renders as a `data-xyz` attribute.

See `MIGRATION-v1.md` for upgrade guidance.
