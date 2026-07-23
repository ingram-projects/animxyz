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
