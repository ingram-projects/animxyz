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

AnimXYZ will apply this staggered delay to the first 20 (or last 20 if using `stagger-rev`) based on their `nth-child` position.