---
title: Browser Support
id: browser-support
quote: Baseline is the new bleeding edge.
---

AnimXYZ v1.0 targets **Baseline 2024**: Chrome/Edge 111+, Safari 16.4+, and
Firefox 128+. This is the floor for [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property),
which v1 uses to register its typed dial custom properties, and for
[cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

Older browsers degrade gracefully — animations simply won't run rather than
breaking the page.

## Cascade layers & overrides

All of AnimXYZ's CSS is emitted inside a single top-level `@layer xyz`, with
sublayers declared in precedence order:

```css
@layer xyz.defaults, xyz.index.ladder, xyz.index.modern, xyz.utilities,
       xyz.triggers.in, xyz.triggers.out, xyz.triggers.appear, xyz.overrides;
```

Precedence is decided by **layer order**, not source order or `!important` (the
compiled CSS contains none). The practical upshot:

- **Your unlayered CSS beats AnimXYZ by default** — no specificity battles, no
  `!important`.
- To deliberately *lose* to AnimXYZ, put your styles in a layer declared before
  `xyz`, e.g. `@layer base, xyz;`.

Sass consumers can set `$xyz-layer: ''` to emit unlayered CSS as an escape
hatch.

## Uncapped stagger

Where the browser supports [`sibling-index()`](https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-index),
staggers read their index straight from the DOM and are no longer capped at
`$xyz-index-levels` (default 20) siblings. Browsers without it fall back to the
`nth-child` ladder automatically.

| Feature | Support |
| --- | --- |
| `@property`, `@layer` (core v1 floor) | Baseline 2024 (Chrome/Edge 111+, Safari 16.4+, Firefox 128+) |
| `sibling-index()` uncapped stagger | Progressive enhancement — Chromium 138+; ladder fallback elsewhere |

> **Note:** `XyzTransitionGroup` (Vue, Vue 3, and React) sets `--xyz-index`
> inline on each item, so the `sibling-index()`/ladder cap does not apply when
> you use the wrapper components — only when writing the CSS classes by hand.
