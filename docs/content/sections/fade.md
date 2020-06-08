---
title: Fade

examples:
  - name: Fade
    template: |
      <xyz-transition v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="${data.utilities}"></div>

utilities:
  names: [fade]
  multiple: false
  default: fade

variables: [fade]
---

This is the fade section
