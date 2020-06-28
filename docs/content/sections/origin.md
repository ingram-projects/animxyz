---
title: Origin
quote: You spin me bottom-right round, baby.

examples:
  - name: Origin
    template: |
      <xyz-transition xyz="fade small-100" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled" :style="data.modifiers.variables"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade small-100 ${data.modifiers.utilities}"></div>

          ${data.modifiers.variables && `
          <style>
            .square { ${data.modifiers.variables} }
          </style>
          `}

modifiers:
  utilities:
    default: origin-top
  groups:
    - name: Origin
      types: [origin]

---

If you want to animate an element like a swinging door, or have it expand from a particular corner, use an origin utility to apply a `transform-origin` during the animation. This should be used along with a rotate or scale animation.

For example setting `xyz="small-100 origin-right"` on an element will scale it to its right center edge.

If you want to place the `transform-origin` in a more precise location than the utilities provide, override `--xyz-origin` with a custom value in your CSS or with inline styling for more granular control. For example `--xyz-origin: 50px 50px` will set the origin to a point 50px down and to the right from the top left.
