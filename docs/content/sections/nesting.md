---
title: Nesting
quote: It's <turtles> all the way down.

examples:
  - name: Simple
    template: |
      <div class="example-wrap">
        <xyz-transition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-block" v-show="data.toggled">
            <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
          </div>
        </xyz-transition>
      </div>
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
      <div class="example-wrap">
        <xyz-transition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-block" v-show="data.toggled">
            <div class="square xyz-nested" xyz="up left turn-cw"></div>
            <div class="square xyz-nested" xyz="up right turn-cw"></div>
            <div class="square xyz-nested" xyz="down left turn-cw"></div>
            <div class="square xyz-nested" xyz="down right turn-cw"></div>
          </div>
        </xyz-transition>
      </div>
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
      <div class="example-wrap">
        <xyz-transition-group tag="div" duration="auto" class="square-group" xyz="fade small stagger" v-on="data.listeners">
          <div class="square-block" v-for="index in 3" v-show="data.toggled" :key="index">
            <div class="square xyz-nested" v-for="subIndex in 4" :key="subIndex"></div>
          </div>
        </xyz-transition-group>
      </div>
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

Elements with an `.xyz-nested` class will inherit the active [XYZ mode](/modes) of the nearest parent with an XYZ trigger class such as `.xyz-in` and `.xyz-out`: [Simple Example](?tab=examples&example=Simple#nesting)

Each `.xyz-nested` element can have its own unique XYZ properties: [Complex Example](?tab=examples&example=Complex#nesting)

If a parent element has an `xyz="stagger"`, then the `.xyz-nested` elements will animate once the parent animation begins: [Staggered Example](?tab=examples&example=Staggered#nesting)
