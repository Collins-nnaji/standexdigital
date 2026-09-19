export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const fileCategories = ['campaigns', 'reports', 'creatives', 'workspaces', 'documents'] as const;
export type FileCategory = typeof fileCategories[number];
export type StudioFile = { key: string; name: string; category: FileCategory; size: number; updatedAt: string };
const extensions: Record<string, string> = {
  csv: 'text/csv', tsv: 'text/tab-separated-values', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
  txt: 'text/plain', md: 'text/markdown', json: 'application/json', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export function fileType(name: string) {
  const extension = name.split('.').at(-1)?.toLowerCase() || '';
  const type = extensions[extension];
  if (!type) throw new Error('Supported files: CSV, TSV, XLSX, PDF, PNG, JPEG, WebP, TXT, Markdown, JSON and DOCX.');
  return type;
}
export function safeFileName(name: string) {
  const clean = name.split(/[\\/]/).at(-1)!.normalize('NFKC').replace(/[^a-zA-Z0-9 ._()-]/g, '_').replace(/\.{2,}/g, '.').replace(/^\.+/, '').slice(-160).trim();
  if (!clean) throw new Error('Choose a file with a valid name.');
  fileType(clean);
  return clean;
}
export function accountPrefix(accountId: string) {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(accountId)) throw new Error('Invalid account.');
  return `studio/${accountId}/`;
}
export function ownedFileKey(accountId: string, key: string) {
  if (typeof key !== 'string' || key.length > 500 || !key.startsWith(accountPrefix(accountId)) || key.includes('..') || /[\x00-\x1f\\]/.test(key)) return false;
  const parts = key.slice(accountPrefix(accountId).length).split('/');
  return parts.length === 3 && fileCategories.includes(parts[0] as FileCategory) && /^[a-f0-9-]{36}$/.test(parts[1]) && Boolean(parts[2]);
}
export function describeFile(key: string, size: number, updatedAt: Date): StudioFile {
  const parts = key.split('/');
  return { key, name: parts.at(-1) || 'file', category: parts[2] as FileCategory, size, updatedAt: updatedAt.toISOString() };
}
