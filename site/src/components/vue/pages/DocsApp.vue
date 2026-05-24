<template>
  <div :class="`tab--${activeTab}`">
    <PageNav :sections="sections" :active-section="activeSection" :open="navOpen" @toggle="toggleNav"></PageNav>

    <main class="page-content" :class="{ 'nav-open': navOpen }">
      <XyzTransitionGroup tag="section" class="sections__wrap" :class="{ active: activeTab === 'docs' }" appear-visible>
        <div
          v-for="section in sections"
          xyz="fade delay-1 ease-out"
          v-xyz="{
            'small-3': section.header,
            'down-2': !section.header,
          }"
          :key="section.id"
        >
          <h1 class="section-group__header" v-if="section.header" :id="section.id">{{ section.title }}</h1>
          <DocsSection
            v-if="!section.header"
            :section="section"
            :class="{ active: section === activeSection }"
            :ref="(el) => setSectionRef(el, section.id)"
          ></DocsSection>
        </div>
      </XyzTransitionGroup>

      <section class="sandbox__wrap" :class="{ active: activeTab === 'examples' }">
        <a class="back-to-docs" :href="`/docs#${activeSection && activeSection.id}`">
          Back to {{ activeSection && activeSection.title }}
        </a>
        <XyzTransition appear xyz="fade" mode="out-in">
          <Sandbox
            v-if="hasSandbox && (above('laptop') || activeTab === 'examples')"
            v-bind="sandboxProps"
            v-scroll-lock="below('laptop') && activeTab === 'examples'"
            :key="activeSection.id"
          ></Sandbox>
          <div class="no-examples" v-if="!hasSandbox" key="no-example">
            <IconSandbox></IconSandbox>
            There are no examples<br />for this section.
          </div>
        </XyzTransition>
      </section>
    </main>
  </div>
</template>

<script>
import DocsSection from '~/components/vue/reusable/DocsSection.vue'
import PageNav from '~/components/vue/reusable/PageNav.vue'
import Sandbox from '~/components/vue/reusable/Sandbox.vue'
import { useMediaQueries } from '~/composables/useMediaQueries'

const sectionDefinitions = [
  { header: true, title: 'Getting Started', id: 'getting-started' },
  'installation',
  'the-basics',
  'how-it-works',
  'practical-examples',
  { header: true, title: 'Composing Animations', id: 'composing-animations' },
  'contexts',
  'utilities',
  'variables',
  'defaults',
  { header: true, title: 'Controlling Animations', id: 'controlling-animations' },
  'active-classes',
  'nesting',
  'special-classes',
  { header: true, title: 'Animations', id: 'animations' },
  'fade',
  'transform',
  'perspective',
  'origin',
  'timing',
  'stagger',
  'iterate',
  'direction',
  { header: true, title: 'Vue Integration', id: 'vue-integration' },
  'vue-installation',
  'vue-xyz-transition',
  'vue-xyz-transition-group',
  'vue-dynamic-xyz',
  { header: true, title: 'React Integration', id: 'react-integration' },
  'react-installation',
  'react-xyz-transition',
  'react-xyz-transition-group',
  'react-dynamic-xyz',
]

