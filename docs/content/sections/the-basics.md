---
title: The Basics
quote: Time to learn your XYZ's.

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

AnimXYZ works by applying a CSS keyframe animation to an element when it has an AnimXYZ class such as `.xyz-in` or `.xyz-out`. The properties of the animation are defined by CSS variables that you can set directly or with class-like utilities in an `xyz` attribute.

For example here is how you make an element fade and shrink in from above:

```html
<div class="xyz-in" xyz="fade up big">I will animate in!</div>
```
Changing the class to `xyz-out` reverses the direction of the animation:

```html
<div class="xyz-out" xyz="fade up big">I will animate out!</div>
```
[See it in action here](<?tab=examples&example=Example 1#the-basics>)

For simple animations, that's all you need, but AnimXYZ can do so much more! Keep on reading to see how you can customize and control AnimXYZ to create exactly the animations you want.
