---
title: Stagger

examples:
  - name: stagger
    Title: Stagger
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade small" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small ${data.modifiers.utilities}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

modifiers:
  defaultUtilities: stagger
  groups:
    - name: stagger
      title: Stagger
      types: [stagger]
---

This is the stagger section
