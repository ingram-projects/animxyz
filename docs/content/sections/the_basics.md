---
title: The Basics
quote: Time to learn your XYZ's

examples:
  - name: The Basics
    template: |
      <xyz-transition xyz="fade" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade"></div>
---

The basics section
