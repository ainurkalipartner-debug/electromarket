import { getEntryText, getEntryBuffer } from './zip-utils.mjs';
import { parseRelsMap } from './workbook-map.mjs';

function resolveRelTarget(basePath, target) {
  // basePath like "xl/drawings/drawing1.xml", target like "../media/image1.jpg"
  const baseDir = basePath.split('/').slice(0, -1); // ["xl","drawings"]
  const parts = target.split('/');
  const stack = [...baseDir];
  for (const part of parts) {
    if (part === '..') stack.pop();
    else if (part === '.') continue;
    else stack.push(part);
  }
  return stack.join('/');
}

function findDrawingPathForSheet(zip, sheetRelsPath) {
  const relsXml = getEntryText(zip, sheetRelsPath);
  if (!relsXml) return null;
  const re = /<Relationship[^>]*Id="([^"]+)"[^>]*Type="[^"]*\/drawing"[^>]*Target="([^"]+)"[^>]*\/?>/;
  const m = re.exec(relsXml);
  if (!m) return null;
  // sheetRelsPath: "xl/worksheets/_rels/sheet1.xml.rels" describes relationships
  // FROM "xl/worksheets/sheet1.xml" — relative targets resolve against that file's dir.
  const sheetFile = sheetRelsPath.split('/').pop().replace(/\.rels$/, '');
  const owningSheetPath = `xl/worksheets/${sheetFile}`;
  return resolveRelTarget(owningSheetPath, m[2]);
}

/**
 * Builds Map<rowIndex(0-based), { ext, buffer }> for a single sheet's drawing.
 */
function getRowImageMapForDrawing(zip, drawingXmlPath) {
  const xml = getEntryText(zip, drawingXmlPath);
  const map = new Map();
  if (!xml) return map;

  const drawingFile = drawingXmlPath.split('/').pop();
  const drawingRelsPath = `xl/drawings/_rels/${drawingFile}.rels`;
  const relsMap = parseRelsMap(getEntryText(zip, drawingRelsPath));

  const anchorRe = /<xdr:(oneCellAnchor|twoCellAnchor)>([\s\S]*?)<\/xdr:\1>/g;
  let am;
  while ((am = anchorRe.exec(xml))) {
    const block = am[2];
    const fromMatch = /<xdr:from>([\s\S]*?)<\/xdr:from>/.exec(block);
    if (!fromMatch) continue;
    const rowMatch = /<xdr:row>(\d+)<\/xdr:row>/.exec(fromMatch[1]);
    if (!rowMatch) continue;
    const row = parseInt(rowMatch[1], 10);

    const embedMatch = /r:embed="(rId\d+)"/.exec(block);
    if (!embedMatch) continue;
    const target = relsMap[embedMatch[1]];
    if (!target) continue;

    const mediaPath = resolveRelTarget(drawingXmlPath, target);
    if (map.has(row)) continue; // keep first image found for a row
    map.set(row, mediaPath);
  }
  return map;
}

/**
 * Returns Map<sheetName, Map<rowIndex, mediaPath>> for the given sheet names.
 */
export function buildImageIndex(zip, sheetFileMap, sheetNames) {
  const result = new Map();
  for (const sheetName of sheetNames) {
    const entry = sheetFileMap[sheetName];
    if (!entry) continue;
    const drawingPath = findDrawingPathForSheet(zip, entry.sheetRelsPath);
    if (!drawingPath) continue;
    const rowMap = getRowImageMapForDrawing(zip, drawingPath);
    result.set(sheetName, rowMap);
  }
  return result;
}

export function readMediaBuffer(zip, mediaPath) {
  return getEntryBuffer(zip, mediaPath);
}
