---
title: Contexts

examples:
  - name: Single
    template: |
      <xyz-transition xyz="fade down" v-on="data.listeners">
        <div class="square" v-show="data.toggled" ></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade down"></div>
  - name: Multiple
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade turn-cw" v-on="data.listeners">
        <div class="square" v-show="data.toggled" v-for="index in 3" :key="index"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade turn-cw">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>
  - name: Nested
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade small" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :key="1"></div>
        <div class="square" xyz="fade big" v-show="data.toggled" :key="2"></div>
        <div class="square" v-show="data.toggled" :key="3"></div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}" xyz="fade big"></div>
            <div class="square ${data.mode}"></div>
          </div>

modifiers:
  utilities:
    hide: true
  variables:
    hide: true
---

AnimXYZ uses its own attribute `xyz` to create a context that defines the animations within it. Unlike a class, an `xyz` context applies not only to the element it's on, but also all its child/descendant elements as well. This allows for a lot of flexibility without redundancy.

If you want a child element to animate differently than it's parent context, simply create a new `xyz` context on the child which will override the parent context.
