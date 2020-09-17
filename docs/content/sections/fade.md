---
title: Fade
quote: Beam me up Scotty!

examples:
  - name: Fade
    template: |
      <div class="example-wrap">
        <xyz-transition v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
          <div class="square" v-show="data.toggled"></div>
        </xyz-transition>
      </div>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="${data.utilitiesString}"></div>

          ${data.variablesString && `
          <style>
            .square { ${data.variablesString} }
          </style>
          `}

modifiers:
  utilities:
    defaults: [fade]
  groups:
    - name: Fade
      types: [opacity]

---

Fade is one of the most commonly used animations and combines well other animations.

Fade utilities and variables define the starting (.xyz-in) or ending (.xyz-out) opacity of the animating element. Apply `xyz="fade"` to an element to use the default value, or use one of the utilities like `xyz="fade-50"` to fade from and to a predefined value.

You can also override `--xyz-opacity` with a custom value in your CSS or with inline styling for more granular control.

::: note
To change the default fade value you can set `--xyz-opacity-default` in `:root`. For example:

```css
:root {
  --xyz-opacity-default: 0.5;
}
```

See the [defaults](#defaults) section for more information about setting defaults.
:::
