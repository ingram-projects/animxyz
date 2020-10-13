---
title: Iterate
quote: 99 bottles of beer on the wall.

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
        <th scope="row">Iterate</th>
        <td>--xyz-iterate</td>
        <td>--xyz-in-iterate</td>
        <td>--xyz-out-iterate</td>
        <td>--xyz-appear-iterate</td>
      </tr>
    </tbody>
  </table>
</div>

See the [variables](#variables) section for more information about using CSS variables.

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
        <td>--xyz-iterate-default</td>
        <td>1</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section for more information about setting defaults.
