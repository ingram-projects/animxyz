---
title: The Basics
quote: Time to learn your XYZ's

examples:
  - name: The Basics
    template: |
      <xyz-transition xyz="fade down big" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade down big"></div>
---

To animate an element with AnimXYZ, give it an `xyz` attribute describing the animation you want (with our provided [utilities](#utilities) or [variables](#variables)), as well as an AnimXYZ active class such as `.xyz-in` or `.xyz-out`.

For simple animations, that's all you need, but keep on reading to see how much more you can do with it.