export default {
  name: 'DocsApp',
  props: {
    sectionsData: {
      type: Array,
      required: true,
    },
  },
  components: {
    DocsSection,
    PageNav,
    Sandbox,
  },
  setup() {
    const { above, below } = useMediaQueries()
    return { above, below }
  },
  data() {
    return {
      navOpen: false,
      activeSectionId: null,
      activeTab: 'docs',
      sectionRefs: {},
    }
  },
  computed: {
    sections() {
      const sectionsObj = {}
      this.sectionsData.forEach((section) => {
        sectionsObj[section.id] = section
      })
      return sectionDefinitions
        .map((definition) => {
          if (typeof definition === 'object' && definition.header) {
            return definition
          }
          return sectionsObj[definition]
        })
        .filter(Boolean)
    },
    activeSection() {
      return this.sections.find((section) => section.id === this.activeSectionId)
    },
    hasSandbox() {
      return this.activeSection && this.activeSection.examples && this.activeSection.examples.length
    },
    sandboxProps() {
      if (this.hasSandbox) {
        return {
          name: this.activeSectionId,
          examples: this.activeSection.examples,
          modifiers: this.activeSection.modifiers,
        }
      }
      return null
    },
  },
  methods: {
    toggleNav(toggled) {
      this.navOpen = toggled
    },
    setTab(tab) {
      this.activeTab = tab
    },
    setSectionRef(el, id) {
      if (el) {
        this.sectionRefs[id] = el
      } else {
        delete this.sectionRefs[id]
      }
    },
    onLocationChange() {
      if (typeof window === 'undefined') return
      const params = new URLSearchParams(window.location.search)
      this.setTab(params.get('tab') || 'docs')
    },
    onInternalLinkClick(event) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest('a')
      if (!anchor || !anchor.href) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      let url
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      // Only intercept navigation that stays on the current page (same pathname,
      // ignoring an optional trailing slash). Lets us keep the URL in sync with
      // tab + section without triggering a full page reload.
      const samePath = url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '')
      if (!samePath) return

      event.preventDefault()

      if (url.href !== window.location.href) {
        window.history.pushState({}, '', url.href)
      }

      this.onLocationChange()

      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1))
        const target = id && document.getElementById(id)
        if (target) {
          target.scrollIntoView({ block: 'start' })
        }
      }
    },
    onWindowScroll() {
      if (typeof window === 'undefined') return
      let activeSectionId
      let maxCoverage = 0
      Object.entries(this.sectionRefs).forEach(([id, sectionRef]) => {
        const el = sectionRef.$el || sectionRef
        if (!el || typeof el.getBoundingClientRect !== 'function') return
        const { top, bottom } = el.getBoundingClientRect()
        const viewportCoverage = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
        if (viewportCoverage > maxCoverage) {
          activeSectionId = id
          maxCoverage = viewportCoverage
        }
      })
      this.activeSectionId = activeSectionId
    },
  },
  mounted() {
    this.onLocationChange()
    this.onWindowScroll()
    window.addEventListener('scroll', this.onWindowScroll, { passive: true })
    window.addEventListener('resize', this.onWindowScroll)
    window.addEventListener('hashchange', this.onLocationChange)
    window.addEventListener('popstate', this.onLocationChange)
    document.addEventListener('click', this.onInternalLinkClick)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll)
    window.removeEventListener('resize', this.onWindowScroll)
    window.removeEventListener('hashchange', this.onLocationChange)
    window.removeEventListener('popstate', this.onLocationChange)
    document.removeEventListener('click', this.onInternalLinkClick)
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  display: flex;

  &.nav-open {
    @include media('>=large') {
      padding-left: $desktop-menu-width;
    }
  }
}

.sections__wrap {
  padding-top: 4rem;
  padding-right: 40vw;
  width: 100%;

  @include media('<laptop') {
    padding-right: 0;
    transform: translateX(-100vw);
    transition: transform 0.3s $ease-in-out;

    &.active {
      transform: none;
    }
  }
}

.section-group__header {
  text-align: center;
  color: primary-color(600);
  font-size: 2.5rem;
  font-weight: 720;
  padding: 2vw $sp-m;

  @include media('>=laptop') {
    padding: 0;
  }

  @include dark-mode {
    color: primary-color(500);
  }
}

.sandbox__wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 40vw;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: primary-color(900);

  .sandbox {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  @include media('<laptop') {
    width: 100vw;
    transform: translateX(100vw);
    transition: transform 0.3s $ease-in-out;

    .sandbox {
      border-top: 1px solid primary-color(800);
    }

    &.active {
      transform: none;
    }
  }
}

.back-to-docs {
  position: relative;
  z-index: 1;
  height: 2.5rem;
  display: flex;
  align-items: center;
  align-self: flex-start;
  flex-shrink: 0;
  padding: 0 $sp-xxs;
  border-radius: $br-m;
  color: primary-color(300);
  text-decoration: none;
  font-weight: 500;
  font-size: $fs-s;
  transition: 0.3s $ease-out;
  transition-property: background-color, color;

  &::before {
    display: inline-block;
    content: '←';
    margin-right: $sp-xxxs;
    transition: transform 0.2s $ease-out-back;
  }

  &:hover,
  &:focus {
    color: primary-color(200);

    &::before {
      transform: translateX(-0.5rem);
    }
  }

  @include media('>laptop') {
    display: none;
  }
}

.no-examples {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: primary-color(200);
  font-size: $fs-l;
  line-height: 1.5;
  padding: $sp-m;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  .icon-sandbox {
    --icon-color: #{primary-color(300)};
    @include size(3rem);
    margin-bottom: $sp-m;
  }
}
</style>
