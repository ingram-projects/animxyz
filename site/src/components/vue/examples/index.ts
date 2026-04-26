import type { Component } from 'vue'

const modules = import.meta.glob<{ default: Component }>('./*/*.vue', { eager: true })

export const exampleComponents: Record<string, Component> = {}

for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/^\.\/(.+)\/(.+)\.vue$/)
  if (!match) continue
  const key = `${match[1]}_${match[2]}`
  exampleComponents[key] = mod.default
}
