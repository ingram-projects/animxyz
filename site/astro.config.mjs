import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import { fileURLToPath } from 'node:url'
import remarkCodesandbox from 'remark-codesandbox'
import rehypePrismPlus from 'rehype-prism-plus'
import svgLoader from 'vite-svg-loader'
import remarkCodesandboxModifier from './src/markdown/remark-codesandbox-modifier.mjs'
import remarkNoteContainers from './src/markdown/remark-note-containers.mjs'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  output: 'static',
  site: 'https://animxyz.com',
  integrations: [vue({ appEntrypoint: '/src/vue-app' })],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      [
        remarkCodesandbox,
        {
          mode: 'meta',
          customTemplates: {
            'animxyz-vue-2': {
              extends: 'animxyz-vue-2-w0xg5',
              entry: 'src/App.vue',
            },
            'animxyz-vue-3': {
              extends: 'animxyz-vue-3-ltb7u',
              entry: 'src/App.vue',
            },
            'animxyz-react': {
              extends: 'animxyz-react-tgwrc',
              entry: 'src/App.jsx',
            },
            'animxyz-vue-2-router': {
              extends: 'animxyz-vue-2-router-0l48w',
              entry: 'src/App.vue',
            },
            'animxyz-vue-3-router': {
              extends: 'animxyz-vue-3-router-ojlrb',
              entry: 'src/App.vue',
            },
            'animxyz-react-router': {
              extends: 'animxyz-react-router-oe4w8',
              entry: 'src/App.jsx',
            },
          },
        },
      ],
      remarkCodesandboxModifier,
      remarkNoteContainers,
    ],
    rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
  },
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component',
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // Keep viewBox so SVGs scale correctly when width/height
                  // are overridden via CSS (e.g. `svg { @include size(1.5rem) }`).
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: [
        // DynamicTemplate compiles templates at runtime, which requires the
        // bundler entry that ships with the compiler.
        { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' },
        { find: '~', replacement: r('./src') },
      ],
      dedupe: ['vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [r('./node_modules'), r('../node_modules'), r('./src')],
          additionalData: `@use "${r('./src/styles/variables/_index.scss')}" as *;\n`,
        },
      },
    },
  },
})
