---
title: Perspective
quote: TBD

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

This is the perspective section
