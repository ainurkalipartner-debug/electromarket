import { normalizeWhitespace } from './slugify.mjs';

const SKIP_TEXT_PATTERNS = [
  /^наименован/i,
  /^фото$/i,
  /^изображени/i,
  /^описание$/i,
  /^ед\.?\s*изм/i,
  /^серия\s*\/?\s*проект/i,
  /^№\s*п?\/?п?$/i,
  /^код(\s*тмц)?$/i,
  /^цена/i,
  /^стоимость/i,
];

const FOOTER_PATTERNS = [/тел\.?\s*:/i, /e-mail/i, /www\./i];

const MAX_NAME_LENGTH = 200;

function cellAddr(col, row0) {
  return `${col}${row0 + 1}`;
}

export function getCellValue(ws, col, row0) {
  const cell = ws[cellAddr(col, row0)];
  if (!cell || cell.v === undefined || cell.v === null) return '';
  return String(cell.v);
}

export function getCellFillColor(ws, col, row0) {
  const cell = ws[cellAddr(col, row0)];
  if (!cell || !cell.s || !cell.s.fgColor) return null;
  return cell.s.fgColor.rgb || null;
}

function isSkippableText(text) {
  const t = text.trim();
  if (!t) return true;
  if (t.startsWith('*')) return true;
  if (t.length > MAX_NAME_LENGTH) return true;
  if (FOOTER_PATTERNS.some((re) => re.test(t))) return true;
  if (SKIP_TEXT_PATTERNS.some((re) => re.test(t))) return true;
  return false;
}

function hasAnyPrice(ws, priceCols, row0) {
  return (priceCols || []).some((col) => getCellValue(ws, col, row0).trim() !== '');
}

/** Header rows are colored (any non-white fill); product rows are white/unfilled —
 * unless a colored row still carries a price, in which case it's a real product
 * that happens to be shaded (seen in ПТИЦЕЗАЩИТА). */
export function classifyFillColorRow(ws, row0, cfg) {
  const name = normalizeWhitespace(getCellValue(ws, cfg.nameCol, row0));
  if (isSkippableText(name)) return { type: 'skip' };

  const color = getCellFillColor(ws, cfg.nameCol, row0);
  const isWhite = !color || color === 'FFFFFF';
  if (isWhite) return { type: 'product', name };

  if (hasAnyPrice(ws, cfg.priceCols, row0)) {
    return { type: 'product', name };
  }
  return { type: 'header', name };
}

/** ТРАВЕРСЫ / САЙМАН layout: header rows put text in the index column and leave
 * the name column blank; product rows have a running number in the index column
 * and the real name in the name column. */
export function classifyColumnShiftRow(ws, row0, cfg) {
  const name = normalizeWhitespace(getCellValue(ws, cfg.nameCol, row0));
  if (name && !isSkippableText(name)) {
    return { type: 'product', name };
  }
  const headerText = normalizeWhitespace(getCellValue(ws, cfg.indexCol, row0));
  if (headerText && !isSkippableText(headerText) && !/^\d+$/.test(headerText)) {
    return { type: 'header', name: headerText };
  }
  return { type: 'skip' };
}

/** Flat brand listing (ЭНСТО): no section headers at all, every non-empty,
 * non-skippable name row is a product. */
export function classifyFlatRow(ws, row0, cfg) {
  const name = normalizeWhitespace(getCellValue(ws, cfg.nameCol, row0));
  if (isSkippableText(name)) return { type: 'skip' };
  return { type: 'product', name };
}

export function classifyRow(ws, row0, cfg) {
  if (cfg.headerMode === 'columnShift') return classifyColumnShiftRow(ws, row0, cfg);
  if (cfg.headerMode === 'flat') return classifyFlatRow(ws, row0, cfg);
  return classifyFillColorRow(ws, row0, cfg);
}
