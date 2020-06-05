---
order: 4

title: Rotate

examples:
  - name: Rotate
    template: |
      <div class="square" v-xyz="['fade', data.toggledUtilities]"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.toggledUtilities}"></div>

utilities:
  names: [flip-up, flip-down, flip-left, flip-right, turn-cw, turn-ccw]
  multiple: false
  default: flip-up
---

This is the rotate section
