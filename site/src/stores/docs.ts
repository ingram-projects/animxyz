import { atom } from 'nanostores'

export type DocsTab = 'docs' | 'examples'

export const activeSectionId = atom<string | null>(null)
export const activeTab = atom<DocsTab>('docs')
export const navOpen = atom<boolean>(false)
