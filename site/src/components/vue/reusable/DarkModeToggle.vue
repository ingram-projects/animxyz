<template>
  <button
    class="dark-mode-toggle"
    :class="{ active: darkModeToggled }"
    @click="toggleDarkLightMode"
  >
    <span class="screen-reader-only">Turn Dark Mode {{ darkModeToggled ? 'Off' : 'On' }}</span>
    <div class="dark-mode-toggle__contents">🌒🌓🌔🌕🌖</div>
  </button>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  data() {
    return {
      darkModeToggled: false,
      prefersColorSchemeMedia: null,
    }
  },
  watch: {
    darkModeToggled() {
      const bodyEl = document.querySelector('body')

      bodyEl.classList.remove('dark-mode', 'light-mode')
      if (this.darkModeToggled === true) {
        bodyEl.classList.add('dark-mode')
      }
      if (this.darkModeToggled === false) {
        bodyEl.classList.add('light-mode')
      }
    },
  },
  methods: {
    toggleDarkLightMode() {
      this.darkModeToggled = !this.darkModeToggled
    },
    onPrefersColorSchemeChange(event) {
      this.darkModeToggled = event.matches
    },
  },
  mounted() {
    this.prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    this.darkModeToggled = this.prefersColorSchemeMedia.matches
    this.prefersColorSchemeMedia.addEventListener('change', this.onPrefersColorSchemeChange)
  },
  beforeUnmount() {
    if (this.prefersColorSchemeMedia) {
      this.prefersColorSchemeMedia.removeEventListener('change', this.onPrefersColorSchemeChange)
    }
  },
}
</script>

<style lang="scss" scoped>
@keyframes moon {
  to {
    transform: translateX(-80%);
  }
}

@keyframes moon-rev {
  from {
    transform: translateX(-80%);
  }
}

.dark-mode-toggle {
  @include circle(2.25rem);
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 2.25rem;
  transition: transform 0.3s $ease-out-back;
  white-space: nowrap;

  &:hover,
  &:focus {
    transform: scale(1.125);
  }

  @include media('<phone') {
    @include circle(2rem);
    font-size: 2rem;
  }
}

.dark-mode-toggle__contents {
  display: flex;
  animation: moon 1s steps(4, end) both;

  @include dark-mode {
    animation: moon-rev 1s steps(4, end) both;
  }
}
</style>
