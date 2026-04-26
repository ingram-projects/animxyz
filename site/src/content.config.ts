import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const codeSnippetSchema = z.object({
  name: z.string(),
  content: z.string(),
})

const exampleSchema = z.object({
  name: z.string(),
  template: z.string().optional(),
  component: z.string().optional(),
  code: z.array(codeSnippetSchema).optional(),
})

const modifierGroupSchema = z.object({
  name: z.string(),
  types: z.array(z.string()),
})

const modifierConfigSchema = z.union([
  z.boolean(),
  z
    .object({
      defaults: z.array(z.string()).optional(),
      hide: z.boolean().optional(),
      groups: z.array(modifierGroupSchema).optional(),
    })
    .partial(),
])

const modifiersSchema = z
  .object({
    utilities: modifierConfigSchema.optional(),
    variables: modifierConfigSchema.optional(),
    groups: z.array(modifierGroupSchema).optional(),
  })
  .partial()

const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    id: z.string(),
    quote: z.string().optional(),
    examples: z.array(exampleSchema).optional(),
    modifiers: modifiersSchema.optional(),
  }),
})

export const collections = { sections }
