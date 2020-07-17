---
title: Transform
quote: Roll out, roll in, fly away!

examples:
  - name: Transform
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-if="data.toggled" :style="data.variables"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [down]
  groups:
    - name: Translate
      types: [translate]
    - name: Rotate
      types: [rotate]
    - name: Scale
      types: [scale]

---

Translate, rotate, and scale your elements along any axis. We call it AnimXYZ for a reason!

Transform utilities animate between the value of the relevant CSS variables and the element's natural position. For example applying `xyz="up"` to an element will translate it on the Y axis between `translateY(30px)` and the element's `translateY` position.

You can also override any of the provided transform variables with a custom value in your CSS or with inline styling for more granular control.

> If an element already has a transform applied to it that you want to maintain during the animation, pass it as custom values to the relevant CSS variables. For example if an element has `transform: translateX(-50%)` applied to it, and you want to use `xyz="up"`, you can set its `--xyz-translate-x` variable to `-50%` and it will maintain that translate through the entire up animation.
