---
title: Fade

examples:
  - name: Fade
    template: |
      <xyz-transition v-xyz="data.xyzUtilities" @after-enter="data.toggleExample" @after-leave="data.toggleExample">
        <div class="square" v-if="data.exampleToggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square xyz-in" xyz="${data.xyzUtilities}"></div>

utilities:
  names: [fade]
  multiple: false
  default: fade

variables: [fade]
---

This is the fade section
