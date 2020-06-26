---
title: Timing

examples:
  - name: Timing
    template: |
      <xyz-transition xyz="fade turn-cw-50" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :style="data.modifiers.variables"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade turn-cw-50 ${data.modifiers.utilities}"></div>

          ${data.modifiers.variables && `
          <style>
            .square { ${data.modifiers.variables} }
          </style>
          `}

modifiers:
  utilities:
    default: duration-20
  groups:
    - name: Timing
      types: [duration, delay]
    - name: Ease
      types: [ease]

---

How did it get so late so soon?

Timing utilities let you set the `animation-duration`, `animation-delay`, and `animation-timing-function` of an animation.

Changing the timing of an animation can have a large impact on how it feels. AnimXYZ animations default to a duration of `1s`, a delay of `0`, and a timing-function of `ease`.