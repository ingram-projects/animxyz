---
'@animxyz/core': major
---

Register typed dial custom properties with `@property`

The `all`-mode dial variables (`--xyz-opacity`, `--xyz-translate-x/y/z`,
`--xyz-rotate-x/y/z`, `--xyz-scale-x/y/z`, `--xyz-skew-x/y`) are now registered
via `@property` with a typed `syntax`, `inherits: true`, and an identity
`initial-value`. This adds type safety: a garbage value like
`--xyz-opacity: red` is rejected at computed-value time instead of poisoning the
animation. Because the dials inherit, an invalid value behaves as `unset`: the
dial inherits the parent's value, and only gets the typed initial value when no
ancestor sets it. `--xyz-opacity` and `--xyz-scale-*` accept numbers and
percentages.

Registration is deliberately limited to the `all`-mode bottom-tier dials, whose
`initial-value` equals the keyframe identity fallback, so the compiled output
behaves exactly as before. The mode-specific dials (`--xyz-in-*`, `--xyz-out-*`,
`--xyz-appear-*`) are intentionally left unregistered so the mode cascade's
`var()` fallthrough continues to work.

The `--xyz-perspective-none` `@supports` feature test is kept:
`perspective(none)` is not supported everywhere at the new browser floor (for
example Chrome/Edge 111), so it still defaults to `0` and switches to `none`
only where the browser supports it.

**Breaking:** the browser floor moves to Baseline 2024 (Chrome/Edge 111+,
Safari 16.4+, Firefox 128+) for `@property` support.

**Breaking:** angle dials (`--xyz-rotate-*`, `--xyz-skew-*`) are registered as
`<angle>` and now need units. A unitless `--xyz-rotate-z: 0` is invalid; use
`0deg`.
