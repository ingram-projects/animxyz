---
title: Stagger
id: stagger
quote: For the nth time!

examples:
  - name: Stagger
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" data-xyz="fade small" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="example-grid xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 8" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="example-grid" data-xyz="fade small${data.utilitiesString && ' ' + data.utilitiesString}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

          ${data.variablesString && `
          <style>
            .example-grid { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="example-grid" data-xyz="fade small${data.utilitiesString && ' ' + data.utilitiesString}">
            <div class="square" v-if="${data.toggled}" v-for="index in 8" :key="index"></div>
          </XyzTransitionGroup>

          ${data.variablesString && `
          ##html
          <style>
            .example-grid { ${data.variablesString} }
          </style>
          `}
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="example-grid" xyz="fade small${data.utilitiesString && ' ' + data.utilitiesString}">
            {${data.toggled} && [...Array(8)].map((_, index) => <div className="square" key={index} />)}
          </XyzTransitionGroup>

          ${data.variablesString && `
          ##html
          <style>
            .example-grid { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [stagger]
  variables: true
  groups:
    - name: Stagger
      types: [stagger]
---

Staggering increases the `animation-delay` for each element in a list so that their animation is triggered one following the other, like dominoes.

AnimXYZ reads each element's position from CSS [`sibling-index()`](#browser-support) where the browser supports it, so any number of elements can stagger. Browsers without it fall back to an `nth-child` ladder that covers the first 20 elements (or last 20 if using `stagger-rev`); beyond that the remaining elements share the first delay.

Either way you can pass your own index to each element with the `--xyz-index` or `--xyz-index-rev` variables — to lift the fallback's 20-element cap, or to change the staggering order in other ways. The value doesn't have to be a whole number, so `--xyz-index-rev: Math.random() * 81` will shuffle the order.

You can also override the `--xyz-stagger` and `--xyz-stagger-rev` variables with a custom time value in your CSS or with inline styling for more granular control.

::: note [Vue,React]
If you are using the provided Vue/React `XyzTransitionGroup` components, AnimXYZ will automatically add the `--xyz-index` and `--xyz-index-rev`for all elements in the group.

Since Vue and React add/remove elements when their enter/exit animations end, staggered elements that are not `position: absolute` may cause the group layout to change as each element enters or exits in order.
:::

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
        <th scope="row">Stagger</th>
        <td>--xyz-stagger</td>
        <td>--xyz-in-stagger</td>
        <td>--xyz-out-stagger</td>
        <td>--xyz-appear-stagger</td>
      </tr>
      <tr>
        <th scope="row">Stagger Reverse</th>
        <td>--xyz-stagger-rev</td>
        <td>--xyz-in-stagger-rev</td>
        <td>--xyz-out-stagger-rev</td>
        <td>--xyz-appear-stagger-rev</td>
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
        <th scope="row">Stagger</th>
        <td>--xyz-stagger-default</td>
        <td>0.3s</td>
      </tr>
    </tbody>
  </table>
</div>

See the [defaults](#defaults) section to learn more.
