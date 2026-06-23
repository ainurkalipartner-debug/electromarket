const VOLTAGE_RE = /(\d+(?:[.,]\d+)?\s*(?:-|–)\s*\d+(?:[.,]\d+)?\s*кВ|\d+(?:[.,]\d+)?\s*кВ)/i;

export function extractVoltage(text) {
  if (!text) return null;
  const m = VOLTAGE_RE.exec(String(text));
  if (!m) return null;
  return m[1].replace(/\s+/g, ' ').replace(',', '.').trim();
}
