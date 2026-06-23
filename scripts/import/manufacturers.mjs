// JS regex \b is ASCII-only — it does not recognize Cyrillic letters as "word"
// characters, so \bОрман\b silently matches nothing. Use explicit lookaround
// boundaries instead so Cyrillic brand names are detected reliably.
function wordBoundaryRegex(word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![a-zа-яё0-9])${escaped}(?![a-zа-яё0-9])`, 'i');
}

// Brand detection is based strictly on literal mentions inside product names
// (or an honest "own production" tag for sheets that are explicitly the
// company's own manufacturing lines) — never invented.
export const BRAND_PATTERNS = [
  { slug: 'iek', name: 'IEK', re: wordBoundaryRegex('IEK') },
  { slug: 'ensto', name: 'Ensto', re: wordBoundaryRegex('ENSTO') },
  { slug: 'chint', name: 'CHINT', re: wordBoundaryRegex('CHINT') },
  { slug: 'eti', name: 'ETI Electroelement', re: wordBoundaryRegex('ETI') },
  { slug: 'metz', name: 'МЭТЗ им. В.И. Козлова', re: /МЭТЗ/i },
  { slug: 'ktz', name: 'КТЗ', re: wordBoundaryRegex('КТЗ') },
  { slug: 'zetarus', name: 'ЗЭТАРУС', re: /ЗЭТАРУС/i },
  { slug: 'orman', name: 'Орман', re: wordBoundaryRegex('Орман') },
  { slug: 'dala', name: 'Дала', re: wordBoundaryRegex('Дала') },
];

// Sheets that are the company's own production lines — used as a fallback
// "own production" manufacturer tag when no third-party brand is mentioned.
export const OWN_PRODUCTION_SHEETS = new Set(['УКМ', 'ЩИТЫ 0,4', 'ТРАВЕРСЫ']);

export function matchManufacturer(name, sheetName) {
  for (const brand of BRAND_PATTERNS) {
    if (brand.re.test(name)) return brand.slug;
  }
  if (OWN_PRODUCTION_SHEETS.has(sheetName)) return 'involt-production';
  return null;
}

// Some sheets (e.g. АВТОМАТИКА) state the brand only once, in a section
// header ("Автоматические выключатели CHINT"), not on every product row —
// this lets the importer carry that brand forward as context.
export function detectBrandInHeader(headerText) {
  for (const brand of BRAND_PATTERNS) {
    if (brand.re.test(headerText)) return brand.slug;
  }
  return null;
}

export const MANUFACTURER_NAMES = {
  ...Object.fromEntries(BRAND_PATTERNS.map((b) => [b.slug, b.name])),
  'involt-production': 'Собственное производство',
};
