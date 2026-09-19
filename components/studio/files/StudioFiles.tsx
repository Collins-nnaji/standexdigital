'use client';
import { StudioShell } from '@/components/studio/StudioShell';
import { StudioFileLibrary } from './StudioFileLibrary';
import styles from '../marketing/marketing.module.css';
export function StudioFiles() {
  return <StudioShell active="files">{({ theme, themeMode }) => <div className={`${styles.app} ${themeMode === 'dark' ? styles.dark : ''}`}><main className={styles.main}><header className={styles.pageHeader}><div><span className={styles.eyebrow}>STANDEX STUDIO</span><h1>Your files. Across the Studio.</h1><p>Save writing documents, campaign exports, reports and creative assets in one private place.</p></div></header><StudioFileLibrary theme={theme} isDark={themeMode === 'dark'} /></main></div>}</StudioShell>;
}
