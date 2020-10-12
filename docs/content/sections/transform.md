---
title: Transform
quote: Elements, roll out!

examples:
  - name: Transform
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="fade" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade${data.utilitiesString && ' ' + data.utilitiesString}"></div>

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

Translate, rotate, and scale your elements along any axis. We call it Anim**XYZ** for a reason!

Transform utilities and variables define the starting (.xyz-in) or ending (.xyz-out) [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) of the animating element. For example `xyz="up"` will apply a `translateY()` to an element, translating it from above its normal position when animating in and to that same position when animating out.

You can also override any of the provided transform variables with a custom value in your CSS or with inline styling for more granular control.

::: note
If an element already has a transform applied to it that you want to maintain during the animation, pass it as custom values to the relevant CSS variables. For example if an element has `transform: translateX(-50%)` applied to it, and you want to use `xyz="up"`, you can set its `--xyz-translate-x` variable to `-50%` and it will maintain that translate through the entire up animation.
:::

---
## Defaults

To change the default transform values you can modify them in `:root`. For example:

<div class="variables-table table-wrap shadow-scroll-h">
  <table class="shadow-scroll-content">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>--xyz-translate-default</td>
        <td>30px</td>
      </tr>
      <tr>
        <td>--xyz-rotate-default</td>
        <td>.25turn</td>
      </tr>
      <tr>
        <td>--xyz-scale-default</td>
        <td>0.5</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section for more information about setting defaults.
