---
title: The Basics
quote: Time to learn your XYZ's.

examples:
  - name: Example 1
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="fade up big" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="fade up big"></div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade up big">
            <div class="square" v-show="${data.toggled}"></div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="fade up big">
            {${data.toggled} && <div className="square"></div>}
          </XyzTransition>

  - name: Example 2
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="fade down flip-up-50" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="fade down flip-up-50"></div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade down flip-up-50">
            <div class="square" v-show="${data.toggled}"></div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="fade down flip-up-50">
            {${data.toggled} && <div className="square"></div>}
          </XyzTransition>
---

AnimXYZ is an easy way to animate elements without all the boilerplate of writing keyframes. Just describe the animation with some attributes and variables, and tell the element whether it's animating in or out of the scene with a class.

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
