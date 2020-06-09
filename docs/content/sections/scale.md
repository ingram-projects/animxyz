---
title: Scale

examples:
  - name: Scale
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.utilities}"></div>

utilities:
  names: [small, big, narrow, wide, short, tall, thin, thick]
  multiple: false
  default: small

variables: [scale-x, scale-y, scale-z]
---

This is the scale section
