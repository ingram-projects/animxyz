---
title: Composition
quote: With our powers combined...

examples:
  - name: Composition
    template: |
      <xyz-transition-group tag="div" class="square-group" v-xyz="data.utilities" v-on="data.listeners">
        <div class="square" v-for="index in 3" v-if="data.toggled" :key="index"></div>
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
    defaults: [fade]
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

AnimXYZ has the unique ability to mix and match animation utilities, letting you compose an enormous variety of animations without any extra code. For example `xyz="left up small"` will make an element move to and from the upper left while expanding in and contracting out. Spin an element while collapsing it to a sliver, expand an element while it swings in from its corner, the possibilites are endless!

Certain utilities won't work with other utilities if they are both changing the same property. For example `xyz="up down"` will not work. Check out the [Modes](#modes) section to learn how to use different utilities for animating in and out.