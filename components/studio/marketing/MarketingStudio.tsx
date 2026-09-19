'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ArrowDownToLine, ArrowRight, Check, FolderOpen, PenLine, Sparkles, UploadCloud } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { StudioShell } from '@/components/studio/StudioShell';
import { analyse, autoMap, demoWorkspace, fields, normalizeRows, type Mapping, type Workspace } from '@/lib/marketing/analytics';
import { readCampaignFile } from '@/lib/marketing/import';
import styles from './marketing.module.css';
import { saveStudioFile } from '@/lib/studio-files/client';
import type { FileCategory } from '@/lib/studio-files/policy';
import { restoreWorkspace } from '@/lib/marketing/workspace-file';
import { handoffToWriting, takeMarketingHandoff } from '@/lib/studio-handoff';
import { useStudioView } from '@/components/studio/useStudioView';

const MARKETING_VIEWS = ['campaigns', 'ads', 'performance'] as const;
const BRAND_STORAGE = 'standex-marketing-brand-v1';
const STORAGE = 'standex-marketing-v1';
const money = (n: number | null, currency: string) => n === null ? '—' : new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
const num = (n: number | null, suffix = '') => n === null ? '—' : `${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}${suffix}`;
function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`${styles.panel} ${className}`}>{children}</section>;
}
function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type Brand = { name: string; website: string; offer: string; audience: string; proof: string; tone: string };
const emptyBrand: Brand = { name: '', website: '', offer: '', audience: '', proof: '', tone: 'clear and confident' };
type CampaignIdea = { name: string; angle: string; channel: string; message: string; cta: string };
type GoogleAd = { finalUrl: string; path1: string; path2: string; headlines: string[]; descriptions: string[]; keywords: string[] };
function blankAd(brand: Brand): GoogleAd {
  return {
    finalUrl: brand.website || '',
    path1: '',
    path2: '',
    headlines: Array(15).fill(''),
    descriptions: Array(4).fill(''),
    keywords: [],
  };
}

export function MarketingStudio() {
  return (
    <StudioShell>
      {({ themeMode }) => <MarketingBody themeMode={themeMode} />}
    </StudioShell>
  );
}

