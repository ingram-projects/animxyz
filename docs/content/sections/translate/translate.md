---
title: Translate

examples:
  - name: Translate
    template: |
      <div class="square" v-xyz="['fade', data.xyzUtilities]"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.xyzUtilities}"></div>

utilities:
  names: [right, left, down, up, front, back]
  multiple: false
  default: right

variables: [translate-x, translate-y, translate-z]
---

This is the translate section
