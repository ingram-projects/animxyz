# Migrating to AnimXYZ v1.0

AnimXYZ v1.0 is a modernization release. This guide covers the breaking changes
and how to update your project. It is a living document — later v1.0 work
(typed `@property` dials, cascade `@layer`s, browser-support floor) will add its
own sections here.

## `xyz` attribute → `data-xyz`

The single breaking change in this section is the configuration attribute.
AnimXYZ now reads its utilities from a standards-conforming `data-xyz`
attribute instead of the non-standard `xyz` attribute. The compiled CSS matches
`[data-xyz~='…']` selectors only — there is **no** dual-selector fallback.

### Plain HTML / CSS

Find and replace the attribute in your markup:

```
xyz="…"   →   data-xyz="…"
```

For example:

```html
<!-- before -->
<div class="square" xyz="fade up stagger"></div>

<!-- after -->
<div class="square" data-xyz="fade up stagger"></div>
```

If you read the value back in your own CSS, update the selector and any
`attr()` reference too:

```scss
// before
[xyz] { … }
content: attr(xyz);

// after
[data-xyz] { … }
content: attr(data-xyz);
```

### Framework wrappers

The wrapper packages handle the attribute name for you — **your component code
barely changes**:

- **Vue 2 / Vue 3** (`@animxyz/vue`, `@animxyz/vue3`): the `v-xyz` directive
  keeps its name; it now writes to the `data-xyz` attribute internally. If you
  set the attribute directly on an element (instead of using `v-xyz`), rename it
  to `data-xyz`.
- **React** (`@animxyz/react`): the `xyz` prop keeps its name on
  `<XyzTransition>` / `<XyzTransitionGroup>`; it now renders as a `data-xyz`
  attribute. If you put the attribute on a **raw** element (e.g. a nested
  `<div xyz="…">` inside a group), rename that to `data-xyz`.

```jsx
// wrapper prop — no change needed
<XyzTransition xyz="fade up">…</XyzTransition>

// raw nested element — rename
<div className="square xyz-nested" data-xyz="fade small stagger" />
```

> Note: CSS class names such as `.xyz-nested`, `.xyz-in`, and the CSS custom
> properties (`--xyz-*`) are unchanged. Only the configuration **attribute**
> moved.

### Escape hatch for Sass consumers

If you build the core from source and need to keep emitting the legacy `xyz`
attribute (or use a custom attribute name), override `$xyz-attribute`:

```scss
@use '@animxyz/core/src/animxyz' with (
  $xyz-attribute: 'xyz', // legacy behavior
);
```

The variable defaults to `'data-xyz'`.

## Browser floor: Baseline 2024

v1.0 uses `@property` to register the typed dial custom properties, which moves
the supported-browser floor to **Baseline 2024** (Chrome/Edge 111+, Safari
16.4+, Firefox 128+). Older browsers that ran AnimXYZ 0.x will no longer get the
typed dials (animations degrade rather than break). No action is needed if your
support matrix already sits at or above this floor.

## Cascade layers replace `!important`

v1.0 emits all CSS inside `@layer xyz` (with ordered sublayers) and no longer
uses `!important` anywhere. This changes the override contract:

- **Unlayered author CSS now beats AnimXYZ by default.** If you previously
  fought AnimXYZ's `!important` rules with your own `!important`, you can drop
  it — plain author styles already win now.
- **To lose to AnimXYZ on purpose**, declare your styles in a layer *before*
  `xyz`: `@layer base, xyz;` then put the styles in `@layer base { … }`.
- The `absolute` / `paused` / `none` classes and `prefers-reduced-motion`
  behavior are unchanged in effect — they now win by layer position instead of
  `!important`.

Set `$xyz-layer: ''` (Sass) to emit unlayered CSS if you can't adopt cascade
layers yet.

## Uncapped stagger via `sibling-index()`

Where the browser supports it, stagger indexing now comes from CSS
`sibling-index()` / `sibling-count()` instead of the capped `nth-child` ladder,
so staggers are no longer limited to `$xyz-index-levels` (default 20) siblings.
The ladder still ships as the fallback, so there's nothing to change.

- Chromium-only consumers can set `$xyz-index-levels: 0` (Sass) to drop the
  ladder entirely and rely solely on `sibling-index()`.
- `XyzTransitionGroup` (all frameworks) still sets `--xyz-index` inline, so the
  ladder/sibling-index cap never applied when using the wrapper components.

## Removed `backface-visibility: visible`

The animation mixin no longer emits `backface-visibility: visible`. It only
re-forced the CSS initial value; the only behavior change is for code that
relied on AnimXYZ re-forcing it. Set it yourself if you need it.
