---
order: 3

title: Fade

examples:
  - name: Fade
    template: |
      <div class="square" v-xyz="data.toggledUtilities"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="${data.toggledUtilities}"></div>

utilities:
  names: [fade]
  multiple: false
  default: fade
---

This is the fade section
