---
title: Scale

examples:
  - name: Scale
    template: |
      <xyz-transition xyz="fade" v-xyz="data.utilities" @before-enter="data.before" @before-leave="data.before" @after-enter="data.after" @after-leave="data.after">
        <div class="square" v-if="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="fade ${data.utilities}"></div>

utilities:
  names: [small, big, narrow, wide, short, tall, thin, thick]
  multiple: false
  default: small

variables: [scale-x, scale-y, scale-z]
---

This is the scale section
