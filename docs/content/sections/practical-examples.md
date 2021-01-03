---
title: Practical Examples
id: practical-examples
quote: TBD

examples:
  - name: Modal
    component: PracticalExamples_Modal
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition duration="auto" xyz="fade out-delay-5">
            <div class="modal__overlay" v-if="modalOpen" @click="modalOpen = false">
              <div class="modal xyz-nested" xyz="fade short-100% delay-3 ease-out-back" @click.stop>
                <div class="modal__header xyz-nested" xyz="up-100% in-delay-3">
                  <h1 class="xyz-nested" xyz="fade left in-delay-6">I am a modal</h1>
                  <button xyz="fade small in-delay-7" class="modal__close xyz-nested" @click="modalOpen = false"></button>
                </div>
                <div class="modal__body"></div>
                <div class="modal__footer xyz-nested" xyz="down-100% in-delay-3">
                  <button class="modal__button xyz-nested" xyz="fade in-right in-delay-7" @click="modalOpen = false">Close</button>
                </div>
              </div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition duration="auto" xyz="fade out-delay-5">
            { modalOpen && (
              <div className="modal__overlay" onClick={openModal}>
                <div className="modal xyz-nested" xyz="fade short-100% delay-3 ease-out-back">
                  <div className="modal__header xyz-nested" xyz="up-100% in-delay-3">
                    <h1 className="xyz-nested" xyz="fade left in-delay-6">I am a modal</h1>
                    <button xyz="fade small in-delay-7" className="modal__close xyz-nested" onClick={closeModal}></button>
                  </div>
                  <div className="modal__body"></div>
                  <div className="modal__footer xyz-nested" xyz="down-100% in-delay-3">
                    <button className="modal__button xyz-nested" xyz="fade in-right in-delay-7" onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            )} 
          </XyzTransition>
  - name: Grid
    component: PracticalExamples_Grid
    code:
      - name: Vue
        content: |
          ##vue
          <div></div>
      - name: React
        content: |
          ##jsx
          <div />
  - name: Chat
    component: PracticalExamples_Chat
    code:
      - name: Vue
        content: |
          ##vue
          <div></div>
      - name: React
        content: |
          ##jsx
          <div />
  - name: Page
    component: PracticalExamples_Page
    code:
      - name: HTML
        content: |
          ##html
          <div></div>
      - name: Vue
        content: |
          ##vue
          <div></div>
      - name: React
        content: |
          ##jsx
          <div />
---

Moving squares around is all well and good, but what do you use AnimXYZ for in the real world? Here are some examples of common ways you can use AnimXYZ to make your UI more lively and interesting.

Fading in a modal might seem straightforward, but you can provide a nice staggered effect by adding an `in-delay` to the modal and an `out-delay` to the overlay.
[Modal Example](?tab=examples&example=Modal#practical-examples)

Media galleries can show more clearly which items are being added or removed with a small animation in and out. [Grid Example](?tab=examples&example=Grid#practical-examples)

A chat component feels much more natural if each text moves in from the side of its respective owner. [Chat Example](?tab=examples&example=Chat#practical-examples)

Emphasize what someone should look at first, or give a feature list some life. Animating the initial appearance of elements on a page is easy. [Page Example](?tab=examples&example=Page#practical-examples)