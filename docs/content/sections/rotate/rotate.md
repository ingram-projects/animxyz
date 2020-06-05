---
order: 4

title: Rotate

examples:
  - name: Rotate
    template: |
      <div class="square" v-xyz="['fade', data.xyzUtilities]"></div>
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
