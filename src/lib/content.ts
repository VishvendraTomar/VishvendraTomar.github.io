import type { Lang } from '../i18n/config';

const studyFiles = import.meta.glob('../content/studies/**/*.md', { eager: true }) as Record<string, any>;
const posts = Object.values(import.meta.glob('../content/writing/*.md', { eager: true })) as any[];

/** English studies live in studies/*.md; translations in studies/<lang>/*.md with the same slug. */
const byLang: Record<string, any[]> = {};
for (const [path, entry] of Object.entries(studyFiles)) {
  const m = path.match(/studies\/(?:([a-z]{2})\/)?[^/]+\.md$/);
  const lang = m?.[1] ?? 'en';
  (byLang[lang] ??= []).push(entry);
}
const sortCases = (list: any[]) => list.sort((a, b) => a.frontmatter.order - b.frontmatter.order);

export const cases = sortCases(byLang.en ?? []);

/** Case studies in a language, falling back to English for any study not yet translated. */
export function casesFor(lang: Lang) {
  if (lang === 'en') return cases;
  const translated = byLang[lang] ?? [];
  return sortCases(cases.map(en => translated.find(t => t.frontmatter.slug === en.frontmatter.slug) ?? en));
}

export const writing = posts.filter(entry => entry.frontmatter.published === true).sort((a,b) => b.frontmatter.date.localeCompare(a.frontmatter.date) || a.frontmatter.title.localeCompare(b.frontmatter.title));
export const figures = {
  registration: ['Shift registration', 'A shift change creates a registration job. A submitter takes it from the queue and calls Dimona. Failed attempts can retry. Exhausted jobs go to a dead-letter queue.', 'workforce-infrastructure'],
  attendance: ['From clock-in to invoice', 'Secure NFC, venue Wi-Fi and location inform the attendance check. Recorded hours flow into wages, invoices and filings.', 'workforce-infrastructure'],
  wages: ['Wages and compliance', 'Shift data and applicable rules enter the wage and compliance engine. It produces checked pay and compliance results.', 'workforce-infrastructure'],
  agents: ['Domain checks for AI tools', 'An agent calls an MCP tool. Domain-level checks govern the requested operation before it reaches core services.', 'workforce-infrastructure'],
  automation: ['An analyst-defined workflow', 'A business analyst defines a process. The orchestrator coordinates agents running on AWS. Agents use MCP tools and pass their results to the next step.', 'antagents'],
  proposal: ['From brief to sales proposal', 'In this concept a client brief goes through requirements analysis, solution design and estimation to inform a sales proposal.', 'dealroom-ai']
} as const;
export type Figure = keyof typeof figures;
