---
title: Defaults
quote: TBD

examples:
  - name: Defaults
    template: |
      <div class="example-wrap" style="--xyz-translate-default: 300%; --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275); --xyz-stagger-default: 0.1s;">
        <xyz-transition duration="auto" xyz="fade stagger" v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" xyz="inherit left"></div>
            <div class="square xyz-nested" xyz="inherit up"></div>
            <div class="square xyz-nested" xyz="inherit down"></div>
          </div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
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
---

All AnimXYZ [variables](#variables) are provided with default values that determine what animations basic `xyz` [utilities](#utilities) like `fade` or `left` set when not provided a utility scale such as `left-3`. Some default values are shared across related utilities, for example `--xyz-translate-default` is the default value for X, Y, and Z translations.

You can change these default values by setting their respective variables. To change them across your entire site set them at the `:root`.

You can also change default values on an element, but keep in mind they will apply to all child elements as well.
