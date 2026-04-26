---
title: Practical Examples
id: practical-examples
quote: Is this real life?

examples:
  - name: Page
    component: PracticalExamples_Page
    code:
      - name: HTML
        content: |
          ##html
          <div class="page-wrap xyz-in">
            <div class="page-hero" xyz="fade small stagger ease-out-back">
              <div class="hero-logo xyz-nested"></div>
              <p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
            </div>
            <div class="page-features" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
              <div class="feature-item xyz-nested"></div>
              <div class="feature-item xyz-nested"></div>
              <div class="feature-item xyz-nested"></div>
            </div>
            <div class="page-section" xyz="fade small stagger delay-4 ease-in-out">
              <div class="section-left" xyz="fade left stagger">
                <div class="section-item xyz-nested"></div>
                <div class="section-item xyz-nested"></div>
                <div class="section-item xyz-nested"></div>
              </div>
              <div class="section-right xyz-nested" xyz="fade big delay-10"></div>
            </div>
            <div class="page-footer" xyz="fade bottom ease-in-out delay-10">
              <div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
              <div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
                <div class="footer-item xyz-nested"></div>
                <div class="footer-item xyz-nested"></div>
                <div class="footer-item xyz-nested"></div>
              </div>
            </div>
          </div>
      - name: Vue
        content: |
          ##vue
          <XyzTransition appear duration="auto">
            <div class="page-wrap">
              <div class="page-hero" xyz="fade small stagger ease-out-back">
                <div class="hero-logo xyz-nested"></div>
                <p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
              </div>
              <div class="page-features" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
                <div class="feature-item xyz-nested"></div>
                <div class="feature-item xyz-nested"></div>
                <div class="feature-item xyz-nested"></div>
              </div>
              <div class="page-section" xyz="fade small stagger delay-4 ease-in-out">
                <div class="section-left" xyz="fade left stagger">
                  <div class="section-item xyz-nested"></div>
                  <div class="section-item xyz-nested"></div>
                  <div class="section-item xyz-nested"></div>
                </div>
                <div class="section-right xyz-nested" xyz="fade big delay-10"></div>
              </div>
              <div class="page-footer" xyz="fade bottom ease-in-out delay-10">
                <div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
                <div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
                  <div class="footer-item xyz-nested"></div>
                  <div class="footer-item xyz-nested"></div>
                  <div class="footer-item xyz-nested"></div>
                </div>
              </div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition appear duration="auto">
            <div class="page-wrap">
              <div class="page-hero" xyz="fade small stagger ease-out-back">
                <div class="hero-logo xyz-nested"></div>
                <p class="hero-text xyz-nested">Curabitur blandit tempus porttitor. Morbi leo risus.</p>
              </div>
              <div class="page-features" xyz="fade flip-down stagger duration-10 delay-2 ease-out-back">
                <div class="feature-item xyz-nested"></div>
                <div class="feature-item xyz-nested"></div>
                <div class="feature-item xyz-nested"></div>
              </div>
              <div class="page-section" xyz="fade small stagger delay-4 ease-in-out">
                <div class="section-left" xyz="fade left stagger">
                  <div class="section-item xyz-nested"></div>
                  <div class="section-item xyz-nested"></div>
                  <div class="section-item xyz-nested"></div>
                </div>
                <div class="section-right xyz-nested" xyz="fade big delay-10"></div>
              </div>
              <div class="page-footer" xyz="fade bottom ease-in-out delay-10">
                <div class="footer-logo xyz-nested" xyz="fade left ease-in-out delay-10"></div>
                <div class="footer-right" xyz="fade up stagger ease-in-out delay-10">
                  <div class="footer-item xyz-nested"></div>
                  <div class="footer-item xyz-nested"></div>
                  <div class="footer-item xyz-nested"></div>
                </div>
              </div>
            </div>
          </XyzTransition>
  - name: Grid
    component: PracticalExamples_Grid
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransitionGroup appear class="example-grid cat-grid" xyz="fade duration-5 appear-front-3 small-3 appear-small-0 stagger-2 out-stagger-0">
            <div class="square" v-for="index in numCats" :key="index">
              <img class="item-image" :src="\`https://cataas.com/cat?type=sm?id=\${index}\`" alt="Picture of a cat"
              />
            </div>
          </XyzTransitionGroup>
      - name: React
        content: |
          ##jsx
          <XyzTransitionGroup appear class="example-grid cat-grid" xyz="fade duration-5 appear-front-3 small-3 appear-small-0 stagger-2 out-stagger-0">
            {[...Array(numCats)].map((_, index) => (
              <div class="square" key={index}>
                <img class="item-image" src={\`https://cataas.com/cat?type=sm?id=\${index}\`} alt="Picture of a cat"
                />
              </div>
            ))}
          </XyzTransitionGroup>
  - name: Modal
    component: PracticalExamples_Modal
    code:
      - name: Vue
        content: |
          ##vue
          <XyzTransition duration="auto" xyz="fade out-delay-5">
            <div class="modal-overlay" v-if="modalOpen" @click="modalOpen = false">
              <div class="modal xyz-nested" xyz="fade short-100% delay-3 ease-out-back" @click.stop>
                <div class="modal-header xyz-nested" xyz="up-100% in-delay-3">
                  <h1 class="xyz-nested" xyz="fade left in-delay-6">I am a modal</h1>
                  <button xyz="fade small in-delay-7" class="modal-close xyz-nested" @click="modalOpen = false"></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer xyz-nested" xyz="down-100% in-delay-3">
                  <button class="modal-button xyz-nested" xyz="fade in-right in-delay-7" @click="modalOpen = false">Close</button>
                </div>
              </div>
            </div>
          </XyzTransition>
      - name: React
        content: |
          ##jsx
          <XyzTransition duration="auto" xyz="fade out-delay-5">
            { modalOpen && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal xyz-nested" xyz="fade short-100% delay-3 ease-out-back">
                  <div className="modal-header xyz-nested" xyz="up-100% in-delay-3">
                    <h1 className="xyz-nested" xyz="fade left in-delay-6">I am a modal</h1>
                    <button xyz="fade small in-delay-7" className="modal-close xyz-nested" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body"></div>
                  <div className="modal-footer xyz-nested" xyz="down-100% in-delay-3">
                    <button className="modal-button xyz-nested" xyz="fade in-right in-delay-7" onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            )} 
          </XyzTransition>
  - name: Tabs
    component: PracticalExamples_Tabs
    code:
      - name: Vue
        content: |
          ##vue
          <div class="example-tabs-wrap">
            <XyzTransitionGroup
              class="example-tabs"
              appear
              duration="auto"
              xyz="fade flip-down origin-bottom stagger-1 delay-5"
            >
              <button
                class="example-tab"
                :class="{ active: tab === activeTab }"
                v-for="tab in tabs"
                @click="activeTab = tab"
                :key="tab"
              >
                {{ tab }}
              </button>
            </XyzTransitionGroup>

            <div xyz="fade appear-short-100% origin-top ease-in-out duration-7" v-xyz="tabDirectionXyz">
              <XyzTransition appear>
                <div class="example-tab-contents xyz-out-absolute" :key="activeTab">
                  xyz="{{ tabDirectionXyz }}"
                </div>
              </XyzTransition>
            </div>
          </div>
      - name: React
        content: |
          ##jsx
          <div className="example-tabs-wrap">
            <XyzTransitionGroup
              className="example-tabs"
              appear
              duration="auto"
              xyz="fade flip-down origin-bottom stagger-1 delay-5"
            >
              {tabs.map((tab) => (
                <button
                  className={\`example-tab \${tab === activeTab && 'active'}\`}
                  onClick={() => setActiveTab(tab)}
                  key={tab}
                >
                  { tab }
                </button>
              ))}
            </XyzTransitionGroup>

            <div
              xyz={xyz('fade appear-short-100% origin-top ease-in-out duration-7', tabDirectionXyz)}
            >
              <XyzTransition appear>
                <div className="example-tab-contents xyz-out-absolute" key={activeTab}>
                  {\`xyz="\${tabDirectionXyz}"\`}
                </div>
              </XyzTransition>
            </div>
          </div>
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
---

Moving squares around is all well and good, but what do you use AnimXYZ for in the real world? Here are just a few examples of common ways you can use AnimXYZ to make your UI more lively and interesting.

Emphasize what someone should look at first, or give a feature list some life. Animating the initial appearance of elements on a page is easy. Check out how the `xyz-nested` class and `delay` and `stagger` utilities allow you to orchestrate sequential animations. [Page Example](?tab=examples&example=Page#practical-examples)

Media galleries can clearly show which items are being added or removed with a small animation in and out. `appear` specific utilities let you differentiate the initial animation from subsequent changes. [Grid Example](?tab=examples&example=Grid#practical-examples)

Usually modals just fade in at the same time as the overlay, but by adding an `in-delay` to the modal and an `out-delay` to the overlay you can make the animation feel much more alive.
[Modal Example](?tab=examples&example=Modal#practical-examples)

Tabs imply content hidden off-screen to the left or right of the current tab. With a dynamic `xyz` property determined by the tab's index you can make tab content slide in and out from the direction you expect it to. [Tabs Example](?tab=examples&example=Tabs#practical-examples)

A chat component feels much more natural if each text moves in from the side of its respective owner. [Chat Example](?tab=examples&example=Chat#practical-examples)
