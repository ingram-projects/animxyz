---
title: Using with Sass
id: sass-apply
quote: "@include xyz-apply('fade up-100%')"
---

If you author your styles in Sass you can compose AnimXYZ animations directly in your stylesheet with the `xyz-apply` mixin, instead of (or in addition to) putting `xyz` [utilities](#utilities) on your markup. It takes the same space-separated utility string you'd write in an `xyz` attribute and sets the corresponding CSS variables on the current selector.

```scss
@use '@animxyz/core' as *;

.my-element {
  @include xyz-apply('fade up-100%');
}
```

This is handy when the animation belongs to a component's styles rather than its template, or when you want to keep your markup free of long attribute strings.

### Modes and levels

Every [utility](#utilities) works, including [mode](#contexts) prefixes (`in-`, `out-`, `appear-`) and levels. Pass multiple utilities in one call just like an `xyz` attribute:

```scss
.my-element {
  // 'in' opacity from 0, 'out' rotate on the z axis a full turn.
  @include xyz-apply('in-fade out-rotate-right-100%');
}
```

The utility name and level are parsed deterministically, so multi-word utilities like `flip-up` and level suffixes like `-100%` resolve unambiguously. An unrecognized utility or level raises a Sass `@error` listing the valid names/levels, so typos fail your build instead of silently doing nothing.

### Combining with variables

`xyz-apply` only sets the variables for the utilities you name, so you can freely combine it with your own [variable](#variables) overrides in the same rule:

```scss
.my-element {
  @include xyz-apply('fade small-50%');
  --xyz-duration: 0.6s;
  --xyz-ease: ease-in-out;
}
```
