---
title: Composition

examples:
  - name: composition
    title: Composition
    template: |
      <xyz-transition-group tag="div" class="square-group" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="${data.modifiers.utilities}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

modifiers:
  utilities:
    multiple: true
    default: fade
  variables:
    hide: true
  groups:
    - name: timing
      title: Timing
      types: [ease, duration, delay, stagger]
    - name: transform
      title: Transform
      types: [fade, origin, translate, rotate, scale]
---

This is the composition section
