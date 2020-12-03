---
title: Nesting
id: nesting
quote: It's <turtles> all the way down.

examples:
  - name: Basic
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-block" v-show="data.toggled">
            <div class="square xyz-nested" v-for="index in 4" :key="index"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-block ${data.mode}" xyz="fade small">
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
            <div class="square xyz-nested"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition xyz="fade small" duration="auto">
            <div class="square-block" v-show="${data.toggled}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition xyz="fade small" timeout="auto">
            {${data.toggled} && (
              <div className="square-block">
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
              </div>
            )}
          </XyzTransition>
  - name: Complex
    template: |
      <div class="example-wrap">
        <XyzTransition duration="auto" xyz="fade small" v-on="data.listeners">
          <div class="square-block" v-show="data.toggled">
            <div class="square xyz-nested" xyz="up left rotate-right"></div>
            <div class="square xyz-nested" xyz="up right rotate-right"></div>
            <div class="square xyz-nested" xyz="down left rotate-right"></div>
            <div class="square xyz-nested" xyz="down right rotate-right"></div>
          </div>
        </XyzTransition>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-block ${data.mode}" xyz="fade small">
            <div class="square xyz-nested" xyz="up left rotate-right"></div>
            <div class="square xyz-nested" xyz="up right rotate-right"></div>
            <div class="square xyz-nested" xyz="down left rotate-right"></div>
            <div class="square xyz-nested" xyz="down right rotate-right"></div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition duration="auto" xyz="fade small">
            <div class="square-block" v-show="${data.toggled}">
              <div class="square xyz-nested" xyz="up left rotate-right"></div>
              <div class="square xyz-nested" xyz="up right rotate-right"></div>
              <div class="square xyz-nested" xyz="down left rotate-right"></div>
              <div class="square xyz-nested" xyz="down right rotate-right"></div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition timeout="auto" xyz="fade small">
            {${data.toggled} && (
              <div className="square-block">
                <div className="square xyz-nested" xyz="up left rotate-right" />
                <div className="square xyz-nested" xyz="up right rotate-right" />
                <div className="square xyz-nested" xyz="down left rotate-right" />
                <div className="square xyz-nested" xyz="down right rotate-right" />
              </div>
            )}
          </XyzTransition>
  - name: Staggered
    template: |
      <div class="example-wrap">
        <XyzTransitionGroup duration="auto" class="square-group" xyz="fade small stagger" v-on="data.listeners">
          <div class="square-block" v-for="index in 3" v-show="data.toggled" :key="index">
            <div class="square xyz-nested" v-for="subIndex in 4" :key="subIndex"></div>
          </div>
        </XyzTransitionGroup>
      </div>
    code:
      - name: HTML
        content: |
          ##html
          <div class="square-group" xyz="fade small stagger">
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block ${data.mode}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup class="square-group" duration="auto" xyz="fade small stagger">
            <div class="square-block" v-show="${data.toggled}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block" v-show="${data.toggled}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
            <div class="square-block" v-show="${data.toggled}">
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
              <div class="square xyz-nested"></div>
            </div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup className="square-group" timeout="auto" xyz="fade small stagger">
            {${data.toggled} && (
              <div className="square-block">
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
              </div>
            )}
            {${data.toggled} && (
              <div className="square-block">
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
              </div>
            )}
            {${data.toggled} && (
              <div className="square-block">
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
                <div className="square xyz-nested" />
              </div>
            )}
          </XyzTransitionGroup>
---

When dynamically applying AnimXYZ [active classes](#active-classes) with a JavaScript framework or the AnimXYZ [Vue](#vue-integration) and [React](#react-integration) components, it's common to want child elements to animate in sync with the element you are controlling without having to apply the same class logic to each child.

Elements with an `.xyz-nested` class trigger their animations when a parent element has an XYZ [active class](#active-classes) such as `.xyz-in` or `.xyz-out`. [See example](?tab=examples&example=Basic#nesting)

Each `.xyz-nested` element can have its own unique XYZ properties. [See example](?tab=examples&example=Complex#nesting)

If a parent element has an `xyz="stagger"`, then the `.xyz-nested` elements will animate once the parent animation begins. [See example](?tab=examples&example=Staggered#nesting)
