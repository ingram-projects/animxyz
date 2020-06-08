---
title: Translate

examples:
  - name: Translate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.utilities}"></div>

utilities:
  names: [right, left, down, up, front, back]
  multiple: false
  default: right

variables: [translate-x, translate-y, translate-z]
---

This is the translate section
