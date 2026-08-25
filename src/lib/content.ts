import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type LocaleEntry<C extends CollectionKey> = CollectionEntry<C> & {
  slug: string;
  locale: Locale;
};

export function splitId(id: string): { slug: string; locale: Locale } {
  const i = id.lastIndexOf('__');
  if (i === -1) return { slug: id, locale: 'zh' };
  return { slug: id.slice(0, i), locale: id.slice(i + 2) as Locale };
}

/** 取某个语言下的全部条目（剥离 __locale 后缀，附加 slug 与 locale 字段）。 */
export async function getLocaleEntries<C extends CollectionKey>(
  collection: C,
  locale: Locale,
): Promise<LocaleEntry<C>[]> {
  const all = await getCollection(collection);
  return all
    .filter((e) => splitId(e.id).locale === locale)
    .map((e) => {
      const { slug, locale: loc } = splitId(e.id);
      return { ...e, id: e.id, slug, locale: loc } as LocaleEntry<C>;
    });
}

/**
 * 可对外展示的项目：仅结题项目（在研项目因保密要求暂不展示，
 * 结题后把内容文件 status 改为 completed 即自动恢复）。
 */
export async function getPublicProjects(locale: Locale): Promise<LocaleEntry<'projects'>[]> {
  const projects = await getLocaleEntries('projects', locale);
  return projects.filter((p) => p.data.status !== 'ongoing');
}

/** zh / en 同 slug 配对。 */
export async function getPairedEntries<C extends CollectionKey>(collection: C) {
  const all = await getCollection(collection);
  const map = new Map<string, { zh?: CollectionEntry<C>; en?: CollectionEntry<C> }>();
  for (const e of all) {
    const { slug, locale } = splitId(e.id);
    const slot = map.get(slug) ?? {};
    slot[locale] = e;
    map.set(slug, slot);
  }
  return map;
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash = clean.length > 1 && !clean.endsWith('/') && !/\.[a-z0-9]+$/i.test(clean) ? `${clean}/` : clean;
  return locale === 'en' ? `/en${withSlash === '/' ? '' : withSlash}` : withSlash;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'zh' ? 'en' : 'zh';
}
