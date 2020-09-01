---
title: Composition
quote: With our powers combined...

examples:
  - name: Composition
    template: |
      <xyz-transition duration="auto" xyz v-on="data.listeners">
        <div class="square-group" v-show="data.toggled">
          <div class="square xyz-nested" v-xyz="data.utilities" :style="data.variables" v-for="index in 3" :key="index"></div>
        </div>
      </xyz-transition>
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
      types: [opacity]
    - name: Translate
      types: [translate]
    - name: Rotate
      types: [rotate]
    - name: Scale
      types: [scale]
    - name: Perspective
      types: [perspective]
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

| Some Examples| |
|-------------------|---------------|
| fade left up small | [Go](?tab=examples&utilities=fade,left,up,small#composition) |
| fade down right | [Go](?tab=examples&utilities=fade,down,right#composition) |

Certain utilities won't work with other utilities if they are both changing the same property. For example `xyz="up down"` will not work because both `up` and `down` are changing the `--xyz-translate-y` variable. Check out the [Modes](#modes) section to learn how to use different utilities for animating in and out.

You can also combine a utility and a custom value on an animation variable. For example `xyz="fade tall" style="--xyz-rotate: 33deg"` will make an element fade, change height, and rotate in and out.
