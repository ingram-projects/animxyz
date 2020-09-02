---
title: Variables
quote: '--xyz-gigawatts: 1.21'

examples:
  - name: Variables
    template: |
      <xyz-transition duration="auto" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
        <div class="square-group xyz-none" v-show="data.toggled">
          <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
        </div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square-group">
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

          ${data.variablesString && `
          <style>
            .square-group { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    hide: true
  variables:
    defaults:
      - name: opacity
        value: '0'
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

You aren't limited to just the animation tokens we provide, override the CSS variables that drive AnimXYZ to customize and create your own unique transforms. For example set the value of `--xyz-translate-x` to `-42%` to animate an element to and from the left by 42% of it's width. [--xyz-translate-x: -42%](?tab=examples&group=Translate&variables=translate-x:-42%#variables)

You have control over everything, even transform origin, duration, or stagger timing.
[Try it out](?tab=examples&group=Origin&variables=origin:75%,rotate-z:90deg,rotate-x:90deg#variables) [Spin freely](?tab=examples&variables=translate-y:-100vh,translate-x:-100vh,rotate-x:90deg,rotate-z:-360deg,origin:-200%,stagger:.1s,duration:1s#variables)
