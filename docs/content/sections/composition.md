---
title: Composition

examples:
  - name: Composition
    template: |
      <xyz-transition-group tag="div" class="square-group" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="${data.utilities}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

utilities:
  all: true
  multiple: true
  default: fade

variables:
  all: true
---

This is the composition section