function MarketingBody({ themeMode }: { themeMode: 'light' | 'dark' }) {
  const router = useRouter();
  const contextVersion = useRef(0);
  const [view] = useStudioView(MARKETING_VIEWS, 'campaigns');
  const [brand, setBrand] = useState<Brand>(emptyBrand);
  const [ideas, setIdeas] = useState<CampaignIdea[]>([]);
  const [ad, setAd] = useState<GoogleAd | null>(null);
  const [genBusy, setGenBusy] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([demoWorkspace()]);
  const [active, setActive] = useState('demo');
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  const [table, setTable] = useState<string[][] | null>(null);
  const [mapping, setMapping] = useState<Mapping>(autoMap([]));
  const [fileName, setFileName] = useState('');
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [savingFile, setSavingFile] = useState(false);
  const [busy, setBusy] = useState(false);
  const [briefing, setBriefing] = useState('');
  const [analystBusy, setAnalystBusy] = useState(false);
  const workspace = workspaces.find((w) => w.id === active) || workspaces[0];
  const analysis = useMemo(() => analyse(workspace), [workspace]);
  const cash = (n: number | null) => money(n, workspace.currency);

  useEffect(() => {
    try {
      const savedBrand = localStorage.getItem(BRAND_STORAGE);
      if (savedBrand) setBrand({ ...emptyBrand, ...JSON.parse(savedBrand) });
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.workspaces) && saved.workspaces.length) {
          setWorkspaces(saved.workspaces);
          setActive(saved.active || saved.workspaces[0].id);
        }
      }
    } catch { /* keep defaults */ }
    const handoff = takeMarketingHandoff();
    if (handoff?.kind === 'copy' && handoff.text) {
      const incoming = handoff.text;
      setBrand((prev) => ({ ...prev, offer: prev.offer ? `${prev.offer}\n\n${incoming}` : incoming }));
      setNotice('Copy from Writing Lab was added to your brand brief.');
    } else if (handoff?.kind === 'workspace' && handoff.text) {
      try {
        const restored = restoreWorkspace(handoff.text);
        setWorkspaces((prev) => [...prev, restored]);
        setActive(restored.id);
        setNotice('Brand workspace restored from Data Hub.');
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Workspace could not be restored.');
      }
    } else if (handoff?.kind === 'campaign' && handoff.text) {
      void upload(new File([handoff.text], handoff.fileName || 'campaign-export.csv'));
      setNotice('Campaign file from Data Hub is ready to map.');
    } else if (handoff?.text) {
      const incoming = handoff.text;
      setBrand((prev) => ({ ...prev, offer: prev.offer ? `${prev.offer}\n\n${incoming}` : incoming }));
      setNotice('Notes from Data Hub were added to your brand brief.');
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(BRAND_STORAGE, JSON.stringify(brand));
      localStorage.setItem(STORAGE, JSON.stringify({ workspaces, active }));
    } catch { setNotice('Browser storage is full. Download a copy if you need to keep this work.'); }
  }, [brand, workspaces, active, ready]);

  function patchBrand(patch: Partial<Brand>) { setBrand((prev) => ({ ...prev, ...patch })); }

  async function generate(mode: 'campaigns' | 'ads') {
    setGenBusy(true); setNotice('');
    try {
      const response = await fetch('/api/studio/marketing/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, brand }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed.');
      if (mode === 'campaigns') setIdeas(Array.isArray(data.ideas) ? data.ideas : []);
      else {
        const headlines = Array.isArray(data.headlines) ? data.headlines.map(String) : [];
        const descriptions = Array.isArray(data.descriptions) ? data.descriptions.map(String) : [];
        setAd({
          finalUrl: String(data.finalUrl || brand.website || ''),
          path1: String(data.path1 || '').slice(0, 15),
          path2: String(data.path2 || '').slice(0, 15),
          headlines: [...headlines, ...Array(Math.max(0, 15 - headlines.length)).fill('')].slice(0, 15),
          descriptions: [...descriptions, ...Array(Math.max(0, 4 - descriptions.length)).fill('')].slice(0, 4),
          keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        });
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Generation failed.');
    } finally { setGenBusy(false); }
  }

  function openInWriting(text: string, title?: string) {
    handoffToWriting({ text, title, from: 'marketing' });
    router.push('/studio/writing');
  }

  async function saveText(name: string, text: string, category: FileCategory) {
    setSavingFile(true); setNotice('');
    try {
      await saveStudioFile(new File([text], name, { type: 'text/plain' }), category);
      setNotice(`${name} saved to Data Hub.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not save to Data Hub.');
    } finally { setSavingFile(false); }
  }

  async function upload(file?: File) {
    if (!file) return; setBusy(true); setNotice(''); setTable(null); setSourceFile(null);
    try {
      const parsed = await readCampaignFile(file);
      setTable(parsed); setMapping(autoMap(parsed[0])); setFileName(file.name); setSourceFile(file);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Upload failed.');
    } finally { setBusy(false); }
  }

  function runAnalysis() {
    if (!table) return;
    try {
      const result = normalizeRows(table, mapping);
      contextVersion.current++; setBriefing('');
      if (workspace.demo) {
        const id = crypto.randomUUID();
        setWorkspaces((w) => [...w, { ...workspace, ...result, id, name: brand.name || 'My brand', demo: false, source: `Google Ads · ${fileName}` }]);
        setActive(id);
      } else {
        setWorkspaces((current) => current.map((w) => w.id === workspace.id ? { ...w, ...result, source: `Google Ads · ${fileName}`, demo: false } : w));
      }
      setTable(null);
      setNotice(`Analysis complete: ${result.rows.length.toLocaleString()} valid rows.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Check your data.');
    }
  }

  const brandForm = (
    <Panel>
      <span className={styles.eyebrow}>BRAND ASSETS</span>
      <h3>The facts Google Ads and campaign ideas should use.</h3>
      <p>Fill this once. Campaigns and ads both read from it. You can also drop copy in from Writing Lab.</p>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.twoColumns}>
          <label>Brand name<input value={brand.name} onChange={(e) => patchBrand({ name: e.target.value })} maxLength={80} placeholder="Acme" /></label>
          <label>Website<input value={brand.website} onChange={(e) => patchBrand({ website: e.target.value })} maxLength={200} placeholder="https://example.com" /></label>
        </div>
        <label>Offer / product<textarea value={brand.offer} onChange={(e) => patchBrand({ offer: e.target.value })} maxLength={500} rows={3} placeholder="What you sell, who it is for, and the result." /></label>
        <div className={styles.twoColumns}>
          <label>Audience<textarea value={brand.audience} onChange={(e) => patchBrand({ audience: e.target.value })} maxLength={400} rows={2} placeholder="Who should see the ads." /></label>
          <label>Proof / differentiators<textarea value={brand.proof} onChange={(e) => patchBrand({ proof: e.target.value })} maxLength={400} rows={2} placeholder="Reviews, results, guarantees — only facts you can stand behind." /></label>
        </div>
        <label>Tone<input value={brand.tone} onChange={(e) => patchBrand({ tone: e.target.value })} maxLength={80} placeholder="clear and confident" /></label>
      </form>
    </Panel>
  );
  const adPack = ad ?? blankAd(brand);

  return (
        <div className={`${styles.app} ${themeMode === 'dark' ? styles.dark : ''}`}>
          <main className={styles.main}>
            <div className={styles.topline}>
              <span>Marketing</span>
              <span className={styles.badge}>{workspace.demo ? 'Sample performance data' : workspace.name}</span>
            </div>
            <header className={styles.pageHeader}>
              <div>
                <span className={styles.eyebrow}>MARKETING</span>
                <h1>
                  {view === 'campaigns' && 'Brainstorm the campaign'}
                  {view === 'ads' && 'Fill the Google Ads form'}
                  {view === 'performance' && 'Read the numbers'}
                </h1>
                <p>
                  {view === 'campaigns' && 'Start from brand assets, then get campaign ideas you can rewrite in Writing Lab or save in Data Hub.'}
                  {view === 'ads' && 'Auto-create headlines, descriptions and paths in the lengths Google Ads actually accepts.'}
                  {view === 'performance' && 'Upload an export, see what happened, then write the follow-up in Writing Lab.'}
                </p>
              </div>
              {view !== 'performance' ? (
                <button className={styles.primary} disabled={genBusy || !brand.offer.trim()} onClick={() => void generate(view === 'ads' ? 'ads' : 'campaigns')}>
                  <Sparkles size={16} />{genBusy ? 'Working…' : view === 'ads' ? 'Create Google Ads copy' : 'Brainstorm campaigns'}
                </button>
              ) : (
                <button className={styles.primary} onClick={() => document.getElementById('marketing-upload')?.click()}>
                  <UploadCloud size={16} />Upload export
                </button>
              )}
            </header>
            {notice && <div className={styles.notice} role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}

            {view === 'campaigns' && <>
              {brandForm}
              <div className={styles.stack}>
                {ideas.length ? ideas.map((idea) => (
                  <Panel key={idea.name}>
                    <span className={styles.eyebrow}>{idea.channel}</span>
                    <h3>{idea.name}</h3>
                    <p>{idea.angle}</p>
                    <p>{idea.message}</p>
                    <p><strong>{idea.cta}</strong></p>
                    <div className={styles.fileActions}>
                      <button className={styles.secondary} onClick={() => openInWriting(`${idea.name}\n${idea.angle}\n\n${idea.message}\n\nCTA: ${idea.cta}`, idea.name)}>
                        <PenLine size={15} />Polish in Writing Lab
                      </button>
                      <button className={styles.textButton} disabled={savingFile} onClick={() => void saveText(`${idea.name}.txt`, `${idea.name}\nChannel: ${idea.channel}\n${idea.angle}\n\n${idea.message}\n\nCTA: ${idea.cta}`, 'campaigns')}>
                        <FolderOpen size={15} />Save to Data Hub
                      </button>
                    </div>
                  </Panel>
                )) : (
                  <Panel>
                    <Sparkles size={24} />
                    <h3>No campaign ideas yet</h3>
                    <p>Fill the brand brief above, then brainstorm. Ideas can be rewritten in Writing Lab or stored in Data Hub.</p>
                  </Panel>
                )}
              </div>
            </>}

            {view === 'ads' && <>
              <Panel>
                <div className={styles.between}>
                  <div>
                    <span className={styles.eyebrow}>USING BRAND ASSETS</span>
                    <h3>{brand.name || 'No brand name yet'}</h3>
                    <p>{brand.offer || 'Add an offer on Campaigns first — Google Ads copy is generated from that brief, not from this form.'}</p>
                  </div>
                  <Link href="/studio/marketing" className={styles.secondary}>Edit brand on Campaigns</Link>
                </div>
              </Panel>
              <div className={styles.twoColumns}>
                <Panel>
                  <span className={styles.eyebrow}>GOOGLE ADS · RSA</span>
                  <h3>The fields you paste into Google Ads.</h3>
                  <p>Headlines max 30 characters. Descriptions max 90. Display paths max 15.</p>
                  <div className={styles.form}>
                    <label>Final URL<input value={adPack.finalUrl} onChange={(e) => setAd({ ...adPack, finalUrl: e.target.value })} placeholder="https://example.com/offer" /></label>
                    <div className={styles.twoColumns}>
                      <label>Path 1<input value={adPack.path1} maxLength={15} onChange={(e) => setAd({ ...adPack, path1: e.target.value })} placeholder="pricing" /></label>
                      <label>Path 2<input value={adPack.path2} maxLength={15} onChange={(e) => setAd({ ...adPack, path2: e.target.value })} placeholder="demo" /></label>
                    </div>
                  </div>
                  <h3>Keywords</h3>
                  <p>{adPack.keywords.length ? adPack.keywords.join(', ') : 'Keywords appear here after you generate copy.'}</p>
                  <div className={styles.fileActions}>
                    <button className={styles.secondary} disabled={!adPack.headlines.some(Boolean)} onClick={() => openInWriting(formatAd(adPack), `${brand.name || 'Brand'} Google Ads`)}>
                      <PenLine size={15} />Edit in Writing Lab
                    </button>
                    <button className={styles.primary} disabled={savingFile || !adPack.headlines.some(Boolean)} onClick={() => void saveText(`${brand.name || 'ads'}-google-ads.txt`, formatAd(adPack), 'campaigns')}>
                      <FolderOpen size={15} />Save to Data Hub
                    </button>
                  </div>
                </Panel>
                <Panel>
                  <h3>Headlines · 15 × 30 characters</h3>
                  {adPack.headlines.map((headline, i) => (
                    <label key={i} className={styles.form} style={{ marginTop: 10 }}>
                      Headline {i + 1} · {headline.length}/30
                      <input value={headline} maxLength={30} placeholder={`Headline ${i + 1}`} onChange={(e) => setAd({ ...adPack, headlines: adPack.headlines.map((h, idx) => idx === i ? e.target.value : h) })} />
                    </label>
                  ))}
                  <h3>Descriptions · 4 × 90 characters</h3>
                  {adPack.descriptions.map((description, i) => (
                    <label key={i} className={styles.form} style={{ marginTop: 10 }}>
                      Description {i + 1} · {description.length}/90
                      <textarea value={description} maxLength={90} rows={2} placeholder={`Description ${i + 1}`} onChange={(e) => setAd({ ...adPack, descriptions: adPack.descriptions.map((d, idx) => idx === i ? e.target.value : d) })} />
                    </label>
                  ))}
                </Panel>
              </div>
            </>}

            {view === 'performance' && <>
              {workspace.demo && (
                <div className={styles.demo}>
                  <Sparkles size={16} />
                  <span>Sample data is showing. Upload a Google Ads or campaign export to analyse your own numbers.</span>
                </div>
              )}
              <Panel>
                <div className={styles.between}>
                  <div>
                    <h3>Upload campaign data</h3>
                    <p>CSV, TSV or Excel. Map campaign, spend and conversions, then we calculate the rest.</p>
                  </div>
                  <select value={workspace.id} onChange={(e) => { setActive(e.target.value); setTable(null); setBriefing(''); }}>
                    {workspaces.map((w) => <option key={w.id} value={w.id}>{w.name}{w.demo ? ' · Demo' : ''}</option>)}
                  </select>
                </div>
                <label className={styles.dropzone}>
                  <UploadCloud size={36} />
                  <strong>{busy ? 'Reading your file…' : 'Choose a campaign export'}</strong>
                  <span>CSV, TSV or .xlsx · up to 5 MB / 20,000 rows</span>
                  <input id="marketing-upload" type="file" accept=".csv,.tsv,.xlsx" disabled={busy} onChange={(e) => { void upload(e.target.files?.[0]); e.target.value = ''; }} />
                </label>
                <button className={styles.textButton} onClick={() => download('standex-campaign-template.csv', 'campaign,date,spend,revenue,conversions,clicks,impressions\nBrand search,2026-09-01,100,450,5,80,4000\n', 'text/csv')}>
                  Download CSV template <ArrowDownToLine size={14} />
                </button>
                {sourceFile && (
                  <button className={styles.secondary} disabled={savingFile} onClick={() => void saveStudioFile(sourceFile, 'campaigns').then(() => setNotice(`${sourceFile.name} saved to Data Hub.`)).catch((error) => setNotice(error instanceof Error ? error.message : 'Not saved.'))}>
                    <FolderOpen size={15} />Save original to Data Hub
                  </button>
                )}
              </Panel>
              {table && (
                <Panel>
                  <div className={styles.between}>
                    <div><h3>Match columns</h3><p>{fileName} · {table.length - 1} rows</p></div>
                    <button className={styles.primary} onClick={runAnalysis}><Activity size={16} />Analyse</button>
                  </div>
                  <div className={styles.mapping}>
                    {fields.map((field) => (
                      <label key={field}>{field}{['campaign', 'spend', 'conversions'].includes(field) ? ' *' : ''}
                        <select value={mapping[field]} onChange={(e) => setMapping((prev) => ({ ...prev, [field]: e.target.value }))}>
                          <option value="">Not supplied</option>
                          {table[0].map((h, i) => <option key={i} value={h}>{h}</option>)}
                        </select>
                      </label>
                    ))}
                  </div>
                </Panel>
              )}
              <div className={styles.kpis}>
                {[
                  ['Spend', cash(analysis.totals.spend), workspace.source],
                  ['Conversions', num(analysis.totals.conversions), `CPA ${cash(analysis.totals.cpa)}`],
                  ['ROAS', analysis.available('revenue') ? num(analysis.totals.roas, 'x') : '—', `Target ${workspace.targetROAS}x`],
                  ['Score', num(analysis.score), `${analysis.coverage}% coverage`],
                ].map(([label, value, note]) => (
                  <Panel key={label}><span className={styles.kpiLabel}>{label}</span><strong className={styles.kpiValue}>{workspace.rows.length ? value : '—'}</strong><small>{note}</small></Panel>
                ))}
              </div>
              <Panel>
                <div className={styles.between}><div><h3>Performance over time</h3><p>Daily spend</p></div><span className={styles.badge}>{analysis.trends.length} days</span></div>
                {analysis.trends.length > 1 ? (
                  <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 600, height: 245 }}>
                      <AreaChart data={analysis.trends}>
                        <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="var(--line)" />
                        <XAxis dataKey="date" tickFormatter={(v) => String(v).slice(5)} tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} width={50} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(value) => cash(Number(value))} contentStyle={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12 }} />
                        <Area isAnimationActive={false} type="monotone" name="Spend" dataKey="spend" stroke="#6366f1" strokeWidth={2.5} fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : <div className={styles.empty}>Upload dated rows to see a trend.</div>}
              </Panel>
              <Panel>
                <h3>Optional observations</h3>
                <p>Calculated actions first. The AI briefing is optional and must stay inside these numbers.</p>
                <button className={styles.primary} disabled={analystBusy || !workspace.rows.length} onClick={async () => {
                  const version = contextVersion.current; setAnalystBusy(true); setBriefing(''); setNotice('');
                  try {
                    const response = await fetch('/api/studio/marketing/analyst', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(workspace) });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Briefing failed.');
                    if (version === contextVersion.current) setBriefing(data.briefing);
                  } catch (error) { setNotice(error instanceof Error ? error.message : 'Briefing failed.'); }
                  finally { setAnalystBusy(false); }
                }}><Sparkles size={16} />{analystBusy ? 'Preparing…' : 'Write observations'}</button>
                {briefing && (
                  <>
                    <div className={styles.review}>{briefing}</div>
                    <div className={styles.fileActions}>
                      <button className={styles.secondary} onClick={() => openInWriting(briefing, `${workspace.name} briefing`)}><PenLine size={15} />Rewrite in Writing Lab</button>
                      <button className={styles.textButton} disabled={savingFile} onClick={() => void saveText(`${workspace.name}-observations.txt`, briefing, 'reports')}><FolderOpen size={15} />Save to Data Hub</button>
                    </div>
                  </>
                )}
              </Panel>
              <div className={styles.stack}>
                {analysis.recommendations.length ? analysis.recommendations.map((r, i) => (
                  <Panel key={r.title}>
                    <div className={styles.between}><span className={styles.eyebrow}>ACTION {String(i + 1).padStart(2, '0')}</span><span className={r.priority === 'High' ? styles.warning : styles.badge}>{r.priority}</span></div>
                    <h3>{r.title}</h3>
                    <p>{r.finding}</p>
                    <p>{r.action}</p>
                    <button className={styles.textButton} onClick={() => openInWriting(`${r.title}\n\n${r.finding}\n\n${r.action}`, r.title)}>Turn into copy <ArrowRight size={14} /></button>
                  </Panel>
                )) : (
                  <Panel><Check size={24} /><h3>{workspace.rows.length ? 'No campaign rules triggered' : 'Upload data to see actions'}</h3><p>Quiet alerts are not proof of perfect performance.</p></Panel>
                )}
              </div>
            </>}

            <footer className={styles.footer}>
              <span>Standex Studio · Marketing</span>
              <Link href="/studio/data" className={styles.textButton}>Open Data Hub <ArrowRight size={14} /></Link>
              <Link href="/studio/writing" className={styles.textButton}>Open Writing Lab <ArrowRight size={14} /></Link>
            </footer>
          </main>
        </div>
  );
}

function formatAd(ad: GoogleAd) {
  return [
    `Final URL: ${ad.finalUrl}`,
    `Path: ${ad.path1} / ${ad.path2}`,
    '',
    'HEADLINES',
    ...ad.headlines.map((h, i) => `${i + 1}. ${h}`),
    '',
    'DESCRIPTIONS',
    ...ad.descriptions.map((d, i) => `${i + 1}. ${d}`),
    '',
    `Keywords: ${(ad.keywords || []).join(', ')}`,
  ].join('\n');
}
