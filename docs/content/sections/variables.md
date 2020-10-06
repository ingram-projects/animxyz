---
title: Variables
quote: '--xyz-gigawatts: 1.21'

examples:
  - name: Variables
    template: |
      <div class="example-wrap">
        <xyz-transition duration="auto" xyz :style="data.variables" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
          </div>
        </xyz-transition>
      </div>
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

You aren't limited to just the composable utilities we provide, override the CSS variables that drive AnimXYZ to customize and create your own unique animations. For example set the value of `--xyz-translate-x` to `-42%` to animate an element to and from the left by 42% of it's width. [--xyz-translate-x: -42%](?tab=examples&group=Translate&variables=translate-x:-42%#variables)

You have control over everything you need to animate an element, even transform origin, duration, or staggering.
[Try it out](?tab=examples&group=Origin&variables=origin:75%,rotate-z:90deg,rotate-x:90deg#variables) [Spin freely](?tab=examples&variables=translate-y:80vh,translate-x:-100vh,rotate-x:90deg,rotate-z:-360deg,origin:-200%,stagger:.1s,duration:1s#variables)

Keep in mind that CSS variables are inherited by child elements, so any element with an [active class](/active-classes) will animate with its parent's CSS variables unless specifically overridden or using an `xyz` attribute which overrides all AnimXYZ variables.

<div class="table-wrap">
  <table class="variables-table">
    <thead>
      <tr>
        <th></th>
        <th>Overall</th>
        <th>In</th>
        <th>Out</th>
        <th>Appear</th>
        <th>Move</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Keyframes</th>
        <td>--xyz-keyframes</td>
        <td>--xyz-in-keyframes</td>
        <td>--xyz-out-keyframes</td>
        <td>--xyz-appear-keyframes</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Easing</th>
        <td>--xyz-ease</td>
        <td>--xyz-in-ease</td>
        <td>--xyz-out-ease</td>
        <td>--xyz-appear-ease</td>
        <td>--xyz-move-ease</td>
      </tr>
      <tr>
        <th scope="row">Duration</th>
        <td>--xyz-duration</td>
        <td>--xyz-in-duration</td>
        <td>--xyz-out-duration</td>
        <td>--xyz-appear-duration</td>
        <td>--xyz-move-duration</td>
      </tr>
      <tr>
        <th scope="row">Delay</th>
        <td>--xyz-delay</td>
        <td>--xyz-in-delay</td>
        <td>--xyz-out-delay</td>
        <td>--xyz-appear-delay</td>
        <td>--xyz-move-delay</td>
      </tr>
      <tr>
        <th scope="row">Stagger</th>
        <td>--xyz-stagger</td>
        <td>--xyz-in-stagger</td>
        <td>--xyz-out-stagger</td>
        <td>--xyz-appear-stagger</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Stagger Reverse</th>
        <td>--xyz-stagger-rev</td>
        <td>--xyz-in-stagger-rev</td>
        <td>--xyz-out-stagger-rev</td>
        <td>--xyz-appear-stagger-rev</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Iterate</th>
        <td>--xyz-iterate</td>
        <td>--xyz-in-iterate</td>
        <td>--xyz-out-iterate</td>
        <td>--xyz-appear-iterate</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Origin</th>
        <td>--xyz-origin</td>
        <td>--xyz-in-origin</td>
        <td>--xyz-out-origin</td>
        <td>--xyz-appear-origin</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Opacity</th>
        <td>--xyz-opacity</td>
        <td>--xyz-in-opacity</td>
        <td>--xyz-out-opacity</td>
        <td>--xyz-appear-opacity</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Transform</th>
        <td>--xyz-transform</td>
        <td>--xyz-in-transform</td>
        <td>--xyz-out-transform</td>
        <td>--xyz-appear-transform</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Perspective</th>
        <td>--xyz-perspective</td>
        <td>--xyz-in-perspective</td>
        <td>--xyz-out-perspective</td>
        <td>--xyz-appear-perspective</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Translate X</th>
        <td>--xyz-translate-x</td>
        <td>--xyz-in-translate-x</td>
        <td>--xyz-out-translate-x</td>
        <td>--xyz-appear-translate-x</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Translate Y</th>
        <td>--xyz-translate-y</td>
        <td>--xyz-in-translate-y</td>
        <td>--xyz-out-translate-y</td>
        <td>--xyz-appear-translate-y</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Translate Z</th>
        <td>--xyz-translate-z</td>
        <td>--xyz-in-translate-z</td>
        <td>--xyz-out-translate-z</td>
        <td>--xyz-appear-translate-z</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Rotate X</th>
        <td>--xyz-rotate-x</td>
        <td>--xyz-in-rotate-x</td>
        <td>--xyz-out-rotate-x</td>
        <td>--xyz-appear-rotate-x</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Rotate Y</th>
        <td>--xyz-rotate-y</td>
        <td>--xyz-in-rotate-y</td>
        <td>--xyz-out-rotate-y</td>
        <td>--xyz-appear-rotate-y</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Rotate Z</th>
        <td>--xyz-rotate-z</td>
        <td>--xyz-in-rotate-z</td>
        <td>--xyz-out-rotate-z</td>
        <td>--xyz-appear-rotate-z</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Scale X</th>
        <td>--xyz-scale-x</td>
        <td>--xyz-in-scale-x</td>
        <td>--xyz-out-scale-x</td>
        <td>--xyz-appear-scale-x</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Scale Y</th>
        <td>--xyz-scale-y</td>
        <td>--xyz-in-scale-y</td>
        <td>--xyz-out-scale-y</td>
        <td>--xyz-appear-scale-y</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Scale Z</th>
        <td>--xyz-scale-z</td>
        <td>--xyz-in-scale-z</td>
        <td>--xyz-out-scale-z</td>
        <td>--xyz-appear-scale-z</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>