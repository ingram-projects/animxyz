---
'@animxyz/core': major
---

Wrap all output in cascade `@layer`s and remove every `!important`

Compiled CSS is now emitted inside a single top-level `@layer xyz` with
sublayers declared in precedence order:

```css
@layer xyz.defaults, xyz.index, xyz.utilities,
       xyz.triggers.in, xyz.triggers.out, xyz.triggers.appear, xyz.overrides;
```

Precedence is decided by layer order instead of source order or `!important`
(the output now contains zero `!important`). The `absolute` / `paused` / `none`
special classes and the `prefers-reduced-motion` override win because they live
in the last `overrides` sublayer, not because they are forced.

**Breaking — override contract changes:** unlayered author CSS now beats
AnimXYZ by default. To lose to AnimXYZ deliberately, declare your styles in a
layer before `xyz` (e.g. `@layer base, xyz;`).

`appear` is pinned to the last trigger sublayer, so it beats `in`/`out`
regardless of `$xyz-modes` order — the "appear must come last" source-order
constraint is removed and `$xyz-modes` may be listed in any order.

Set `$xyz-layer: ''` to emit unlayered CSS as an escape hatch.
