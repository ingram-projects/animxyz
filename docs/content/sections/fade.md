---
title: Fade

examples:
  - name: Fade
    template: |
      <xyz-transition v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :style="data.modifiers.variables"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="${data.modifiers.utilities}"></div>

          ${data.modifiers.variables && `
          <style>
            .square { ${data.modifiers.variables} }
          </style>
          `}

modifiers:
  utilities:
    default: fade
  groups:
    - name: Fade
      types: [fade]

---

Beam me up Scotty!

Fade is one of the most common animations, and combines well with other utilities.

Fade animates between the value of the CSS variable `--xyz-fade` and the opacity of the element. Apply `xyz="fade"` to an element to use the default variable value of 0, or use one of the utilities like `xyz="fade-50"` to set the variable to a predefined value.

You can also override `--xyz-fade` with a custom value in your CSS or with inline styling for more granular control.