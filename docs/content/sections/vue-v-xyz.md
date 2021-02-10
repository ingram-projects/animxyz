---
title: v-xyz
id: vue-v-xyz

examples:
  - name: Basic
    component: VXyz_Basic
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade" v-xyz="xyzUtilities">
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransition>
          <input type="checkbox" v-model="xyzUtilities['down']" />
          <input type="checkbox" v-model="xyzUtilities['small']" />
          <input type="checkbox" v-model="xyzUtilities['rotate-right']" />
  - name: By Index
    component: VXyz_ByIndex
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="example-grid">
            <div
              class="square"
              xyz="fade out-small-50% out-duration-30"
              v-xyz="{
                'in-down-50% in-right-50% in-stagger-1': index <= 41,
                'in-up-50% in-left-50% in-stagger-rev-1': index > 41,
                'out-rotate-right-5': index % 2,
                'out-rotate-left-5': (index + 1) % 2,
              }"
              v-if="${data.toggled}"
              v-for="index in 81"
              :key="index"
            ></div>
          </XyzTransitionGroup>
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