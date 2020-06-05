---
order: 5

title: Scale

examples:
  - name: Scale
    template: |
      <div class="square" v-xyz="['fade', data.toggledUtilities]"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.toggledUtilities}"></div>

utilities:
  names: [small, big, narrow, wide, short, tall, thin, thick]
  multiple: false
  default: small
---

This is the rotate section
