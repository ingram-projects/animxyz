---
title: Nesting
quote: It's <turtles> all the way down.

examples:
  - name: Simple
    template: |
      <xyz-transition duration="auto" xyz="fade small" v-on="data.listeners">
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
      <xyz-transition duration="auto" xyz="fade small" v-on="data.listeners">
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
      <xyz-transition-group tag="div" duration="auto" class="square-group" xyz="fade small stagger" v-on="data.listeners">
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

Elements with an `.xyz-nested` class will trigger an AnimXYZ animation whenever a parent element has an active AnimXYZ class such as `.xyz-in`. It will use the nearest parent element's AnimXYZ properties or any properties set on the `.xyz-nested` element itself.

For example any child element can animate the same as their parent without needing to declare identical AnimXYZ properties on each: [Simple Example](?tab=examples&example=Simple#nesting)

Or the parent just dictates the triggering of the animations while each `.xyz-nested` element has its own unique animations: [Complex Example](?tab=examples&example=Complex#nesting)