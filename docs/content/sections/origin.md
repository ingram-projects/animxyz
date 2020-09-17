---
title: Origin
quote: You spin my bottom-right round, baby.

examples:
  - name: Origin
    template: |
      <div class="example-wrap">
        <xyz-transition xyz="fade small-100" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade small-100${data.utilitiesString && ' ' + data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [origin-right]
  groups:
    - name: Origin
      types: [origin]

---

If you want to animate an element like a swinging door, or have it expand from a particular corner, use an origin utility to apply a [transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) during the animation. This should be used along with a rotate or scale animation.

For example setting `xyz="small-100 origin-right"` on an element will scale it to its right center edge.

If you want to place the `transform-origin` in a more precise location than the utilities provide, override `--xyz-origin` with a custom value in your CSS or with inline styling for more granular control. For example `--xyz-origin: 50px 50px` will set the origin to a point 50px down and to the right from the top left.

::: note
To change the default origin value you can set `--xyz-origin-default` in `:root`. For example:

```css
:root {
  --xyz-origin-default: top right;
}
```

See the [defaults](#defaults) section for more information about setting defaults.
:::
