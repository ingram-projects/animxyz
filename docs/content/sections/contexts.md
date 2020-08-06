---
title: Contexts
quote: TBD

examples:
  - name: Simple
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
  - name: Override
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
---

Unlike classes, the `xyz` attribute doesn't just apply to the element it's on, it also defines the animation for all descendant elements with an AnimXYZ active class. This can be very useful when applying the same animation to lists or groups of elements with the flexibility of utility classes without having to add them to each element.

To have a child element animate differently than it's parent context, add an `xyz` attribute to the child to override it. This new XYZ context resets all utilities and variables.

If you want to only override some of the parent context, add `inherit` along with the new `xyz` values.
