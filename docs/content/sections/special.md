---
title: Special
id: special
quote: 

examples:
  - name: xyz-none
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small-100%" v-on="data.listeners">
          <div class="item-grid item-grid-2 xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
      - name: Vue
        content: |
          ##vue
      - name: React
        content: |
          ##jsx
  - name: xyz-absolute
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small-100%" v-on="data.listeners">
          <div class="item-grid item-grid-2 xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
      - name: Vue
        content: |
          ##vue
      - name: React
        content: |
          ##jsx
---

### xyz-none
The `xyz-none` class will turn off all animations for the element it is on. This is useful when you are using `xyz-nested` and don't want the parent element which is setting the `xyz` attribute and trigger classes to animate. [See how it works](?tab=examples&example=xyz-none#special)
