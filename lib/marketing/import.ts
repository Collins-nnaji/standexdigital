import { parseCSV } from './analytics';

export async function readCampaignFile(file: File): Promise<string[][]> {
  if (file.size > 5 * 1024 * 1024) throw new Error('Upload a file smaller than 5 MB.');
  if (/\.(csv|tsv)$/i.test(file.name)) return parseCSV(await file.text());
  if (!/\.xlsx$/i.test(file.name)) throw new Error('Choose CSV, TSV or Excel (.xlsx). Save older .xls files as .xlsx first.');
  const [{ default: JSZip }, { XMLParser }] = await Promise.all([import('jszip'), import('fast-xml-parser')]);
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  async function xml(path: string): Promise<string> {
    const entry = zip.file(path);
    if (!entry) return '';
    return new Promise((resolve, reject) => {
      let output = '';
      const stream = (entry as unknown as { internalStream(type: 'string'): import('jszip').JSZipStreamHelper<string> }).internalStream('string');
      stream.on('data', chunk => {
        output += chunk;
        if (output.length > 15_000_000) { stream.pause(); reject(new Error('Expanded worksheet is too large. Export a smaller CSV.')); }
      }).on('error', reject).on('end', () => resolve(output)).resume();
    });
  }
  const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: false, processEntities: false });
  const sharedDoc = parser.parse(await xml('xl/sharedStrings.xml'));
  const list = <T,>(v: T | T[] | undefined): T[] => v === undefined ? [] : Array.isArray(v) ? v : [v];
  const textOf = (v: unknown): string => typeof v === 'object' && v !== null ? String((v as Record<string, unknown>)['#text'] ?? '') : String(v ?? '');
  const strings = list<Record<string, unknown>>(sharedDoc?.sst?.si).map(s => s.t !== undefined ? textOf(s.t) : list<Record<string, unknown>>(s.r as Record<string, unknown>[]).map(r => textOf(r.t)).join(''));
  const sheetPath = Object.keys(zip.files).filter(p => /^xl\/worksheets\/sheet\d+\.xml$/.test(p)).sort()[0];
  if (!sheetPath) throw new Error('No worksheet found. Export your data as CSV.');
  const sheet = parser.parse(await xml(sheetPath));
  const rows = list<Record<string, unknown>>(sheet?.worksheet?.sheetData?.row);
  if (rows.length > 20001) throw new Error('Use up to 20,000 rows per upload.');
  const table = rows.map(row => {
    const result: string[] = [];
    for (const cell of list<Record<string, unknown>>(row.c as Record<string, unknown>[])) {
      const letters = String(cell['@_r'] || '').replace(/[0-9]/g, '');
      const col = [...letters].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0) - 1;
      if (col < 0 || col > 200) throw new Error('Use a worksheet with at most 201 columns.');
      const value = cell['@_t'] === 's' ? strings[Number(cell.v)] : cell['@_t'] === 'inlineStr' ? textOf((cell.is as Record<string, unknown>)?.t) : textOf(cell.v);
      result[col] = value || '';
    }
    return result;
  }).filter(r => r.some(Boolean));
  if (table.length < 2) throw new Error('Include headers and campaign data on the first worksheet.');
  const width = table[0].length;
  return table.map(row => Array.from({ length: Math.max(width, row.length) }, (_, i) => row[i] || ''));
}
