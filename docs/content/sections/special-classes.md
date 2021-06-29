---
title: Special Classes
id: special-classes
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
          <div className="example-wrap">
            <XyzTransition duration="auto" xyz="fade small-100%">
              <div class="example-grid example-grid-2 xyz-none">
                {${data.toggled} && [...Array(4)].map((_, index) => <div className="square xyz-nested" key={index} />)}
              </div>
            </XyzTransition>
          </div>
  - name: xyz-absolute
    template: |
      <div class="example-wrap">
        <XyzTransition v-on="data.listeners">
          <div class="square xyz-absolute" xyz="fade up-100%" v-if="data.toggled" key="1"></div>
          <div class="square xyz-absolute" xyz="fade down-100%" v-if="!data.toggled" key="2"></div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="example-wrap">
            <div class="square xyz-absolute ${data.toggled ? 'xyz-in' : 'xyz-out'}" xyz="fade up-100%"></div>
            <div class="square xyz-absolute ${data.toggled ? 'xyz-out' : 'xyz-in'}" xyz="fade down-100%"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <div class="example-wrap">
            <XyzTransition>
              <div class="square xyz-absolute" xyz="fade up-100%" v-if="${data.toggled}" key="1"></div>
              <div class="square xyz-absolute" xyz="fade down-100%" v-if="${!data.toggled}" key="2"></div>
            </XyzTransition>
          </div>
      - name: React
        content: |
          ##jsx
          <div className="example-wrap">
            <XyzTransition>
              {${data.toggled} && (
                <div className="square xyz-absolute" xyz="fade up-100%" key="1"></div>
              )}
              {${!data.toggled} && (
                <div className="square xyz-absolute" xyz="fade down-100%" key="2"></div>
              )}
            </XyzTransition>
          </div>
  - name: xyz-paused
    component: SpecialClasses_Paused
    code:
      - name: HTML
        content: |
          ##html
          <div class="example-wrap">
            <div class="square xyz-absolute ${data.toggled ? 'xyz-in' : 'xyz-out'}" xyz="fade up-100%"></div>
            <div class="square xyz-absolute ${data.toggled ? 'xyz-out' : 'xyz-in'}" xyz="fade down-100%"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <div class="example-wrap">
            <XyzTransition>
              <div class="square xyz-absolute" xyz="fade up-100%" v-if="${data.toggled}" key="1"></div>
              <div class="square xyz-absolute" xyz="fade down-100%" v-if="${!data.toggled}" key="2"></div>
            </XyzTransition>
          </div>
      - name: React
        content: |
          ##jsx
          <div className="example-wrap">
            <XyzTransition>
              {${data.toggled} && (
                <div className="square xyz-absolute" xyz="fade up-100%" key="1"></div>
              )}
              {${!data.toggled} && (
                <div className="square xyz-absolute" xyz="fade down-100%" key="2"></div>
              )}
            </XyzTransition>
          </div>
---

All the following classes have **in**, **out**, and **appear** variants as well.
### xyz-none
The `xyz-none` class will turn off animations for the element it is on. This is useful when you are using `xyz-nested` and don't want the parent element which is setting the `xyz` attribute and trigger classes to animate. [See how it works](?tab=examples&example=xyz-none#special-classes)

### xyz-none-all
The `xyz-none-all` class will turn off AnimXYZ animations for the element it is on and all nested elements. This is useful if you want to provide your users with a control to disable all animations on your site for example.

### xyz-absolute
The `xyz-absolute` class will apply `position: absolute;` to the element it is on while an AnimXYZ animation is active on that element. This is useful when switching elements in the same position, or animating elements in a list. [See how it works](?tab=examples&example=xyz-absolute#special-classes)

::: note [Vue]
You can use `xyz-out-absolute` to set `position: absolute` on exiting elements as described in the [Vue transition docs](https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions) for smoothly rearranging lists when items are removed.
:::

### xyz-paused
The `xyz-paused` class will pause any AnimXYZ animations on an element it is on. This is useful when combined with the `--xyz-start-offset` variable to allow precise control of animation playback state.
[See how it works](?tab=examples&example=xyz-paused#special-classes)

::: note [Vue, React]
Due to how Vue and React transition components work, only `xyz-appear` and `xyz-in` animations can be paused during the animation. 
:::

### xyz-paused-all
The `xyz-paused-all` class will pause any AnimXYZ animations on an element it is on as well as any AnimXYZ animations on nested elements.