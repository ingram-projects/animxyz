---
title: Defaults

examples:
  - name: Root
    template: |
      <div class="example-wrap" style="--xyz-translate-default: 200%; --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275);">
        <xyz-transition v-on="data.listeners">
          <div class="square-group xyz-none" v-show="data.toggled">
            <div class="square xyz-nested" xyz="fade left"></div>
            <div class="square xyz-nested" xyz="fade up"></div>
            <div class="square xyz-nested" xyz="fade down"></div>
          </div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square-group">
            <div class="square ${data.mode}" xyz="fade left"></div>
            <div class="square ${data.mode}" xyz="fade up"></div>
            <div class="square ${data.mode}" xyz="fade down"></div>
          </div>

          <style>
            :root {
              --xyz-translate-default: 200%;
              --xyz-ease-default: cubic-bezier(0.175, 0.885, 0.320, 1.275);
            }
          </style>
---

All AnimXYZ [variables](#variables) are provided with default values that determine what animations our basic `xyz` [utilites](#utilities) such as `fade` or `left` set when not provided a utility level such as `left-3`. Some default values such as for transform are shared across all transform utilities.

You can change these default values by setting their respective variables. To change them across your entire site set them at the `:root`.

You can also change default values on an element, but keep in mind they will apply to all child elements as well.
