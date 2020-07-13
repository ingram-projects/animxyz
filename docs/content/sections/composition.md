---
title: Composition

examples:
  - name: Composition
    template: |
      <xyz-transition-group tag="div" class="square-group" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-show="data.toggled" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="${data.utilitiesString}">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

modifiers:
  utilities:
    multiple: true
    default: [fade]
  variables:
    hide: true
  groups:
    - name: Fade
      types: [fade]
    - name: Translate
      types: [translate]
    - name: Rotate
      types: [rotate]
    - name: Scale
      types: [scale]
    - name: Origin
      types: [origin]
    - name: Timing
      types: [duration, delay]
    - name: Ease
      types: [ease]
    - name: Stagger
      types: [stagger]
---

Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.
