import { MAX_FILE_BYTES, type FileCategory, type StudioFile } from './policy';
export async function saveStudioFile(file: File, category: FileCategory): Promise<StudioFile> {
  if (!file.size || file.size > MAX_FILE_BYTES) throw new Error('Choose a non-empty file under 5 MB.');
  const form = new FormData(); form.set('file', file); form.set('category', category);
  const response = await fetch('/api/studio/files', { method: 'POST', body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'File could not be saved.');
  return data.file;
}
export async function loadStudioFile(file: StudioFile): Promise<File> {
  const response = await fetch(`/api/studio/files/content?key=${encodeURIComponent(file.key)}`);
  if (!response.ok) { const data = await response.json(); throw new Error(data.error || 'File could not be downloaded.'); }
  return new File([await response.blob()], file.name);
}
