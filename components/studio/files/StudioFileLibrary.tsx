'use client';
import { useCallback, useEffect, useState } from 'react';
import { ArrowDownToLine, File, FolderOpen, Loader2, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { StudioAccountGate } from '@/components/studio/StudioAccountGate';
import type { ConsoleTheme } from '@/components/console/console-theme';
import { fileCategories, type FileCategory, type StudioFile } from '@/lib/studio-files/policy';
import { loadStudioFile, saveStudioFile } from '@/lib/studio-files/client';
import styles from '../marketing/marketing.module.css';

type Props = { theme: ConsoleTheme; isDark: boolean; onUseFile?: (file: File, category: FileCategory) => Promise<void> };
export function StudioFileLibrary(props: Props) {
  const [configuration, setConfiguration] = useState<{ configured: boolean; missing: string[] } | null>(null);
  const [error, setError] = useState('');
  const check = useCallback(async () => {
    setError('');
    try { const response = await fetch('/api/studio/files?status=1'); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Storage status could not be checked.'); setConfiguration(data); }
    catch (error) { setError(error instanceof Error ? error.message : 'Storage status could not be checked.'); }
  }, []);
  useEffect(() => { void check(); }, [check]);
  if (!configuration || !configuration.configured) return <section className={styles.panel}><FolderOpen size={28} /><h3>Files, saved to your Studio account.</h3><p>Keep campaign exports, reports, creative images, workspace snapshots and writing documents in a private Neon bucket.</p>{error && <p role="alert">{error}</p>}{configuration && <><p>Storage is waiting for configuration. Add these server environment variables:</p><pre className={styles.review}>{configuration.missing.join('\n')}</pre><p>Setup instructions: <code>config/studio-services.env.example</code> and <code>docs/marketing-studio.md</code>.</p></>}<button className={styles.secondary} onClick={() => void check()}><RefreshCw size={15} />Check configuration</button></section>;
  return <StudioAccountGate theme={props.theme} isDark={props.isDark} toolName="Files">{({ firstName, onSignOut }) => <FileList firstName={firstName} onSignOut={onSignOut} onUseFile={props.onUseFile} />}</StudioAccountGate>;
}
function FileList({ firstName, onSignOut, onUseFile }: { firstName: string; onSignOut: () => void; onUseFile?: Props['onUseFile'] }) {
  const [files, setFiles] = useState<StudioFile[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [category, setCategory] = useState<FileCategory>('documents');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const load = useCallback(async (next?: string) => {
    setBusy(true);
    try { const response = await fetch(`/api/studio/files${next ? `?cursor=${encodeURIComponent(next)}` : ''}`); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Files could not be loaded.'); setFiles(prev => next ? [...prev, ...data.files] : data.files); setCursor(data.nextToken); }
    catch (error) { setNotice(error instanceof Error ? error.message : 'Files could not be loaded.'); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  async function useFile(file: StudioFile, restore: boolean) {
    setBusy(true); setNotice('');
    try {
      const data = await loadStudioFile(file);
      if (restore && onUseFile) await onUseFile(data, file.category);
      else { const url = URL.createObjectURL(data); const a = document.createElement('a'); a.href = url; a.download = data.name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Could not open file.'); }
    finally { setBusy(false); }
  }
  return <section className={styles.panel}><div className={styles.between}><div><h3>{firstName}’s saved files</h3><p>Private Neon storage · available wherever you sign in to this Studio account.</p></div><div className={styles.fileActions}><button className={styles.textButton} disabled={busy} onClick={() => void load()}><RefreshCw size={15} />Refresh</button><button className={styles.textButton} disabled={busy} onClick={onSignOut}>Sign out</button></div></div>
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    <div className={styles.form}><label>Save to category<select value={category} onChange={e => setCategory(e.target.value as FileCategory)}>{fileCategories.map(c => <option key={c}>{c}</option>)}</select></label><label className={styles.dropzone}><UploadCloud size={28} /><strong>{busy ? 'Working…' : 'Save a file to Neon'}</strong><span>Documents, spreadsheets, images, reports and JSON · up to 5 MB</span><input type="file" disabled={busy} accept=".csv,.tsv,.xlsx,.pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.json,.docx" onChange={async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; setBusy(true); setNotice(''); try { await saveStudioFile(file, category); await load(); setNotice(`${file.name} saved to Neon.`); } catch (error) { setNotice(error instanceof Error ? error.message : 'File was not saved.'); } finally { setBusy(false); } }} /></label></div>
    <div className={styles.tableWrap}><table><thead><tr><th>File</th><th>Category</th><th>Size</th><th>Saved</th><th>Actions</th></tr></thead><tbody>{[...files].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(file => <tr key={file.key}><td><File size={14} className={styles.inlineIcon} />{file.name}</td><td>{file.category}</td><td>{(file.size / 1024).toFixed(1)} KB</td><td>{new Date(file.updatedAt).toLocaleDateString('en-GB')}</td><td><div className={styles.fileActions}><button className={styles.textButton} disabled={busy} onClick={() => void useFile(file, false)} aria-label={`Download ${file.name}`}><ArrowDownToLine size={15} /></button>{onUseFile && ['campaigns', 'workspaces'].includes(file.category) && <button className={styles.textButton} disabled={busy} onClick={() => void useFile(file, true)}>{file.category === 'workspaces' ? 'Restore copy' : 'Use in analysis'}</button>}{pendingDelete === file.key ? <><button className={styles.textButton} disabled={busy} onClick={async () => { setBusy(true); try { const response = await fetch(`/api/studio/files?key=${encodeURIComponent(file.key)}`, { method: 'DELETE' }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Delete failed.'); setFiles(prev => prev.filter(f => f.key !== file.key)); setPendingDelete(null); setNotice('File deleted from Neon.'); } catch (error) { setNotice(error instanceof Error ? error.message : 'Delete failed.'); } finally { setBusy(false); } }}>Delete permanently</button><button className={styles.textButton} onClick={() => setPendingDelete(null)}>Cancel</button></> : <button className={styles.textButton} disabled={busy} onClick={() => setPendingDelete(file.key)} aria-label={`Delete ${file.name}`}><Trash2 size={15} /></button>}</div></td></tr>)}</tbody></table></div>
    {!files.length && !busy && <div className={styles.empty}>No saved files yet. Upload one here or use a Save to Files button in Marketing.</div>}{busy && <p><Loader2 size={15} className={styles.inlineIcon} /> Working with your private files…</p>}{cursor && <button className={styles.secondary} disabled={busy} onClick={() => void load(cursor)}>Load more files</button>}
  </section>;
}
