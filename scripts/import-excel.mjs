import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

import { openXlsxZip } from './import/zip-utils.mjs';
import { getSheetFileMap } from './import/workbook-map.mjs';
import { buildImageIndex, readMediaBuffer } from './import/extract-images.mjs';
import { classifyRow } from './import/classify-rows.mjs';
import { buildProduct } from './import/build-product.mjs';
import { routeSection } from './import/section-router.mjs';
import { SHEET_CONFIGS, MANUAL_ENTRIES } from './import/sheet-configs.mjs';
import { CATEGORIES } from './import/categories-meta.mjs';
import { MANUFACTURER_NAMES, detectBrandInHeader } from './import/manufacturers.mjs';
import { slugify, shortHash } from './import/slugify.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_XLSX = path.join(ROOT, 'ПРАЙС Торговый дом ИНВОЛЬТ 2026..xlsx');

const DATA_DIR = path.join(ROOT, 'src', 'data');
const PRODUCTS_DIR = path.join(DATA_DIR, 'products');
const PUBLIC_PRODUCTS_DIR = path.join(ROOT, 'public', 'images', 'products');
const PUBLIC_CATEGORIES_DIR = path.join(ROOT, 'public', 'images', 'categories');

const categoryNames = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.name]));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extOf(mediaPath) {
  const m = /\.(\w+)$/.exec(mediaPath);
  return m ? m[1].toLowerCase() : 'jpg';
}

console.log('Reading workbook (this can take a little while for a 54MB file)...');
const t0 = Date.now();
const workbook = XLSX.readFile(SOURCE_XLSX, { cellStyles: true, cellHTML: false, sheetStubs: false });
console.log(`Workbook loaded in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

const zip = openXlsxZip(SOURCE_XLSX);
const sheetFileMap = getSheetFileMap(zip);
const sheetNamesNeedingImages = SHEET_CONFIGS.map((c) => c.sheetName);
const imageIndex = buildImageIndex(zip, sheetFileMap, sheetNamesNeedingImages);

const allProducts = [];
const report = { sheets: {}, categories: {}, totalProducts: 0, totalWithImage: 0 };

for (const cfg of SHEET_CONFIGS) {
  const ws = workbook.Sheets[cfg.sheetName];
  if (!ws || !ws['!ref']) {
    console.warn(`Sheet not found or empty: ${cfg.sheetName}`);
    continue;
  }
  const range = XLSX.utils.decode_range(ws['!ref']);
  const sheetImageMap = imageIndex.get(cfg.sheetName) || new Map();

  const ctx = { currentCategorySlug: cfg.defaultCategory, currentSubcategoryHeader: null, currentBrandHint: null };
  const stats = { headers: 0, products: 0, skipped: 0, withImage: 0 };

  for (let row0 = range.s.r; row0 <= range.e.r; row0++) {
    const result = classifyRow(ws, row0, cfg);
    if (result.type === 'skip') {
      stats.skipped++;
      continue;
    }
    if (result.type === 'header') {
      stats.headers++;
      ctx.currentSubcategoryHeader = result.name;
      if (cfg.sectionRouter) {
        ctx.currentCategorySlug = routeSection(cfg.sectionRouter, result.name, ctx.currentCategorySlug);
      }
      const brandHint = detectBrandInHeader(result.name);
      if (brandHint) ctx.currentBrandHint = brandHint;
      continue;
    }
    // product
    if (cfg.skipIf && cfg.skipIf(result.name)) {
      stats.skipped++;
      continue;
    }
    const imageMediaPath = sheetImageMap.get(row0) || null;
    const product = buildProduct({
      ws,
      row0,
      name: result.name,
      sheetName: cfg.sheetName,
      cfg,
      ctx,
      categoryNames,
      manufacturerNames: MANUFACTURER_NAMES,
      imageMediaPath,
    });
    if (imageMediaPath) stats.withImage++;
    stats.products++;
    allProducts.push(product);
  }

  report.sheets[cfg.sheetName] = stats;
}

// manual ЩИТЫ 0,4 entries
for (let i = 0; i < MANUAL_ENTRIES.length; i++) {
  const entry = MANUAL_ENTRIES[i];
  const id = `${slugify(entry.name)}-${shortHash(`${entry.sourceSheet}:manual:${i}`)}`;
  allProducts.push({
    id,
    slug: id,
    sku: null,
    name: entry.name,
    categorySlug: entry.categorySlug,
    subcategoryName: null,
    manufacturerSlug: 'involt-production',
    voltageClass: null,
    description: entry.description,
    specs: {},
    status: 'Под заказ',
    keywords: [entry.name.toLowerCase(), 'инвольт', 'собственное производство'],
    sourceSheet: entry.sourceSheet,
    sourceRow: null,
    _imageMediaPath: null,
  });
  report.sheets[entry.sourceSheet] = report.sheets[entry.sourceSheet] || { headers: 0, products: 0, skipped: 0, withImage: 0 };
  report.sheets[entry.sourceSheet].products++;
}

// --- copy product images, resolve final `image` field ---
ensureDir(PUBLIC_PRODUCTS_DIR);
ensureDir(PUBLIC_CATEGORIES_DIR);

for (const product of allProducts) {
  if (product._imageMediaPath) {
    const buf = readMediaBuffer(zip, product._imageMediaPath);
    if (buf) {
      const ext = extOf(product._imageMediaPath);
      const fileName = `${product.id}.${ext}`;
      fs.writeFileSync(path.join(PUBLIC_PRODUCTS_DIR, fileName), buf);
      product.image = `/images/products/${fileName}`;
      report.totalWithImage++;
    } else {
      product.image = null;
    }
  } else {
    product.image = null;
  }
  delete product._imageMediaPath;
}

// --- representative category images (first product photo found per category) ---
const categoryImage = {};
for (const product of allProducts) {
  if (product.image && !categoryImage[product.categorySlug]) {
    categoryImage[product.categorySlug] = product.image;
  }
}
for (const [slug, imagePath] of Object.entries(categoryImage)) {
  const srcAbs = path.join(ROOT, 'public', imagePath.replace(/^\//, ''));
  const ext = extOf(imagePath);
  const destAbs = path.join(PUBLIC_CATEGORIES_DIR, `${slug}.${ext}`);
  fs.copyFileSync(srcAbs, destAbs);
  categoryImage[slug] = `/images/categories/${slug}.${ext}`;
}

// --- group by category, write per-category json + lightweight index ---
ensureDir(PRODUCTS_DIR);
const byCategory = new Map();
for (const product of allProducts) {
  if (!byCategory.has(product.categorySlug)) byCategory.set(product.categorySlug, []);
  byCategory.get(product.categorySlug).push(product);
}

const indexEntries = [];
for (const [slug, products] of byCategory.entries()) {
  fs.writeFileSync(path.join(PRODUCTS_DIR, `${slug}.json`), JSON.stringify(products, null, 0));
  for (const p of products) {
    indexEntries.push({
      id: p.id,
      slug: p.slug,
      name: p.name,
      sku: p.sku,
      categorySlug: p.categorySlug,
      manufacturerSlug: p.manufacturerSlug,
      voltageClass: p.voltageClass,
      image: p.image,
      status: p.status,
      keywords: p.keywords,
    });
  }
  report.categories[slug] = products.length;
}
fs.writeFileSync(path.join(PRODUCTS_DIR, 'index.json'), JSON.stringify(indexEntries, null, 0));

// --- categories.js ---
const categoriesOut = CATEGORIES.map((c) => ({
  ...c,
  productCount: byCategory.get(c.slug)?.length || 0,
  image: categoryImage[c.slug] || null,
}));
fs.writeFileSync(
  path.join(DATA_DIR, 'categories.js'),
  `// Auto-generated by scripts/import-excel.mjs — do not edit by hand.\nexport const CATEGORIES = ${JSON.stringify(categoriesOut, null, 2)};\n\nexport function getCategory(slug) {\n  return CATEGORIES.find((c) => c.slug === slug) || null;\n}\n`
);

