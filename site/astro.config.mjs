import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import vue from '@astrojs/vue'
import { fileURLToPath } from 'node:url'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeExternalLinks from 'rehype-external-links'
import svgLoader from 'vite-svg-loader'
import remarkNoteContainers from './src/markdown/remark-note-containers.mjs'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  output: 'static',
  site: 'https://animxyz.com',
  integrations: [vue({ appEntrypoint: '/src/vue-app' })],
  markdown: {
    // Astro 7 defaults to Sätteri; keep unified for remark/rehype plugins.
    processor: unified({
      remarkPlugins: [remarkNoteContainers],
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank' }],
        [rehypePrismPlus, { ignoreMissing: true }],
      ],
    }),
    syntaxHighlight: false,
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
