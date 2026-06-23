import AdmZip from 'adm-zip';

export function openXlsxZip(filePath) {
  return new AdmZip(filePath);
}

export function getEntryText(zip, entryPath) {
  const entry = zip.getEntry(entryPath);
  if (!entry) return null;
  return zip.readAsText(entry, 'utf8');
}

export function getEntryBuffer(zip, entryPath) {
  const entry = zip.getEntry(entryPath);
  if (!entry) return null;
  return zip.readFile(entry);
}

export function listEntryNames(zip) {
  return zip.getEntries().map((e) => e.entryName);
}
