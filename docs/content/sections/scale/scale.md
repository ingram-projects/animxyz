---
order: 5

title: Scale

examples:
  - name: Scale
    template: |
      <div class="square" v-xyz="['fade', data.xyzUtilities]"></div>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.xyzUtilities}"></div>

utilities:
  names: [small, big, narrow, wide, short, tall, thin, thick]
  multiple: false
  default: small

variables: [scale-x, scale-y, scale-z]
---

This is the scale section
