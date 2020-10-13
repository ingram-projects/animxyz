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
## Variables

<div class="variables-table table-wrap shadow-scroll-h">
  <table class="shadow-scroll-content">
    <thead>
      <tr>
        <th></th>
        <th>Overall</th>
        <th>In</th>
        <th>Out</th>
        <th>Appear</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Transform</th>
        <td>--xyz-transform</td>
        <td>--xyz-in-transform</td>
        <td>--xyz-out-transform</td>
        <td>--xyz-appear-transform</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Translate X</th>
        <td>--xyz-translate-x</td>
        <td>--xyz-in-translate-x</td>
        <td>--xyz-out-translate-x</td>
        <td>--xyz-appear-translate-x</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Translate Y</th>
        <td>--xyz-translate-y</td>
        <td>--xyz-in-translate-y</td>
        <td>--xyz-out-translate-y</td>
        <td>--xyz-appear-translate-y</td>
      </tr>
      <tr>
        <th scope="row">Translate Z</th>
        <td>--xyz-translate-z</td>
        <td>--xyz-in-translate-z</td>
        <td>--xyz-out-translate-z</td>
        <td>--xyz-appear-translate-z</td>
      </tr>
      <tr>
        <th scope="row">Rotate X</th>
        <td>--xyz-rotate-x</td>
        <td>--xyz-in-rotate-x</td>
        <td>--xyz-out-rotate-x</td>
        <td>--xyz-appear-rotate-x</td>
      </tr>
      <tr>
        <th scope="row">Rotate Y</th>
        <td>--xyz-rotate-y</td>
        <td>--xyz-in-rotate-y</td>
        <td>--xyz-out-rotate-y</td>
        <td>--xyz-appear-rotate-y</td>
      </tr>
      <tr>
        <th scope="row">Rotate Z</th>
        <td>--xyz-rotate-z</td>
        <td>--xyz-in-rotate-z</td>
        <td>--xyz-out-rotate-z</td>
        <td>--xyz-appear-rotate-z</td>
      </tr>
      <tr>
        <th scope="row">Scale X</th>
        <td>--xyz-scale-x</td>
        <td>--xyz-in-scale-x</td>
        <td>--xyz-out-scale-x</td>
        <td>--xyz-appear-scale-x</td>
      </tr>
      <tr>
        <th scope="row">Scale Y</th>
        <td>--xyz-scale-y</td>
        <td>--xyz-in-scale-y</td>
        <td>--xyz-out-scale-y</td>
        <td>--xyz-appear-scale-y</td>
      </tr>
      <tr>
        <th scope="row">Scale Z</th>
        <td>--xyz-scale-z</td>
        <td>--xyz-in-scale-z</td>
        <td>--xyz-out-scale-z</td>
        <td>--xyz-appear-scale-z</td>
      </tr>
    </tbody>
  </table>
</div>

See the [variables](#variables) section to learn more.

---
## Defaults

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

See the [defaults](#defaults) section to learn more.
