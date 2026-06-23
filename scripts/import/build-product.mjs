import { getCellValue } from './classify-rows.mjs';
import { slugify, shortHash, normalizeWhitespace } from './slugify.mjs';
import { matchManufacturer } from './manufacturers.mjs';
import { extractVoltage } from './voltage.mjs';

const EXTRA_FIELD_LABELS = {
  enstoAnalog: 'Аналог ENSTO',
  niledAnalog: 'Аналог NILED',
  weight: 'Вес, кг',
  unit: 'Единица измерения',
  series: 'Серия/проект',
  insulatorType: 'Тип изоляторов, траверс, провода',
  mount: 'Крепление на проводе',
  kit: 'Комплектация',
};

function tokenize(...texts) {
  const tokens = new Set();
  for (const text of texts) {
    if (!text) continue;
    String(text)
      .toLowerCase()
      .split(/[^a-zа-яё0-9]+/i)
      .filter((t) => t.length >= 2)
      .forEach((t) => tokens.add(t));
  }
  return Array.from(tokens);
}

export function buildProduct({ ws, row0, name, sheetName, cfg, ctx, categoryNames, manufacturerNames, imageMediaPath }) {
  const sku = cfg.codeCol ? normalizeWhitespace(getCellValue(ws, cfg.codeCol, row0)) || null : null;

  const extra = {};
  const specs = {};
  if (cfg.extraCols) {
    for (const [key, col] of Object.entries(cfg.extraCols)) {
      const val = normalizeWhitespace(getCellValue(ws, col, row0));
      if (!val) continue;
      extra[key] = val;
      if (key !== 'voltage' && key !== 'description' && EXTRA_FIELD_LABELS[key]) {
        specs[EXTRA_FIELD_LABELS[key]] = val;
      }
    }
  }

  const voltageClass = extra.voltage || extractVoltage(name) || null;
  const description = extra.description || null;

  const categorySlug =
    (cfg.categoryOverride && cfg.categoryOverride(name)) ||
    ctx.currentCategorySlug ||
    cfg.defaultCategory;

  const subcategoryName = cfg.fixedSubcategoryPrefix || ctx.currentSubcategoryHeader || null;

  const manufacturerSlug = cfg.brandOverride || matchManufacturer(name, sheetName) || ctx.currentBrandHint || null;

  const id = `${slugify(name) || 'tovar'}-${shortHash(`${sheetName}:${row0}`)}`;

  const keywords = tokenize(
    name,
    sku,
    categoryNames[categorySlug],
    subcategoryName,
    manufacturerSlug ? manufacturerNames[manufacturerSlug] : null,
    voltageClass,
    sheetName
  );

  return {
    id,
    slug: id,
    sku,
    name,
    categorySlug,
    subcategoryName,
    manufacturerSlug,
    voltageClass,
    description,
    specs,
    status: 'Под заказ',
    keywords,
    sourceSheet: sheetName,
    sourceRow: row0,
    _imageMediaPath: imageMediaPath || null,
  };
}
