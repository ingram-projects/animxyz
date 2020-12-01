---
title: Timing
id: timing
quote: How did it get so late so soon?

examples:
  - name: Timing
    template: |
      <div class="example-wrap">
        <XyzTransition xyz="fade rotate-right-50" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square ${data.mode}" xyz="fade rotate-right-50${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade rotate-right-50${data.utilitiesString && ' ' + data.utilitiesString}">
            <div class="square" v-show="${data.toggled}"></div>
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
          <XyzTransition xyz="fade rotate-right-50${data.utilitiesString && ' ' + data.utilitiesString}">
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
    defaults: [duration-20]
  variables: true
  groups:
    - name: Timing
      types: [duration, delay]
    - name: Ease
      types: [ease]

---

Timing utilities let you set the [animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration), [animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay), and [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) of an animation. AnimXYZ animations default to a duration of `0.5s`, a delay of `0s`, and a timing-function of `ease`.

Changing the timing of an animation can have a large impact on how it feels. For example `xyz="ease-out-back"` will add a slight overshoot at the end of an animation.

You can set your own custom duration, delay, and timing function using the `--xyz-duration`, `--xyz-delay`, and `--xyz-ease` variables respectively.

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
        <th>Move</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Ease</th>
        <td>--xyz-ease</td>
        <td>--xyz-in-ease</td>
        <td>--xyz-out-ease</td>
        <td>--xyz-appear-ease</td>
        <td>--xyz-move-ease</td>
      </tr>
      <tr>
        <th scope="row">Duration</th>
        <td>--xyz-duration</td>
        <td>--xyz-in-duration</td>
        <td>--xyz-out-duration</td>
        <td>--xyz-appear-duration</td>
        <td>--xyz-move-duration</td>
      </tr>
      <tr>
        <th scope="row">Delay</th>
        <td>--xyz-delay</td>
        <td>--xyz-in-delay</td>
        <td>--xyz-out-delay</td>
        <td>--xyz-appear-delay</td>
        <td>--xyz-move-delay</td>
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
        <th scope="row">Ease</th>
        <td>--xyz-ease-default</td>
        <td>ease</td>
      </tr>
      <tr>
        <th scope="row">Duration</th>
        <td>--xyz-duration-default</td>
        <td>0.5s</td>
      </tr>
      <tr>
        <th scope="row">Delay</th>
        <td>--xyz-delay-default</td>
        <td>0s</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
