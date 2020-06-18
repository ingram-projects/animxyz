---
title: Nesting

examples:
  - name: Simple
    template: |
      <xyz-transition xyz="fade small" v-on="data.listeners">
        <div class="square-block" v-show="data.toggled">
          <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
        </div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square-block ${data.mode}" xyz="fade small">
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
          </div>
  - name: Complex
    template: |
      <xyz-transition xyz="fade small" v-on="data.listeners">
        <div class="square-block" v-show="data.toggled">
          <div class="square xyz-nested" xyz="up left turn-cw"></div>
          <div class="square xyz-nested" xyz="up right turn-cw"></div>
          <div class="square xyz-nested" xyz="down left turn-cw"></div>
          <div class="square xyz-nested" xyz="down right turn-cw"></div>
        </div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square-block ${data.mode}" xyz="fade small">
            <div class="square xyz-nested" xyz="up left turn-cw"></div>
            <div class="square xyz-nested" xyz="up right turn-cw"></div>
            <div class="square xyz-nested" xyz="down left turn-cw"></div>
            <div class="square xyz-nested" xyz="down right turn-cw"></div>
          </div>
  - name: Staggered
    template: |
      <xyz-transition-group tag="div" class="square-group" xyz="fade small stagger" :duration="2500" v-on="data.listeners">
        <div class="square-block" v-for="index in 3" v-show="data.toggled" :key="index">
          <div class="square xyz-nested" v-for="subIndex in 4" :key="subIndex"></div>
        </div>
      </xyz-transition-group>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small stagger">
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
          </div>
---

This is the nesting section
