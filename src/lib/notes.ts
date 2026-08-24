import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

export type Note = {
  slug: string;
  title: string;
  date: string;
  direction: string | null;
  excerpt: string;
  html: string;
};

const files = import.meta.glob('../content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

function toExcerpt(body: string): string {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`_[\]()!|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 150 ? `${text.slice(0, 150)}…` : text;
}

export const notes: Note[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    if (slug.startsWith('_')) return null;
    const { meta, body } = parseFrontmatter(raw);
    const title = meta.title ?? body.match(/^#\s+(.+)$/m)?.[1] ?? slug;
    return {
      slug,
      title,
      date: meta.date ?? '',
      direction: meta.direction ?? null,
      excerpt: toExcerpt(body),
      html: marked.parse(body) as string,
    };
  })
  .filter((n): n is Note => n !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

export const getNote = (slug: string | undefined): Note | undefined =>
  notes.find((n) => n.slug === slug);
