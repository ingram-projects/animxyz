---
title: Scale

examples:
  - name: Scale
    template: |
      <xyz-transition appear v-xyz="['fade', data.xyzUtilities]" @after-enter="data.toggleExample" @after-leave="data.toggleExample">
        <div class="square" v-if="data.exampleToggled"></div>
      </xyz-transition>
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
