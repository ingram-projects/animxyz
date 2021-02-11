---
title: Direction
id: direction
quote: Take it back now yall!

examples:
  - name: Direction
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="big iterate-infinite duration-10" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-if="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="big iterate-infinite duration-10${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="big iterate-infinite duration-10${data.utilitiesString && ' ' + data.utilitiesString}">
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransition>

          ${data.variablesString && `
          ##html
          <style>
            .square { ${data.variablesString} }
          </style>
          `}
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="big iterate-infinite duration-10${data.utilitiesString && ' ' + data.utilitiesString}">
            {${data.toggled} && <div className="square" />}
          </XyzTransition>

          ${data.variablesString && `
          ##html
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [direction-alternate]
  variables: true
  groups:
    - name: Direction
      types: [direction]

---

The direction utilities and variables set the [animation-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) of an animation. 

---
## Variables

<div class="variables-table table-wrap shadow-scroll">
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
        <th scope="row">Direction</th>
        <td>--xyz-direction</td>
        <td>--xyz-in-direction</td>
        <td>--xyz-out-direction</td>
        <td>--xyz-appear-direction</td>
      </tr>
    </tbody>
  </table>
</div>

See the [variables](#variables) section to learn more.

---
## Defaults

<div class="variables-table table-wrap shadow-scroll">
  <table class="shadow-scroll-content">
    <thead>
      <tr>
        <th></th>
        <th>Variable</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Direction</th>
        <td>--xyz-direction-default</td>
        <td>1</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
