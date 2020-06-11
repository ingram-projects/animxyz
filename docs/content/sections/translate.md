---
title: Translate

examples:
  - name: translate
    title: Translate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade ${data.modifiers.utilities}"></div>

modifiers:
  defaultUtilities: right
  groups:
    - name: translate
      title: Translate
      types: [translate]
---

This is the translate section
