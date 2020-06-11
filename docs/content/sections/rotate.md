---
title: Rotate

examples:
  - name: rotate
    title: Rotate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.modifiers.utilities}"></div>

modifiers:
  defaultUtilities: flip-up
  groups:
    - name: rotate
      title: Rotate
      types: [rotate]
---

This is the rotate section
