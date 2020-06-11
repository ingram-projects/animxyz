---
title: Scale

examples:
  - name: scale
    title: Scale
    template: |
      <xyz-transition xyz="fade" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.modifiers.utilities}"></div>

modifiers:
  defaultUtilities: small
  groups:
    - name: scale
      title: Scale
      types: [scale]
---

This is the scale section
