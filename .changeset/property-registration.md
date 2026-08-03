---
'@animxyz/core': major
---

Register typed dial custom properties with `@property`

The `all`-mode dial variables (`--xyz-opacity`, `--xyz-translate-x/y/z`,
`--xyz-rotate-x/y/z`, `--xyz-scale-x/y/z`, `--xyz-skew-x/y`) are now registered
via `@property` with a typed `syntax`, `inherits: true`, and an identity
`initial-value`. This adds type safety — a garbage value like `--xyz-opacity: red`
is rejected at computed-value time and falls back to the typed initial value
instead of poisoning the animation.

Registration is deliberately limited to the `all`-mode bottom-tier dials, whose
`initial-value` equals the keyframe identity fallback, so the compiled output
behaves exactly as before. The mode-specific dials (`--xyz-in-*`, `--xyz-out-*`,
`--xyz-appear-*`) are intentionally left unregistered so the mode cascade's
`var()` fallthrough continues to work.

The `--xyz-perspective-none` `@supports` feature test is removed —
`perspective(none)` is universally supported at the new browser floor
(Baseline 2024).

**Breaking:** the browser floor moves to Baseline 2024 (Chrome/Edge 111+,
Safari 16.4+, Firefox 128+) for `@property` support.
