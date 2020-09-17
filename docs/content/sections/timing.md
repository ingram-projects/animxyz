---
title: Timing
quote: How did it get so late so soon?

examples:
  - name: Timing
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="fade turn-cw-50" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade turn-cw-50${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [duration-20]
  groups:
    - name: Timing
      types: [duration, delay]
    - name: Ease
      types: [ease]

---

Timing utilities let you set the [animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration), [animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay), and [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) of an animation. AnimXYZ animations default to a duration of `0.5s`, a delay of `0s`, and a timing-function of `ease`.

Changing the timing of an animation can have a large impact on how it feels. For example `xyz="ease-out-back"` will add a slight overshoot at the end of an animation.

You can set your own custom duration, delay, and timing function using the `--xyz-duration`, `--xyz-delay`, and `--xyz-ease` variables respectively.

::: note
To change the default timing values you can modify them in `:root`. For example:

```css
:root {
  --xyz-duration-default: 0.3s;
  --xyz-delay-default: 0.1s;
  --xyz-ease-default: ease-in-out;
}
```

See the [defaults](#defaults) section for more information about setting defaults.
:::
