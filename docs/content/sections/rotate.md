---
title: Rotate

examples:
  - name: Rotate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.utilities}"></div>

utilities:
  names: [flip-up, flip-down, flip-left, flip-right, turn-cw, turn-ccw]
  default: flip-up

variables:
  names: [rotate-x, rotate-y, rotate-z]
---

This is the rotate section
