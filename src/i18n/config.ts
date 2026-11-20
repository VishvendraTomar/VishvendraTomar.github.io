export const languages = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', og: 'en_GB' },
  de: { name: 'Deutsch', short: 'DE', htmlLang: 'de', og: 'de_DE' },
  fr: { name: 'Français', short: 'FR', htmlLang: 'fr', og: 'fr_FR' },
  nl: { name: 'Nederlands', short: 'NL', htmlLang: 'nl', og: 'nl_NL' },
  it: { name: 'Italiano', short: 'IT', htmlLang: 'it', og: 'it_IT' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];
export const otherLangs = langs.filter(l => l !== defaultLang);

/** Routes that exist in every language. Everything else (architecture, writing, RSS) is English only. */
const translated = [/^\/$/, /^\/work\/(.*)$/, /^\/about\/$/, /^\/contact\/$/, /^\/work-with-me\/$/, /^\/countries\/$/];

export function isTranslated(path: string) {
  return translated.some(r => r.test(path));
}

/** Split "/de/work/x/" into { lang: 'de', path: '/work/x/' }. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const p = pathname.endsWith('/') ? pathname : pathname + '/';
  const m = p.match(/^\/([a-z]{2})(\/.*)$/);
  if (m && (otherLangs as string[]).includes(m[1])) return { lang: m[1] as Lang, path: m[2] };
  return { lang: defaultLang, path: p };
}

/** The URL of an English path in another language. Untranslated pages stay in English. */
export function localize(path: string, lang: Lang) {
  if (lang === defaultLang || !isTranslated(path.split('#')[0])) return path;
  return '/' + lang + path;
}
