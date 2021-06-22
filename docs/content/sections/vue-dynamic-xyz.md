---
title: Dynamic xyz
id: vue-dynamic-xyz

examples:
  - name: Basic
    component: DynamicXyz_Basic
    code:
      - name: Vue
        content: |
          ##javascript          
          const xyzUtilities = {
            'down': ${data.xyzUtilities && data.xyzUtilities['down']},
            'small': ${data.xyzUtilities && data.xyzUtilities['small']},
            'rotate-right': ${data.xyzUtilities && data.xyzUtilities['rotate-right']},
          }

          ##vue
          <XyzTransition xyz="fade duration-10" v-xyz="xyzUtilities">
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransition>
  - name: By Index
    component: DynamicXyz_ByIndex
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

If you need to dynamically or conditionally set and combine `xyz` utilities you can use the `v-xyz` directive. The `v-xyz` directive allows you to dynamically set the `xyz` attribute using a similar syntax to the Vue dynamic [class and style](https://vuejs.org/v2/guide/class-and-style.html) bindings.

```html
<!-- Conditionally apply a transform on an element like so  -->
<div v-xyz="{ 'left-5': isLeftTransformed, 'right-5': !isLeftTransformed }"></div>

<!-- Set the utility level dynamically  -->
<div v-xyz="`left-${leftTransformUtilityLevel}`"></div>

<!-- And to dynamically set XYZ variables simply use the `style` binding  -->
<div :style="{ '--xyz-translate-x': translateXAmount }"></div>
```