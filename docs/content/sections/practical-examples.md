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
          <XyzTransitionGroup appear class="square-grid cat-grid" xyz="fade duration-5 appear-front-3 small-3 appear-small-0 stagger-2 out-stagger-0">
            <div class="square" v-for="index in numCats" :key="index">
              <img class="square-image" :src="\`https://cataas.com/cat?type=sm?id=\${index}\`" alt="Picture of a cat"
              />
            </div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup appear class="square-grid cat-grid" xyz="fade duration-5 appear-front-3 small-3 appear-small-0 stagger-2 out-stagger-0">
            {[...Array(numCats)].map((_, index) => (
              <div class="square" key={index}>
                <img class="square-image" src={\`https://cataas.com/cat?type=sm?id=\${index}\`} alt="Picture of a cat"
                />
              </div>
            ))}
          </XyzTransitionGroup>
  - name: Chat
    component: PracticalExamples_Chat
    code:
      - name: Vue
        content: |
          ##vue
          <div class="example-wrap">
            <XyzTransitionGroup appear tag="ul" class="chat-list" duration="auto">
              <li
                class="chat-item"
                :class="{ 'chat-item--user': chatMessage.isUser }"
                v-for="chatMessage in chatMessages"
                :key="chatMessage.timestamp"
                xyz="duration-10 fade appear-front-3 ease-out-back appear-left-0"
                v-xyz="{ left: !chatMessage.isUser, right: chatMessage.isUser }"
              >
                <div class="chat-avatar xyz-nested" xyz="fade small in-delay-3">{{ chatMessage.isUser ? '🐤' : '🐔' }}</div>
                {{ chatMessage.text }}
              </li>
            </XyzTransitionGroup>
            <div class="flex-col mt-l">
              <label for="chatListInput" class="example-input-label mb-xxs">Say Something!</label>
              <input
                id="chatListInput"
                class="chat-input"
                v-model="userMessage"
                @keydown.enter="sendMessage"
              />
            </div>
          </div>
      - name: React
        content: |
          ##jsx
          <div className="example-wrap">
            <XyzTransitionGroup appear tag="ul" className="chat-list" duration="auto">
              {chatMessages.map((chatMessage) => (
                <li
                  className={\`chat-item \${chatMessage.isUser && 'chat-item--user'}\` }
                  key={chatMessage.timestamp}
                  xyz={xyz('duration-10 fade appear-front-3 ease-out-back appear-left-0', { left: !chatMessage.isUser, right: chatMessage.isUser })}
                >
                  <div className="chat-avatar xyz-nested" xyz="fade small in-delay-3">{ chatMessage.isUser ? '🐤' : '🐔' }</div>
                  { chatMessage.text }
                </li>
              ))}
            </XyzTransitionGroup>
            <div className="flex-col mt-l">
              <label htmlFor="chatListInput" className="example-input-label mb-xxs">Say Something!</label>
              <input
                id="chatListInput"
                className="chat-input"
              />
            </div>
          </div>
  - name: Page
    component: PracticalExamples_Page
    code:
      - name: HTML
        content: |
          ##html
          <XyzTransition appear duration="auto">
            <div class="page-wrap">
              <div class="page-hero" xyz="fade small stagger ease-out-back">
                <div class="hero-logo xyz-nested"></div>
                <p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
              </div>
              <div class="page-thing1-wrap" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
                <div class="page-thing1 xyz-nested"></div>
                <div class="page-thing1 xyz-nested"></div>
                <div class="page-thing1 xyz-nested"></div>
              </div>
              <div class="page-thing2-wrap" xyz="fade small stagger delay-4 ease-in-out">
                <div class="page-thing2-left" xyz="fade left stagger">
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                </div>
                <div class="page-thing2-right xyz-nested" xyz="fade big delay-10"></div>
              </div>
              <div class="page-footer" xyz="fade bottom ease-in-out delay-10">
                <div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
                <div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                </div>
              </div>
            </div>
          </XyzTransition>
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear duration="auto">
            <div class="page-wrap">
              <div class="page-hero" xyz="fade small stagger ease-out-back">
                <div class="hero-logo xyz-nested"></div>
                <p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
              </div>
              <div class="page-thing1-wrap" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
                <div class="page-thing1 xyz-nested"></div>
                <div class="page-thing1 xyz-nested"></div>
                <div class="page-thing1 xyz-nested"></div>
              </div>
              <div class="page-thing2-wrap" xyz="fade small stagger delay-4 ease-in-out">
                <div class="page-thing2-left" xyz="fade left stagger">
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                </div>
                <div class="page-thing2-right xyz-nested" xyz="fade big delay-10"></div>
              </div>
              <div class="page-footer" xyz="fade bottom ease-in-out delay-10">
                <div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
                <div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                  <div class="page-thing2 xyz-nested"></div>
                </div>
              </div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition appear duration="auto">
            <div className="page-wrap">
              <div className="page-hero" xyz="fade small stagger ease-out-back">
                <div className="hero-logo xyz-nested"></div>
                <p className="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
              </div>
              <div className="page-thing1-wrap" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
                <div className="page-thing1 xyz-nested"></div>
                <div className="page-thing1 xyz-nested"></div>
                <div className="page-thing1 xyz-nested"></div>
              </div>
              <div className="page-thing2-wrap" xyz="fade small stagger delay-4 ease-in-out">
                <div className="page-thing2-left" xyz="fade left stagger">
                  <div className="page-thing2 xyz-nested"></div>
                  <div className="page-thing2 xyz-nested"></div>
                  <div className="page-thing2 xyz-nested"></div>
                </div>
                <div className="page-thing2-right xyz-nested" xyz="fade big delay-10"></div>
              </div>
              <div className="page-footer" xyz="fade bottom ease-in-out delay-10">
                <div className="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
                <div className="footer-right" xyz="fade up stagger ease-in-out delay-10">
                  <div className="page-thing2 xyz-nested"></div>
                  <div className="page-thing2 xyz-nested"></div>
                  <div className="page-thing2 xyz-nested"></div>
                </div>
              </div>
            </div>
          </XyzTransition>
---

Moving squares around is all well and good, but what do you use AnimXYZ for in the real world? Here are some examples of common ways you can use AnimXYZ to make your UI more lively and interesting.

Fading in a modal might seem straightforward, but you can provide a nice staggered effect by adding an `in-delay` to the modal and an `out-delay` to the overlay.
[Modal Example](?tab=examples&example=Modal#practical-examples)

Media galleries can show more clearly which items are being added or removed with a small animation in and out. [Grid Example](?tab=examples&example=Grid#practical-examples)

A chat component feels much more natural if each text moves in from the side of its respective owner. [Chat Example](?tab=examples&example=Chat#practical-examples)

Emphasize what someone should look at first, or give a feature list some life. Animating the initial appearance of elements on a page is easy. [Page Example](?tab=examples&example=Page#practical-examples)