---
title: Stagger

examples:
  - name: Stagger
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade small duration-10" v-xyz="data.modifiers.utilities" v-on="data.listeners" :style="data.modifiers.variables">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small duration-10 ${data.modifiers.utilities}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

          ${data.modifiers.variables && `
          <style>
            .square-group { ${data.modifiers.variables} }
          </style>
          `}

modifiers:
  utilities:
    default: stagger
  groups:
    - name: Stagger
      types: [stagger]
---

Staggering the animation of a series of items can add some panache to their entrance and exit. AnimXYZ stagger utilities calculate the `animation-delay` for each item so that their animation is triggered one following the other.

AnimXYZ will apply this staggered delay to the first 20 items (or last 20 if using `stagger-rev`) based on their `nth-child` index. Alternatively you can pass your own index to each item with the `--xyz-index` variable if you want more than 20 items to stagger or want to change the staggering order in other ways.

You can also override the `--xyz-stagger` and `--xyz-stagger-rev` variables with a custom value in your CSS or with inline styling for more granular control.

> If you are using the provided Vue/React `xyzTransitionGroup` components, AnimXYZ will automatically add the `--xyz-index` for all items in the group.