// --- manufacturers.js ---
const manufacturerCounts = {};
for (const product of allProducts) {
  if (!product.manufacturerSlug) continue;
  manufacturerCounts[product.manufacturerSlug] = (manufacturerCounts[product.manufacturerSlug] || 0) + 1;
}
const manufacturersOut = Object.entries(manufacturerCounts)
  .map(([slug, productCount]) => ({ slug, name: MANUFACTURER_NAMES[slug] || slug, productCount }))
  .sort((a, b) => b.productCount - a.productCount);
fs.writeFileSync(
  path.join(DATA_DIR, 'manufacturers.js'),
  `// Auto-generated by scripts/import-excel.mjs — do not edit by hand.\nexport const MANUFACTURERS = ${JSON.stringify(manufacturersOut, null, 2)};\n\nexport function getManufacturer(slug) {\n  return MANUFACTURERS.find((m) => m.slug === slug) || null;\n}\n`
);

// --- products.js: data-access module, not a raw array ---
fs.writeFileSync(
  path.join(DATA_DIR, 'products.js'),
  `// Auto-generated by scripts/import-excel.mjs — do not edit by hand.
// Product records live in per-category JSON chunks under ./products/*.json so
// visiting one category never downloads another category's data.
const categoryModules = import.meta.glob('./products/*.json');

async function loadCategoryFile(slug) {
  const loader = categoryModules[\`./products/\${slug}.json\`];
  if (!loader) return [];
  const mod = await loader();
  return mod.default;
}

export async function getCategoryProducts(categorySlug) {
  return loadCategoryFile(categorySlug);
}

let indexCache = null;
async function getIndex() {
  if (!indexCache) {
    indexCache = loadCategoryFile('index');
  }
  return indexCache;
}

export async function getProductBySlug(slug) {
  const index = await getIndex();
  const entry = index.find((p) => p.slug === slug);
  if (!entry) return null;
  const categoryProducts = await loadCategoryFile(entry.categorySlug);
  return categoryProducts.find((p) => p.slug === slug) || null;
}

export async function searchProducts(query) {
  const index = await getIndex();
  const tokens = query.toLowerCase().trim().split(/\\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return index.filter((p) => tokens.every((t) => p.keywords.some((k) => k.includes(t))));
}

export async function getSearchIndex() {
  return getIndex();
}
`
);

report.totalProducts = allProducts.length;
fs.writeFileSync(path.join(__dirname, 'import-report.json'), JSON.stringify(report, null, 2));

console.log('--- Import report ---');
console.log(JSON.stringify(report, null, 2));
console.log(`Total products: ${allProducts.length}, with image: ${report.totalWithImage}`);
console.log(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
