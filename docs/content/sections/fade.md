---
title: Fade
quote: Beam me up Scotty!

examples:
  - name: Fade
    template: |
      <xyz-transition v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :style="data.variables"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="${data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [fade]
  groups:
    - name: Fade
      types: [opacity]

---

Fade is one of the most common animations, and combines well with other utilities.

Fade animates between the value of the CSS variable `--xyz-opacity` and the opacity of the element. Apply `xyz="fade"` to an element to use the default variable value of 0, or use one of the utilities like `xyz="fade-50"` to set the variable to a predefined value.

You can also override `--xyz-opacity` with a custom value in your CSS or with inline styling for more granular control.
