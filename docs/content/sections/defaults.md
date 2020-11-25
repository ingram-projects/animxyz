---
title: Defaults
quote: TBD

examples:
  - name: Defaults
    template: |
      <div class="example-wrap" style="--xyz-translate-default: 300%; --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275); --xyz-stagger-default: 0.1s;">
        <XyzTransition duration="auto" xyz="fade stagger" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" xyz="inherit left"></div>
            <div class="square xyz-nested" xyz="inherit up"></div>
            <div class="square xyz-nested" xyz="inherit down"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade stagger">
            <div class="square ${data.mode}" xyz="inherit left"></div>
            <div class="square ${data.mode}" xyz="inherit up"></div>
            <div class="square ${data.mode}" xyz="inherit down"></div>
          </div>

          <style>
            :root {
              --xyz-translate-default: 300%;
              --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275);
              --xyz-stagger-default: 0.1s;
            }
          </style>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup tag="div" class="square-group" xyz="fade stagger">
            <div class="square" v-show="${data.toggled}" xyz="inherit left"></div>
            <div class="square" v-show="${data.toggled}" xyz="inherit up"></div>
            <div class="square" v-show="${data.toggled}" xyz="inherit down"></div>
          </XyzTransitionGroup>

          ##html
          <style>
            :root {
              --xyz-translate-default: 300%;
              --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275);
              --xyz-stagger-default: 0.1s;
            }
          </style>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup tag="div" class="square-group" xyz="fade stagger">
            {${data.toggled} && <div class="square" xyz="inherit left" />}
            {${data.toggled} && <div class="square" xyz="inherit up" />}
            {${data.toggled} && <div class="square" xyz="inherit down" />}
          </XyzTransitionGroup>

          ##html
          <style>
            :root {
              --xyz-translate-default: 300%;
              --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275);
              --xyz-stagger-default: 0.1s;
            }
          </style>
---

All AnimXYZ [variables](#variables) are provided with default values that determine what animations basic `xyz` utilities like `fade` or `left` set when not provided a utility scale such as `left-3`. Some default values are shared across related utilities, for example `--xyz-translate-default` is the default value for X, Y, and Z translations.

You can change these default values by setting their respective variables. To change them across your entire site set them at the `:root`.

You can also change default values on an element, but keep in mind they will apply to all child elements as well.

<div class="variables-table table-wrap shadow-scroll">
  <table class="shadow-scroll-content">
    <thead>
      <tr>
        <th></th>
        <th>Variable</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Ease</th>
        <td>--xyz-ease-default</td>
        <td>ease</td>
      </tr>
      <tr>
        <th scope="row">Duration</th>
        <td>--xyz-duration-default</td>
        <td>0.5s</td>
      </tr>
      <tr>
        <th scope="row">Delay</th>
        <td>--xyz-delay-default</td>
        <td>0s</td>
      </tr>
      <tr>
        <th scope="row">Stagger</th>
        <td>--xyz-stagger-default</td>
        <td>0.3s</td>
      </tr>
      <tr>
        <th scope="row">Iterate</th>
        <td>--xyz-iterate-default</td>
        <td>1</td>
      </tr>
      <tr>
        <th scope="row">Origin</th>
        <td>--xyz-origin-default</td>
        <td>center</td>
      </tr>
      <tr>
        <th scope="row">Opacity</th>
        <td>--xyz-opacity-default</td>
        <td>0</td>
      </tr>
      <tr>
        <th scope="row">Perspective</th>
        <td>--xyz-perspective-default</td>
        <td>0px</td>
      </tr>
      <tr>
        <th scope="row">Translate</th>
        <td>--xyz-translate-default</td>
        <td>30px</td>
      </tr>
      <tr>
        <th scope="row">Rotate</th>
        <td>--xyz-rotate-default</td>
        <td>0.25turn</td>
      </tr>
      <tr>
        <th scope="row">Scale</th>
        <td>--xyz-scale-default</td>
        <td>0.5</td>
      </tr>
      <tr>
        <th scope="row">Skew</th>
        <td>--xyz-skew-default</td>
        <td>30deg</td>
      </tr>
    </tbody>
  </table>
</div>
