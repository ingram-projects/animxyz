---
title: Rotate

examples:
  - name: Rotate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.xyzUtilities" @after-enter="data.toggleExample" @after-leave="data.toggleExample">
        <div class="square" v-if="data.exampleToggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.xyzUtilities}"></div>

utilities:
  names: [flip-up, flip-down, flip-left, flip-right, turn-cw, turn-ccw]
  multiple: false
  default: flip-up

variables: [rotate-x, rotate-y, rotate-z]
---

This is the rotate section
