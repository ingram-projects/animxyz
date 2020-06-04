---
order: 2

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
  classes: [fade]
  multiple: false
  default: fade-50
---

This is the fade section
