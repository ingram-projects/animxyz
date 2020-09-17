---
title: Perspective
quote: From a certain point of view.

examples:
  - name: Perspective
    template: |
      <div class="example-wrap perspective-none">
        <xyz-transition xyz="fade flip-left" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade flip-left${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [perspective-3]
  groups:
    - name: Perspective
      types: [perspective]

---

To take full advantage of CSS 3D animations, your animating elements should have a perspective applied to them. This can be done by adding a [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) property on a parent of the animating elements, for example by adding `perspective: 500px`. However if you want to set a perspective on each element only while it is animating you can use a perspective XYZ utility.

::: note
Smaller perspective values will result in a more pronounced effect.
:::
