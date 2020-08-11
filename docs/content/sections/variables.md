---
title: Variables
quote: '--xyz-gigawatts: 1.21'

examples:
  - name: Variables
    template: |
      <xyz-transition duration="auto" xyz v-on="data.listeners">
        <div class="square-group" v-show="data.toggled">
          <div class="square xyz-nested" v-xyz="data.utilities" :style="data.variables" v-for="index in 3" :key="index"></div>
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
      - name: fade
        value: '0'
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

Don't be limited to just the animation tokens we provide, override the CSS variables that drive AnimXYZ to customize and create your own unique transforms.

[Try it out](?group=Translate&variables=translate-y:100vh,rotate-z:33deg#variables_sandbox)

| Variable          | Default Value |
|-------------------|---------------|
| --xyz-fade        | 1             |
| --xyz-translate-x | 0             |
