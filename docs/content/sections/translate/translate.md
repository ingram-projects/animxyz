---
order: 3

title: Translate

examples:
  - name: Translate
    template: |
      <div class="square" v-xyz="['fade', data.toggledUtilities]"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.toggledUtilities}"></div>

utilities:
  names: [right, left, down, up, front, back]
  multiple: false
  default: left
---

This is the translate section
