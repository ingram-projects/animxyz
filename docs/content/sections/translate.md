---
title: Translate

examples:
  - name: Translate
    template: |
      <xyz-transition appear v-xyz="['fade', data.xyzUtilities]" @after-enter="data.toggleExample" @after-leave="data.toggleExample">
        <div class="square" v-if="data.exampleToggled"></div>
      </xyz-transition>
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
