---
title: Origin
id: origin
quote: You spin my bottom-right round, baby.

examples:
  - name: Origin
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="small-100%" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-if="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="small-100%${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="small-100%${data.utilitiesString && ' ' + data.utilitiesString}">
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
          <XyzTransition xyz="small-100%${data.utilitiesString && ' ' + data.utilitiesString}">
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
    defaults: [origin-top-right]
  variables: true
  groups:
    - name: Origin
      types: [origin]

---

If you want to animate an element like a swinging door, or have it expand from a particular corner, use an origin utility to apply a [transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) during the animation. This should be used along with a rotate or scale animation.

For example setting `xyz="small-100% origin-right"` on an element will scale it to its right center edge.

If you want to place the `transform-origin` in a more precise location than the utilities provide, override `--xyz-origin` with a custom value in your CSS or with inline styling for more granular control. For example `--xyz-origin: 50px 50px` will set the origin to a point 50px down and to the right from the top left.

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
        <th scope="row">Origin</th>
        <td>--xyz-origin</td>
        <td>--xyz-in-origin</td>
        <td>--xyz-out-origin</td>
        <td>--xyz-appear-origin</td>
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
        <th scope="row">Origin</th>
        <td>--xyz-origin-default</td>
        <td>center</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
