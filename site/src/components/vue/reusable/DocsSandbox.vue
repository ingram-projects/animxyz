<template>
  <section class="sandbox__wrap" :class="{ active: activeTab === 'examples' }">
    <a class="back-to-docs" :href="`/docs#${currentId || ''}`">
      Back to {{ currentTitle }}
    </a>
    <Sandbox
      v-if="currentSandbox"
      v-bind="currentSandbox"
      v-scroll-lock="!isLaptop && activeTab === 'examples'"
      :key="currentId || 'none'"
    ></Sandbox>
    <div class="no-examples" v-else>
      <span class="no-examples__icon" v-html="iconSandboxSvg"></span>
      There are no examples<br />for this section.
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@nanostores/vue'
import { activeSectionId, activeTab } from '~/stores/docs'
import Sandbox from '~/components/vue/reusable/Sandbox.vue'
import iconSandboxSvg from '~/assets/icons/IconSandbox.svg?raw'

export default {
  name: 'DocsSandbox',
  components: {
    Sandbox,
  },
  props: {
    sandboxMap: {
      type: Object,
      required: true,
    },
    sectionTitles: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const activeId = useStore(activeSectionId)
    const tab = useStore(activeTab)

    const isLaptop = ref(typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true)
    let mql = null
    function onChange(event) {
      isLaptop.value = event.matches
    }
    onMounted(() => {
      if (typeof window === 'undefined') return
      mql = window.matchMedia('(min-width: 1024px)')
      isLaptop.value = mql.matches
      mql.addEventListener('change', onChange)
    })
    onUnmounted(() => {
      if (mql) {
        mql.removeEventListener('change', onChange)
      }
    })

    const currentId = computed(() => activeId.value)
    const currentTitle = computed(() => {
      if (!currentId.value) return ''
      return props.sectionTitles[currentId.value] || ''
    })
    const currentSandbox = computed(() => {
      if (!currentId.value) return null
      return props.sandboxMap[currentId.value] || null
    })

    return {
      activeTab: tab,
      isLaptop,
      currentId,
      currentTitle,
      currentSandbox,
      iconSandboxSvg,
    }
  },
}
</script>

<style lang="scss" scoped>
.sandbox__wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 40vw;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: primary-color(900);

  :deep(.sandbox) {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  @include media('<laptop') {
    width: 100vw;
    transform: translateX(100vw);
    transition: transform 0.3s $ease-in-out;

    :deep(.sandbox) {
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

  :deep(.icon-sandbox) {
    --icon-color: #{primary-color(300)};
    @include size(3rem);
    margin-bottom: $sp-m;
  }
}
</style>
