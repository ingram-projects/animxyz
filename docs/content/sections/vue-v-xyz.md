---
title: v-xyz
id: vue-v-xyz

examples:
  - name: Basic
    component: ExampleVXyzBasic
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear xyz="fade" v-xyz="xyzUtilities" v-on="data.listeners">
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransition>
          <input type="checkbox" v-model="xyzUtilities['down']" />
          <input type="checkbox" v-model="xyzUtilities['small']" />
          <input type="checkbox" v-model="xyzUtilities['rotate-right']" />
  - name: By Index
    component: ExampleVXyzByIndex
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup appear class="square-grid">
            <div
              class="square"
              xyz="fade"
              v-xyz="{
                'down right in-stagger-1': index <= 50,
                'up left in-stagger-rev-1': index > 50,
                'small-100': index % 2,
                'rotate-right': index % 3,
                'flip-up': index % 5,
              }"
              v-if="${data.toggled}"
              v-for="index in 100"
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