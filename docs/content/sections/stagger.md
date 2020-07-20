---
title: Stagger
quote: For the nth time!

examples:
  - name: Stagger
    template: |
      <xyz-transition duration="auto" xyz v-on="data.listeners">
        <div class="square-group" v-show="data.toggled">
          <div class="square xyz-nested" xyz="fade small" v-xyz="data.utilities" :style="data.variables" v-for="index in 3" :key="index"></div>
        </div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small${data.utilitiesString && ' ' + data.utilitiesString}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

          ${data.variablesString && `
          <style>
            .square-group { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [stagger]
  groups:
    - name: Stagger
      types: [stagger]
---

Staggering the animation of a list of elements can add some panache to their entrance and exit. AnimXYZ stagger utilities calculate the `animation-delay` for each element so that their animation is triggered one following the other.

AnimXYZ will apply this staggered delay to the first 20 elements (or last 20 if using `stagger-rev`) based on their `nth-child` index. Alternatively you can pass your own index to each element with the `--xyz-index` or `--xyz-index-rev` variables if you want more than 20 elements to stagger or want to change the staggering order in other ways.

You can also override the `--xyz-stagger` and `--xyz-stagger-rev` variables with a custom time value in your CSS or with inline styling for more granular control.

> If you are using the provided Vue/React `XyzTransitionGroup` components, AnimXYZ will automatically add the `--xyz-index` and `--xyz-index-rev`for all elements in the group.
>
> Since Vue and React add/remove elements when their enter/exit animations end, staggered elements that are not `position: absolute` may cause the group layout to change as each element enters or exits in order.
