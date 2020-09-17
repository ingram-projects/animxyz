---
title: Iterate
quote: From a certain point of view.

examples:
  - name: Iterate
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="duration-20 ease-in-out-back flip-up-100" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="duration-20 ease-in-out-back flip-up-100${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [iterate-infinite]
  groups:
    - name: Iterate
      types: [iterate]

---

This is the iterate section
