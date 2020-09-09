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

To take full advantage of CSS 3D animations, you need to set a perspective on an animating item or its parent, for example by adding `perspective: 400px`. However if you want to set perspective only during an XYZ animation you can use a perspective XYZ utility.
