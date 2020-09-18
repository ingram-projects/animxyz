---
title: Contexts
quote: The div doesn't fall far from the tree.

examples:
  - name: Simple
    template: |
      <div class="example-wrap">
        <div class="example-wrap">
          <xyz-transition duration="auto" xyz="fade turn-cw" v-on="data.listeners">
            <div class="square-group xyz-none" v-show="data.toggled">
              <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
            </div>
          </xyz-transition>
        </div>
      </div>
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
      <div class="example-wrap">
        <xyz-transition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" :key="1"></div>
            <div class="square xyz-nested" xyz="fade big" :key="2"></div>
            <div class="square xyz-nested" :key="3"></div>
          </div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade small">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}" xyz="fade big"></div>
            <div class="square ${data.mode}"></div>
          </div>
  - name: Inherit
    template: |
      <div class="example-wrap">
        <xyz-transition duration="auto" xyz="fade up turn-cw duration-10 ease-out-back stagger" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" :key="1"></div>
            <div class="square xyz-nested" xyz="inherit turn-cw-0 turn-ccw" :key="2"></div>
            <div class="square xyz-nested" :key="3"></div>
          </div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square-group" xyz="fade up turn-cw duration-10 ease-out-back stagger">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}" xyz="inherit turn-cw-0 turn-ccw"></div>
            <div class="square ${data.mode}"></div>
          </div>
---

The `xyz` attribute creates an animation context where any AnimXYZ animations that take place within will use the animation variables it sets. This can be very useful when applying the same animation to lists or groups of elements without having to add them to each element. [Simple Example](?tab=examples&example=Simple#contexts)

To have a child element animate differently than it's parent context, add an `xyz` attribute to the child to override it. This new XYZ context resets all utilities and variables. [Override Example](?tab=examples&example=Override#contexts)

If you want to only override some of the parent context, add `inherit` along with the new `xyz` values. [Inherit Example](?tab=examples&example=Inherit#contexts)
