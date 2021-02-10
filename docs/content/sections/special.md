---
title: Special
id: special
quote: 

examples:
  - name: xyz-none
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small-100%" v-on="data.listeners">
          <div class="example-grid example-grid-2 xyz-none" v-if="data.toggled">
            <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="example-wrap">
            <div xyz="fade small-100%">
              <div class="example-grid example-grid-2 xyz-none ${data.mode}">
                <div class="square xyz-nested"></div>
                <div class="square xyz-nested"></div>
                <div class="square xyz-nested"></div>
                <div class="square xyz-nested"></div>
              </div>
            </div>
          </div>
      - name: Vue
        content: |
          ##vue
          <div class="example-wrap">
            <XyzTransition duration="auto" xyz="fade small-100%">
              <div class="example-grid example-grid-2 xyz-none" v-if="${data.toggled}">
                <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
              </div>
            </XyzTransition>
          </div>
      - name: React
        content: |
          ##jsx
          <div class="example-wrap">
            <XyzTransition duration="auto" xyz="fade small-100%">
              <div class="example-grid example-grid-2 xyz-none">
                {${data.toggled} && [...Array(4)].map((_, index) => <div className="square xyz-nested" key={index} />)}
              </div>
            </XyzTransition>
          </div>
  - name: xyz-absolute
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small-100%" v-on="data.listeners">
          <div class="example-grid example-grid-2 xyz-none" v-if="data.toggled">
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

All the following classes and variables also have **in**, **out**, and **appear** versions as well.
### xyz-none
The `xyz-none` class will turn off animations for the element it is on. This is useful when you are using `xyz-nested` and don't want the parent element which is setting the `xyz` attribute and trigger classes to animate. [See how it works](?tab=examples&example=xyz-none#special)

### xyz-none-all
The `xyz-none-all` class will turn off AnimXYZ animations for the element it is on and all nested elements. This is useful if you want to provide your users with a control to disable all animations on your site for example.

### xyz-absolute
The `xyz-absolute` class will apply `position: absolute;` to the element it is on while an AnimXYZ animation is active on that element.

### xyz-paused
The `xyz-paused` class will pause any AnimXYZ animations on an element it is on. This is useful when combined with the `--xyz-start-offset` variable to allow precise control of animation playback state.

### xyz-paused-all
The `xyz-paused-all` class will pause any AnimXYZ animations on an element it is on as well as any AnimXYz animations on nested elements.