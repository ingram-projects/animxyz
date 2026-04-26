import type { Component } from 'vue'

// Force vite-svg-loader to handle these as Vue components rather than letting
// Astro's built-in SVG component import (stable since 5.7) take over.
const modules = import.meta.glob<Component>('./*.svg', {
  eager: true,
  query: '?component',
  import: 'default',
})

const icons: Record<string, Component> = {}

for (const [path, component] of Object.entries(modules)) {
  const match = path.match(/^\.\/(.+)\.svg$/)
  if (!match) continue
  icons[match[1]] = component
}

export default icons
