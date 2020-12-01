---
title: v-xyz
id: vue-v-xyz
---

The `v-xyz` directive allows you to dynamically set the `xyz` attribute using a similar syntax to the Vue dynamic [class and style](https://vuejs.org/v2/guide/class-and-style.html) bindings. For instance you can conditionally apply a transform on an element like so:

```html
<div v-xyz="{ 'left-5': isTransformed }"></div>
```

Or set the utility level dynamically:

```html
<div v-xyz="[`left-${utilityLevel}`]"></div>
```

To dynamically set XYZ variables simply use the existing dynamic `:style` binding:

```html
<div :style="{ '--xyz-translate-x': translateAmount }"></div>
```