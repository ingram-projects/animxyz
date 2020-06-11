---
title: Variables

examples:
  - name: variables
    title: Variables
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

modifiers:
  utilities:
    hide: true
  groups:
    - name: timing
      title: Timing
      types: [ease, duration, delay, stagger]
    - name: transform
      title: Transform
      types: [fade, origin, translate, rotate, scale]
---

This is the variables section
