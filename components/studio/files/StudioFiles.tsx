'use client';
import Link from 'next/link';
import { PenLine, Megaphone } from 'lucide-react';
import { StudioShell } from '@/components/studio/StudioShell';
import { StudioFileLibrary } from './StudioFileLibrary';
import { handoffToWriting, handoffToMarketing } from '@/lib/studio-handoff';
import { useRouter } from 'next/navigation';
import styles from '../marketing/marketing.module.css';

export function StudioFiles() {
  const router = useRouter();
  return (
    <StudioShell>
      {({ theme, themeMode }) => (
        <div className={`${styles.app} ${themeMode === 'dark' ? styles.dark : ''}`}>
          <main className={styles.main}>
            <header className={styles.pageHeader}>
              <div>
                <span className={styles.eyebrow}>DATA HUB</span>
                <h1>Documents and data, together.</h1>
                <p>Keep writing drafts, campaign exports, Google Ads packs and brand files in one private place. Open them in Writing Lab or Marketing when you need them.</p>
              </div>
            </header>
            <StudioFileLibrary
              theme={theme}
              isDark={themeMode === 'dark'}
              onUseFile={async (file, category) => {
                if (category === 'workspaces') {
                  handoffToMarketing({ from: 'data', kind: 'workspace', text: await file.text(), fileName: file.name });
                  router.push('/studio/marketing?view=performance');
                  return;
                }
                if (category === 'campaigns') {
                  handoffToMarketing({ from: 'data', kind: 'campaign', text: await file.text(), fileName: file.name });
                  router.push('/studio/marketing?view=performance');
                  return;
                }
                const text = await file.text();
                if (category === 'documents' || category === 'reports') {
                  handoffToWriting({ text, title: file.name, from: 'data' });
                  router.push('/studio/writing');
                  return;
                }
                handoffToMarketing({ from: 'data', kind: 'copy', text });
                router.push('/studio/marketing');
              }}
            />
            <footer className={styles.footer}>
              <span>Standex Studio · Data Hub</span>
              <Link href="/studio/writing" className={styles.textButton}><PenLine size={14} /> Writing Lab</Link>
              <Link href="/studio/marketing" className={styles.textButton}><Megaphone size={14} /> Marketing</Link>
            </footer>
          </main>
        </div>
      )}
    </StudioShell>
  );
}
