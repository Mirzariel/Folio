/**
 * Content collections. Prose lives here as Markdown; commercial facts live in
 * src/config/site.ts. Structural lists that are not prose live in src/data/.
 *
 * Schemas are the contract: a missing field fails the build rather than
 * rendering a blank on a page that sells trust.
 */
import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';


const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
  schema: z.object({
    version: z.string(),
    /**
     * "upcoming" until the version is really out. An upcoming entry has no
     * date: AGENTS.md forbids a release date for anything still in development.
     * Test builds are internal and never appear here.
     */
    status: z.enum(['released', 'upcoming']).default('released'),
    /** Required once released. */
    date: z.coerce.date().optional(),
    /** Shown as a tag. "Windows" until a second platform ships. */
    platform: z.string().default('Windows'),
    summary: z.string(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    /**
     * Legal text ships only when a human has written and approved it.
     * npm run check:copy fails the build while any legal page is still a
     * draft, so placeholder terms cannot reach a buyer by accident.
     */
    draft: z.boolean().default(true),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().default(99),
  }),
});

export const collections = { changelog, legal, docs };
