---
'@animxyz/core': major
---

Wrap all output in cascade `@layer`s and drop `!important` outside the special classes

Compiled CSS is now emitted inside a single top-level `@layer xyz` with
sublayers declared in precedence order:

```css
@layer xyz.defaults, xyz.index.ladder, xyz.index.modern, xyz.utilities,
       xyz.triggers.in, xyz.triggers.out, xyz.triggers.appear, xyz.overrides;
```

Precedence is decided by layer order instead of source order or `!important`.
The only `!important` declarations left are the `absolute` / `paused` / `none`
special classes and the `prefers-reduced-motion` override, which live in the
last `overrides` sublayer. A layered `!important` beats all normal-priority
author CSS, so they keep beating unlayered author CSS as in 0.x.

**Breaking: override contract changes.** Everything else is now overridable by
plain unlayered author CSS. To lose to AnimXYZ deliberately, declare your
styles in a layer before `xyz` (e.g. `@layer base, xyz;`). An unlayered
`!important` no longer overrides the special classes or reduced motion; use an
`!important` inside a layer declared before `xyz` instead.

`appear` is pinned to the last trigger sublayer, so it beats `in`/`out`
regardless of `$xyz-modes` order — the "appear must come last" source-order
constraint is removed and `$xyz-modes` may be listed in any order.

Set `$xyz-layer: ''` to emit unlayered CSS as an escape hatch. The trigger rules
are emitted in the same order the layers are declared, so `appear` still beats
`in`/`out` — on source order — when there is no layer left to carry precedence.
