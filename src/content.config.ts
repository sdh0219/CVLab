import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 双语文件约定：
 *   content/<collection>/<slug>.zh.md  +  content/<collection>/<slug>.en.md
 * 两个文件必须成对存在（scripts/check-i18n.mjs 强制校验）。
 * 生成的 entry id 为 "<slug>__zh" / "<slug>__en"。
 */
const localeGlob = (dir: string) =>
  glob({
    base: `./content/${dir}`,
    pattern: '**/*.md',
    generateId: ({ entry }: { entry: string }) => {
      const m = entry.match(/^(.+)\.(zh|en)\.md$/);
      return m ? `${m[1]}__${m[2]}` : entry.replace(/\.md$/, '');
    },
  });

const members = defineCollection({
  loader: localeGlob('members'),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    role: z.enum(['pi', 'phd', 'master', 'undergrad', 'alumni']),
    title: z.string().optional(),
    photo: z.string().optional(),
    email: z.string().optional(),
    homepage: z.string().url().optional(),
    interests: z.array(z.string()).default([]),
    since: z.string().optional(),
    order: z.number().default(100),
  }),
});

const researchAreas = defineCollection({
  loader: localeGlob('researchAreas'),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    summary: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    cover: z.string().optional(),
    order: z.number().default(100),
  }),
});

const projects = defineCollection({
  loader: localeGlob('projects'),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    source: z.string(),
    sourceEn: z.string(),
    period: z.string(),
    status: z.enum(['ongoing', 'completed']).default('ongoing'),
    tags: z.array(z.string()).default([]),
    repoUrl: z.string().optional(),
    demoUrl: z.string().url().optional(),
    datasetRefs: z.array(z.string()).default([]),
    areaRefs: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    hasRepro: z.boolean().default(false),
    placeholder: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const datasets = defineCollection({
  loader: localeGlob('datasets'),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    size: z.string(),
    format: z.string(),
    license: z.string(),
    year: z.number(),
    giteeUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    placeholder: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: localeGlob('publications'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['article', 'conference', 'thesis', 'other']).default('article'),
    zone: z.string().optional(),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    firstAuthorAffiliation: z.string().optional(),
    correspondingAuthor: z.boolean().default(false),
    projectRefs: z.array(z.string()).default([]),
  }),
});

const news = defineCollection({
  loader: localeGlob('news'),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    titleEn: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: localeGlob('resources'),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    summary: z.string().optional(),
    category: z.enum(['course', 'setup', 'tutorial', 'domain', 'link', 'practice']),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    tags: z.array(z.string()).default([]),
    externalUrl: z.string().optional(),
    authorRef: z.string().optional(),
    language: z.enum(['zh', 'en', 'bilingual']).optional(),
    placeholder: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = {
  members,
  researchAreas,
  projects,
  datasets,
  publications,
  news,
  resources,
};
