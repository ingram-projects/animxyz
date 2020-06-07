---
title: Fade

examples:
  - name: Fade
    template: |
      <xyz-transition v-xyz="data.utilities" @before-enter="data.before" @before-leave="data.before" @after-enter="data.after" @after-leave="data.after">
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
