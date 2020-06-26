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

Timing utilities let you set the `animation-duration`, `animation-delay`, and `animation-timing-function` of an animation. AnimXYZ animations default to a duration of `.5s`, a delay of `0s`, and a timing-function of `ease`.

Changing the timing of an animation can have a large impact on how it feels. For example `xyz="ease-out-back"`

You can set your own custom duration and delay with the relevant variables, and you can pass a custom timing function to the `--xyz-ease` variable.

> To change the default duration for all animations, set `--xyz-delay` in `:root`. For example:
> ```css
> :root {
>   --xyz-delay: .3s;
> }
> ```