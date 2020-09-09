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

To animate an element with AnimXYZ, give it an `xyz` attribute describing the animation you want (with our provided [utilities](#utilities) or [variables](#variables)), as well as an AnimXYZ active class such as `.xyz-in` or `.xyz-out` to trigger the animation.

For example here is how you would make an element fade and shrink from above:

```html
<div class="xyz-in" xyz="fade up big">I will animate!</div>
```

[See it in action!](?tab=examples&example=Example 1#the-basics)

For simple animations, that's all you need, but AnimXYZ can do so much more! Keep on reading to see how much more you can do with it.
