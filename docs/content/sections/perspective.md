---
title: Perspective
quote: TBD

examples:
  - name: Perspective
    template: |
      <xyz-transition xyz="fade flip-left" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :style="data.variables"></div>
      </xyz-transition>
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
