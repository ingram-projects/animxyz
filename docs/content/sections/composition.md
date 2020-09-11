---
title: Composition
quote: With our powers combined...

examples:
  - name: Composition
    template: |
      <div class="example-wrap">
        <xyz-transition duration="auto" v-xyz="data.utilities" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
          </div>
        </xyz-transition>
      </div>
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

AnimXYZ has the unique ability to mix and match animation utilities, letting you compose an enormous variety of animations without any extra code. For example `xyz="left up small"` will make an element move to and from the upper left while expanding in and contracting out. Spin an element while collapsing it to a sliver, expand an element while it swings in from its corner, the possibilites are endless! Here are some examples:

[😐 fade up](?tab=examples&utilities=fade,up#composition){.link--large}
[🙂 fade flip-up flip-left](?tab=examples&utilities=fade,flip-up,flip-left#composition){.link--large}
[😀 fade down-5 turn-cw-50 stagger](?tab=examples&utilities=fade,down-5,turn-cw-50,stagger#composition){.link--large}
[😃 fade front-5 flip-down-50 duration-10 stagger-5](?tab=examples&utilities=fade,front-5,flip-down-50,duration-10,stagger-5#composition){.link--large}
[🤪 fade up-100 flip-down flip-right-50 turn-ccw-100 origin-bottom duration-10 stagger](?tab=examples&utilities=fade,up-100,flip-down,flip-right-50,turn-ccw-100,origin-bottom,duration-10,stagger#composition){.link--large}

Certain utilities won't work with other utilities if they are both changing the same property. For example `xyz="up down"` will not work because both `up` and `down` are changing the `--xyz-translate-y` variable. Check out the [active classes](#active-classes) section to learn how to use different utilities for animating in and out.

You can also combine a utility and a custom value on an animation variable. For example `xyz="fade tall" style="--xyz-rotate: 33deg"` will make an element fade, change height, and rotate in and out.
