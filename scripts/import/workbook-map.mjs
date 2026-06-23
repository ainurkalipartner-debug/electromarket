import { getEntryText } from './zip-utils.mjs';

function parseRelsMap(relsXml) {
  const map = {};
  if (!relsXml) return map;
  const re = /<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*\/?>/g;
  let m;
  while ((m = re.exec(relsXml))) {
    map[m[1]] = m[2];
  }
  return map;
}

/**
 * Returns { [sheetName]: { sheetXmlPath, sheetRelsPath } } resolved from
 * xl/workbook.xml + xl/_rels/workbook.xml.rels
 */
export function getSheetFileMap(zip) {
  const workbookXml = getEntryText(zip, 'xl/workbook.xml');
  const workbookRels = parseRelsMap(getEntryText(zip, 'xl/_rels/workbook.xml.rels'));

  const sheetMap = {};
  const sheetRe = /<sheet[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"[^>]*\/?>/g;
  let m;
  while ((m = sheetRe.exec(workbookXml))) {
    const name = m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    const rId = m[2];
    const target = workbookRels[rId];
    if (!target) continue;
    const sheetXmlPath = `xl/${target.replace(/^\/?xl\//, '')}`;
    const sheetFile = sheetXmlPath.split('/').pop();
    const sheetRelsPath = `xl/worksheets/_rels/${sheetFile}.rels`;
    sheetMap[name] = { sheetXmlPath, sheetRelsPath };
  }
  return sheetMap;
}

export { parseRelsMap };
