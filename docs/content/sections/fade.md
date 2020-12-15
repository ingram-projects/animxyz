---
title: Fade
id: fade
quote: Beam me up Scotty!

examples:
  - name: Fade
    template: |
      <div class="example-wrap">
        <XyzTransition v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-if="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" ${data.utilitiesString && `xyz="${data.utilitiesString}"`}></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransition ${data.utilitiesString && `xyz="${data.utilitiesString}"`}>
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
          <XyzTransition ${data.utilitiesString && `xyz="${data.utilitiesString}"`}>
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
    defaults: [fade]
  variables: true
  groups:
    - name: Fade
      types: [opacity]

---

Fade is one of the most commonly used animations and combines well other animations.

Fade utilities and variables define the starting (`.xyz-in`) or ending (`.xyz-out`) [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) of the animating element. Apply `xyz="fade"` to an element to use the default value, or use one of the utilities like `xyz="fade-50"` to fade from and to a predefined value.

You can also override `--xyz-opacity` with a custom value in your CSS or with inline styling for more granular control.

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
        <th scope="row">Opacity</th>
        <td>--xyz-opacity</td>
        <td>--xyz-in-opacity</td>
        <td>--xyz-out-opacity</td>
        <td>--xyz-appear-opacity</td>
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
        <th scope="row">Opacity</th>
        <td>--xyz-opacity-default</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
