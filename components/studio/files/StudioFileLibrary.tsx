'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowDownToLine, File, FolderOpen, Loader2, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import type { ConsoleTheme } from '@/components/console/console-theme';
import { fileCategories, type FileCategory, type StudioFile } from '@/lib/studio-files/policy';
import { loadStudioFile, saveStudioFile } from '@/lib/studio-files/client';
import { useStudioView } from '@/components/studio/useStudioView';
import styles from '../marketing/marketing.module.css';

type Props = { theme: ConsoleTheme; isDark: boolean; onUseFile?: (file: File, category: FileCategory) => Promise<void> };

export function StudioFileLibrary(props: Props) {
  const [configuration, setConfiguration] = useState<{ configured: boolean; missing: string[] } | null>(null);
  const [error, setError] = useState('');
  const check = useCallback(async () => {
    setError('');
    try {
      const response = await fetch('/api/studio/files?status=1');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Storage status could not be checked.');
      setConfiguration(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Storage status could not be checked.');
    }
  }, []);
  useEffect(() => { void check(); }, [check]);
  if (!configuration || !configuration.configured) {
    return (
      <section className={styles.panel}>
        <FolderOpen size={28} />
        <h3>Data Hub</h3>
        <p>Keep campaign exports, reports, creatives, brand files and writing documents in one private place.</p>
        {error && <p role="alert">{error}</p>}
        {configuration && (
          <>
            <p>Storage is waiting for configuration. Add these server environment variables:</p>
            <pre className={styles.review}>{configuration.missing.join('\n')}</pre>
            <p>Setup instructions: <code>config/studio-services.env.example</code>.</p>
          </>
        )}
        <button className={styles.secondary} onClick={() => void check()}><RefreshCw size={15} />Check configuration</button>
      </section>
    );
  }
  return <FileList onUseFile={props.onUseFile} />;
}

function FileList({ onUseFile }: { onUseFile?: Props['onUseFile'] }) {
  const pathname = usePathname();
  const inFilesSection = pathname === '/studio/data';
  const [urlView, setUrlView] = useStudioView(fileCategories, 'documents');
  const [localCategory, setLocalCategory] = useState<FileCategory>('documents');
  const [files, setFiles] = useState<StudioFile[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const category = inFilesSection ? urlView : localCategory;
  const setCategory = (next: FileCategory) => (inFilesSection ? setUrlView(next) : setLocalCategory(next));
  const visible = useMemo(() => files.filter((file) => file.category === category).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [files, category]);

  const load = useCallback(async (next?: string) => {
    setBusy(true);
    try {
      const response = await fetch(`/api/studio/files${next ? `?cursor=${encodeURIComponent(next)}` : ''}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Files could not be loaded.');
      setFiles((prev) => (next ? [...prev, ...data.files] : data.files));
      setCursor(data.nextToken);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Files could not be loaded.');
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function useFile(file: StudioFile, restore: boolean) {
    setBusy(true);
    setNotice('');
    try {
      const data = await loadStudioFile(file);
      if (restore && onUseFile) await onUseFile(data, file.category);
      else {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not open file.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.between}>
        <div>
          <h3>Saved files</h3>
          <p>Private storage · open documents in Writing Lab, campaign files in Marketing.</p>
        </div>
        <div className={styles.fileActions}>
          <button className={styles.textButton} disabled={busy} onClick={() => void load()}><RefreshCw size={15} />Refresh</button>
        </div>
      </div>
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      <div className={styles.form}>
        <label>
          Save to category
          <select value={category} onChange={(e) => setCategory(e.target.value as FileCategory)}>
            {fileCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className={styles.dropzone}>
          <UploadCloud size={28} />
          <strong>{busy ? 'Working…' : 'Save a file'}</strong>
          <span>Documents, spreadsheets, images, reports and JSON · up to 5 MB</span>
          <input
            type="file"
            disabled={busy}
            accept=".csv,.tsv,.xlsx,.pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.json,.docx"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (!file) return;
              setBusy(true);
              setNotice('');
              try {
                await saveStudioFile(file, category);
                await load();
                setNotice(`${file.name} saved.`);
              } catch (error) {
                setNotice(error instanceof Error ? error.message : 'File was not saved.');
              } finally {
                setBusy(false);
              }
            }}
          />
        </label>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr><th>File</th><th>Category</th><th>Size</th><th>Saved</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {visible.map((file) => (
              <tr key={file.key}>
                <td><File size={14} className={styles.inlineIcon} />{file.name}</td>
                <td>{file.category}</td>
                <td>{(file.size / 1024).toFixed(1)} KB</td>
                <td>{new Date(file.updatedAt).toLocaleDateString('en-GB')}</td>
                <td>
                  <div className={styles.fileActions}>
                    <button className={styles.textButton} disabled={busy} onClick={() => void useFile(file, false)} aria-label={`Download ${file.name}`}><ArrowDownToLine size={15} /></button>
                    {onUseFile && (
                      <button className={styles.textButton} disabled={busy} onClick={() => void useFile(file, true)}>
                        {file.category === 'workspaces' ? 'Restore in Marketing' : file.category === 'campaigns' ? 'Analyse in Marketing' : 'Open in Studio'}
                      </button>
                    )}
                    {pendingDelete === file.key ? (
                      <>
                        <button className={styles.textButton} disabled={busy} onClick={async () => {
                          setBusy(true);
                          try {
                            const response = await fetch(`/api/studio/files?key=${encodeURIComponent(file.key)}`, { method: 'DELETE' });
                            const data = await response.json();
                            if (!response.ok) throw new Error(data.error || 'Delete failed.');
                            setFiles((prev) => prev.filter((f) => f.key !== file.key));
                            setPendingDelete(null);
                            setNotice('File deleted.');
                          } catch (error) {
                            setNotice(error instanceof Error ? error.message : 'Delete failed.');
                          } finally {
                            setBusy(false);
                          }
                        }}>Delete permanently</button>
                        <button className={styles.textButton} onClick={() => setPendingDelete(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className={styles.textButton} disabled={busy} onClick={() => setPendingDelete(file.key)} aria-label={`Delete ${file.name}`}><Trash2 size={15} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && !busy && <div className={styles.empty}>No files in {category} yet.</div>}
      {busy && <p><Loader2 size={15} className={styles.inlineIcon} /> Working with your files…</p>}
      {cursor && <button className={styles.secondary} disabled={busy} onClick={() => void load(cursor)}>Load more files</button>}
    </section>
  );
}
