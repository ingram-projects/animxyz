---
title: Variables
id: variables
quote: '--xyz-gigawatts: 1.21'

examples:
  - name: Variables
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz :style="data.variables" v-on="data.listeners">
          <div class="item-group xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="item-group" xyz>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
            <div class="square ${data.mode}"></div>
          </div>

          ${data.variablesString && `
          <style>
            .item-group { ${data.variablesString} }
          </style>
          `}
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="item-group" xyz>
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}"></div>
            <div class="square" v-if="${data.toggled}"></div>
          </XyzTransitionGroup>

          ${data.variablesString && `
          ##html
          <style>
            .item-group { ${data.variablesString} }
          </style>
          `}
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="item-group" xyz>
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" />}
            {${data.toggled} && <div className="square" />}
          </XyzTransitionGroup>

          ${data.variablesString && `
          ##html
          <style>
            .item-group { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    hide: true
  variables:
    defaults: ['opacity: 0']
  groups:
    - name: Fade
      types: [opacity]
    - name: Translate
      types: [translate]
    - name: Rotate
      types: [rotate]
    - name: Scale
      types: [scale]
    - name: Skew
      types: [skew]
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
    - name: Iterate
      types: [iterate]
    - name: Direction
      types: [direction]
---

To completely customize and create your own animations beyond what the [utilities](#utilities) provide you can set the CSS variables that drive every AnimXYZ animation. For example set the value of `--xyz-translate-x` to `-42%` to animate an element to and from the left by 42% of it's width.

This gives you control over everything you need to animate an element, including transform-origin, duration, stagger delays, and more:

[🐞 vw units](?tab=examples&variables=translate-x:-100vw#variables)  
[🎈 Yoink!](<?tab=examples&variables=stagger:0.2s;translate-y:-350%;scale-x:0;ease:cubic-bezier(0.5,-1.5,0.5,1.5)#variables>)  
[📺 Click.](?tab=examples&variables=duration:0.6s;scale-x:1.25;scale-y:0#variables)  
[🌀 It's gone spiral!](<?tab=examples&variables=rotate-z:1turn;origin:center -200%;duration:2s;scale-x:0;scale-y:0#variables>)  
[💫 Engage.](?tab=examples&variables=rotate-x:90deg;rotate-z:-180deg;origin:-200%;stagger:0.1s;duration:0.75s;perspective:100px;translate-z:100px;translate-y:10vh#variables)  

### Inheritance
CSS variables are inherited by child elements, so any element with an [active class](#active-classes) will animate with its parent's CSS variables unless specifically overridden or using an `xyz` attribute which overrides all AnimXYZ variables.

<div class="variables-table table-wrap shadow-scroll">
  <table class="shadow-scroll-content">
    <thead>
      <tr>
        <th></th>
        <th>Overall</th>
        <th>In</th>
        <th>Out</th>
        <th>Appear</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Keyframes</th>
        <td>--xyz-keyframes</td>
        <td>--xyz-in-keyframes</td>
        <td>--xyz-out-keyframes</td>
        <td>--xyz-appear-keyframes</td>
      </tr>
      <tr>
        <th scope="row">Ease</th>
        <td>--xyz-ease</td>
        <td>--xyz-in-ease</td>
        <td>--xyz-out-ease</td>
        <td>--xyz-appear-ease</td>
      </tr>
      <tr>
        <th scope="row">Duration</th>
        <td>--xyz-duration</td>
        <td>--xyz-in-duration</td>
        <td>--xyz-out-duration</td>
        <td>--xyz-appear-duration</td>
      </tr>
      <tr>
        <th scope="row">Delay</th>
        <td>--xyz-delay</td>
        <td>--xyz-in-delay</td>
        <td>--xyz-out-delay</td>
        <td>--xyz-appear-delay</td>
      </tr>
      <tr>
        <th scope="row">Stagger</th>
        <td>--xyz-stagger</td>
        <td>--xyz-in-stagger</td>
        <td>--xyz-out-stagger</td>
        <td>--xyz-appear-stagger</td>
      </tr>
      <tr>
        <th scope="row">Stagger Reverse</th>
        <td>--xyz-stagger-rev</td>
        <td>--xyz-in-stagger-rev</td>
        <td>--xyz-out-stagger-rev</td>
        <td>--xyz-appear-stagger-rev</td>
      </tr>
      <tr>
        <th scope="row">Iterate</th>
        <td>--xyz-iterate</td>
        <td>--xyz-in-iterate</td>
        <td>--xyz-out-iterate</td>
        <td>--xyz-appear-iterate</td>
      </tr>
      <tr>
        <th scope="row">Origin</th>
        <td>--xyz-origin</td>
        <td>--xyz-in-origin</td>
        <td>--xyz-out-origin</td>
        <td>--xyz-appear-origin</td>
      </tr>
      <tr>
        <th scope="row">Opacity</th>
        <td>--xyz-opacity</td>
        <td>--xyz-in-opacity</td>
        <td>--xyz-out-opacity</td>
        <td>--xyz-appear-opacity</td>
      </tr>
      <tr>
        <th scope="row">Transform</th>
        <td>--xyz-transform</td>
        <td>--xyz-in-transform</td>
        <td>--xyz-out-transform</td>
        <td>--xyz-appear-transform</td>
      </tr>
      <tr>
        <th scope="row">Perspective</th>
        <td>--xyz-perspective</td>
        <td>--xyz-in-perspective</td>
        <td>--xyz-out-perspective</td>
        <td>--xyz-appear-perspective</td>
      </tr>
      <tr>
        <th scope="row">Translate X</th>
        <td>--xyz-translate-x</td>
        <td>--xyz-in-translate-x</td>
        <td>--xyz-out-translate-x</td>
        <td>--xyz-appear-translate-x</td>
      </tr>
      <tr>
        <th scope="row">Translate Y</th>
        <td>--xyz-translate-y</td>
        <td>--xyz-in-translate-y</td>
        <td>--xyz-out-translate-y</td>
        <td>--xyz-appear-translate-y</td>
      </tr>
      <tr>
        <th scope="row">Translate Z</th>
        <td>--xyz-translate-z</td>
        <td>--xyz-in-translate-z</td>
        <td>--xyz-out-translate-z</td>
        <td>--xyz-appear-translate-z</td>
      </tr>
      <tr>
        <th scope="row">Rotate X</th>
        <td>--xyz-rotate-x</td>
        <td>--xyz-in-rotate-x</td>
        <td>--xyz-out-rotate-x</td>
        <td>--xyz-appear-rotate-x</td>
      </tr>
      <tr>
        <th scope="row">Rotate Y</th>
        <td>--xyz-rotate-y</td>
        <td>--xyz-in-rotate-y</td>
        <td>--xyz-out-rotate-y</td>
        <td>--xyz-appear-rotate-y</td>
      </tr>
      <tr>
        <th scope="row">Rotate Z</th>
        <td>--xyz-rotate-z</td>
        <td>--xyz-in-rotate-z</td>
        <td>--xyz-out-rotate-z</td>
        <td>--xyz-appear-rotate-z</td>
      </tr>
      <tr>
        <th scope="row">Scale X</th>
        <td>--xyz-scale-x</td>
        <td>--xyz-in-scale-x</td>
        <td>--xyz-out-scale-x</td>
        <td>--xyz-appear-scale-x</td>
      </tr>
      <tr>
        <th scope="row">Scale Y</th>
        <td>--xyz-scale-y</td>
        <td>--xyz-in-scale-y</td>
        <td>--xyz-out-scale-y</td>
        <td>--xyz-appear-scale-y</td>
      </tr>
      <tr>
        <th scope="row">Scale Z</th>
        <td>--xyz-scale-z</td>
        <td>--xyz-in-scale-z</td>
        <td>--xyz-out-scale-z</td>
        <td>--xyz-appear-scale-z</td>
      </tr>
      <tr>
        <th scope="row">Skew X</th>
        <td>--xyz-skew-x</td>
        <td>--xyz-in-skew-x</td>
        <td>--xyz-out-skew-x</td>
        <td>--xyz-appear-skew-x</td>
      </tr>
      <tr>
        <th scope="row">Skew Y</th>
        <td>--xyz-skew-y</td>
        <td>--xyz-in-skew-y</td>
        <td>--xyz-out-skew-y</td>
        <td>--xyz-appear-skew-y</td>
      </tr>
    </tbody>
  </table>
</div>
