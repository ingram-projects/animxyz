---
title: Rotate

examples:
  - name: Rotate
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" @before-enter="data.before" @before-leave="data.before" @after-enter="data.after" @after-leave="data.after">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.utilities}"></div>

utilities:
  names: [flip-up, flip-down, flip-left, flip-right, turn-cw, turn-ccw]
  multiple: false
  default: flip-up

variables: [rotate-x, rotate-y, rotate-z]
---

This is the rotate section
