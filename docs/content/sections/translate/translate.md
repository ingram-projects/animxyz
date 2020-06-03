---
order: 4

title: Translate

examples:
  - name: Translate
    template: |
      <div class="square" xyz="fade" v-xyz="xyzClasses"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade {{xyzClasses}}"></div>

utilities:
  names: [left, right, up, down]
  multiple: false
  defaults:
    - left
---

This is the translate section
