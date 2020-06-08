---
title: Stagger

examples:
  - name: Stagger
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade small" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small ${data.utilities}">
            <div class="square xyz-in"></div>
            <div class="square xyz-in"></div>
            <div class="square xyz-in"></div>
          </div>

utilities:
  names: [stagger, stagger-rev]
  multiple: false
  default: stagger

variables: [stagger, stagger-rev]
---

This is the stagger section
