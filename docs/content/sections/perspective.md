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

Smaller perspective values will result in a more pronounced effect.

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
        <th scope="row">Perspective</th>
        <td>--xyz-perspective</td>
        <td>--xyz-in-perspective</td>
        <td>--xyz-out-perspective</td>
        <td>--xyz-appear-perspective</td>
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
        <td>--xyz-perspective-default</td>
        <td>0px</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
