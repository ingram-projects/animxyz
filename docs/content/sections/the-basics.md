---
title: The Basics
quote: Time to learn your XYZ's

examples:
  - name: Example 1
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="fade up big" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade up big"></div>
  - name: Example 2
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="fade down flip-up-50" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade down flip-up-50"></div>
---

## Defining Animations

AnimXYZ animations are defined with an `xyz` attribute and [utility values](#utilities), or with [variables](#variables), that tell the animation what to do.

## Triggering Animations

Animations are triggered with [active classes](#active-classes) such as `.xyz-in` or `.xyz-out`. These also determine the direction of the animation to or from the defined values.

For example here is how you would make an element fade and shrink from above:

```html
<div class="xyz-in" xyz="fade up big">I will animate!</div>
```

For simple animations, that's all you need, but AnimXYZ can do so much more! Keep on reading to see how you can customize and control AnimXYZ to create exactly the animations you want.
