<template>
  <div class="code-block">
    <TabBar class="code-block__tabs" :tabs="computedCode" v-if="computedCode.length > 1" v-model="activeCode"></TabBar>

    <XyzTransition data-xyz="fade" mode="out-in">
      <div :key="activeCode && activeCode.name">
        <div class="code__wrap" v-if="activeCode">
          <pre
            v-for="(codeChunk, index) in activeCodeChunks"
            :key="index"
            :class="`language-${codeChunk.prism.language}`"
          ><code :class="`language-${codeChunk.prism.language}`" v-html="codeChunk.html"></code></pre>
        </div>
        <div class="code-buttons" v-if="activeCode">
          <button class="code-button" @click="copyCode">
            {{ isCopied ? 'Copied' : 'Copy' }}
          </button>
        </div>
      </div>
    </XyzTransition>
  </div>
</template>

<script>
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostCSS from 'prettier/parser-postcss'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-scss'
import IconHtml from '~/assets/icons/IconHtml.svg?component'
import IconReact from '~/assets/icons/IconReact.svg?component'
import IconVue from '~/assets/icons/IconVue.svg?component'
import TabBar from '~/components/vue/reusable/TabBar.vue'
import { copyToClipboard } from '~/utils'

const tabIcons = {
  HTML: IconHtml,
  Vue: IconVue,
  React: IconReact,
}

const languageOptions = {
  html: {
    prettier: {
      parser: 'html',
      plugins: [parserHtml, parserPostCSS, parserBabel],
    },
    prism: {
      language: 'html',
    },
  },
  css: {
    prettier: {
      parser: 'css',
      plugins: [parserPostCSS],
    },
    prism: {
      language: 'css',
    },
  },
  scss: {
    prettier: {
      parser: 'scss',
      plugins: [parserPostCSS],
    },
    prism: {
      language: 'scss',
    },
  },
  javascript: {
    prettier: {
      parser: 'babel',
      plugins: [parserBabel],
    },
    prism: {
      language: 'javascript',
    },
  },
  jsx: {
    prettier: {
      parser: 'babel',
      plugins: [parserBabel],
    },
    prism: {
      language: 'jsx',
    },
  },
  vue: {
    prettier: {
      parser: 'vue',
      plugins: [parserHtml, parserPostCSS, parserBabel],
    },
    prism: {
      language: 'html',
    },
  },
}

export default {
  name: 'CodeBlock',
  components: {
    TabBar,
  },
  props: {
    code: Array,
    data: Object,
  },
  emits: ['language-changed'],
  data() {
    return {
      activeCode: null,
      isCopied: false,
      isCopiedTimout: null,
    }
  },
  computed: {
    computedCode() {
      return this.code.map((code) => ({
        icon: tabIcons[code.name],
        ...code,
      }))
    },
    activeCodeChunks() {
      if (!this.activeCode) return []
      // Use `new Function` rather than `eval` so the data binding survives
      // minification of local variables.
      let evalContent
      try {
        const compile = new Function('data', `return \`${this.activeCode.content}\``)
        evalContent = compile(this.data)
      } catch {
        evalContent = this.activeCode.content
      }

      const codeChunks = []

      const splitChunks = evalContent.split(/##(\w+)/)
      for (let i = 1; i < splitChunks.length; i += 2) {
        const chunkLanguage = splitChunks[i]
        const chunkContent = splitChunks[i + 1]
        const chunkLanguageOptions = languageOptions[chunkLanguage]
        if (!chunkLanguageOptions) continue

        const chunkPrettierOptions = {
          printWidth: 70,
          tabWidth: 2,
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          ...chunkLanguageOptions.prettier,
        }

        const chunkPrismOptions = {
          ...chunkLanguageOptions.prism,
        }

        let chunkParsedContent
        try {
          chunkParsedContent = prettier.format(chunkContent, chunkPrettierOptions)
        } catch {
          chunkParsedContent = chunkContent
        }

        if (chunkParsedContent.startsWith(';')) {
          chunkParsedContent = chunkParsedContent.substring(1)
        }

        const grammar = Prism.languages[chunkPrismOptions.language] || Prism.languages.markup
        const html = Prism.highlight(chunkParsedContent, grammar, chunkPrismOptions.language)

        codeChunks.push({
          language: chunkLanguage,
          prettier: chunkPrettierOptions,
          prism: chunkPrismOptions,
          content: chunkParsedContent,
          html,
        })
      }

      return codeChunks
    },
  },
  watch: {
    activeCode() {
      clearTimeout(this.isCopiedTimout)
      this.isCopied = false
      this.$emit('language-changed', this.activeCode)
    },
    code: {
      immediate: true,
      handler() {
        if (this.computedCode.length) {
          if (this.activeCode) {
            this.activeCode = this.computedCode.find((code) => code.name === this.activeCode.name)
          }
          if (!this.activeCode) {
            this.activeCode = this.computedCode[0]
          }
        } else {
          this.activeCode = null
        }
      },
    },
  },
  methods: {
    setCode(codeName) {
      this.activeCode = this.computedCode.find((code) => code.name === codeName)
    },
    copyCode() {
      if (!this.isCopied) {
        const codeText = this.activeCodeChunks
          .map((codeChunk) => codeChunk.content)
          .join('\n')

        copyToClipboard(codeText)

        this.isCopied = true
        this.isCopiedTimout = setTimeout(() => {
          this.isCopied = false
        }, 2000)
      }
    },
  },
  beforeUnmount() {
    clearTimeout(this.isCopiedTimout)
  },
}
</script>

<style lang="scss" scoped>
.code-block__tabs {
  :deep(.tab-bar__tab) {
    @media (width >= $bp-tablet) {
      flex-grow: initial;
      padding: 0 $sp-m;
    }
  }
}

.code__wrap {
  position: relative;
  overflow: auto;

  pre[class*='language-'] {
    overflow: initial;
    padding-bottom: 0;
  }

  pre + pre {
    padding-top: 0;
  }
}

.code-buttons {
  padding: $sp-xs;
  display: flex;

  .code-button + .code-button {
    margin-left: $sp-xxs;
  }
}

.code-button {
  color: primary-color(200);
  padding: $sp-xxs $sp-xs;
  font-size: $fs-s;
  font-weight: 500;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  border-radius: $br-m;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    background-color: primary-color(800, 0.5);
    color: primary-color(50);
  }

  &:focus {
    box-shadow: 0 0 0 2px $cyan;
  }
}
</style>
