export interface SectionHeader {
  header: true
  title: string
  id: string
}

export type SectionDefinition = SectionHeader | string

export const sectionDefinitions: SectionDefinition[] = [
  { header: true, title: 'Getting Started', id: 'getting-started' },
  'installation',
  'the-basics',
  'how-it-works',
  'practical-examples',
  { header: true, title: 'Composing Animations', id: 'composing-animations' },
  'contexts',
  'utilities',
  'variables',
  'sass-apply',
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
