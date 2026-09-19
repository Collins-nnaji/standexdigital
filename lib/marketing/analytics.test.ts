import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyse, autoMap, demoWorkspace, normalizeRows, parseCSV } from './analytics';
import { readCampaignFile } from './import';
import JSZip from 'jszip';

test('CSV preserves quoted commas, escaped quotes and embedded newlines', () => {
  assert.deepEqual(parseCSV('campaign,spend,conversions\r\n"Search, ""Brand""\nUK",120,3'), [['campaign', 'spend', 'conversions'], ['Search, "Brand"\nUK', '120', '3']]);
  assert.throws(() => parseCSV('a,b\n"broken,1'), /unclosed/);
});
test('normalization excludes duplicates and invalid data; missing metrics stay unavailable', () => {
  const table = parseCSV('Campaign name,Cost,Results\nSearch,100,4\nSearch,100,4\nBad,-4,1\nBlank,,2');
  const result = normalizeRows(table, autoMap(table[0]));
  assert.equal(result.rows.length, 1);
  assert.ok(result.warnings.some(w => w.startsWith('1 exact duplicate')));
  assert.ok(result.warnings.some(w => w.startsWith('2 rows excluded')));
  const a = analyse({ ...demoWorkspace(), ...result });
  assert.equal(a.totals.cpa, 25);
  assert.equal(a.available('revenue'), false);
  assert.equal(a.categories.find(c => c.name === 'Performance stability')?.value, null);
  assert.equal(a.coverage, 85);
});
test('metrics use weighted totals rather than averaging campaign ratios', () => {
  const table = parseCSV('campaign,date,spend,revenue,conversions,clicks,impressions\nA,2026-09-01,100,500,10,100,1000\nB,2026-09-02,900,900,9,300,3000');
  const a = analyse({ ...demoWorkspace(), ...normalizeRows(table, autoMap(table[0])) });
  assert.equal(a.totals.cpa, 1000 / 19);
  assert.equal(a.totals.roas, 1.4);
  assert.equal(a.totals.ctr, 10);
  assert.equal(a.totals.cpc, 2.5);
  assert.equal(a.totals.conversionRate, 4.75);
  assert.equal(a.atRiskSpend, 900);
  assert.ok(a.recommendations.every(r => r.evidence && r.action && r.confidence && r.impact));
  const score = Math.round(a.categories.reduce((sum, c) => sum + (c.value ?? 0) * c.weight, 0) / a.coverage);
  assert.equal(a.score, score);
});
test('zero denominator yields unavailable metrics and tracking investigation', () => {
  const table = parseCSV('campaign,spend,conversions\nA,100,0');
  const a = analyse({ ...demoWorkspace(), ...normalizeRows(table, autoMap(table[0])) });
  assert.equal(a.totals.cpa, null);
  assert.equal(a.totals.ctr, null);
  assert.equal(a.recommendations[0].priority, 'High');
  assert.match(a.recommendations[0].action, /tracking/);
});
test('invalid dates cannot create false trends and mapping cannot reuse columns', () => {
  const table = parseCSV('campaign,date,spend,conversions\nA,2026-02-30,100,1');
  const mapping = autoMap(table[0]);
  assert.equal(normalizeRows(table, mapping).rows[0].date, '');
  assert.throws(() => normalizeRows(table, { ...mapping, revenue: 'spend' }), /only be mapped once/);
});
test('Excel imports shared strings and sparse cells', async () => {
  const zip = new JSZip();
  zip.file('xl/sharedStrings.xml', '<sst><si><t>campaign</t></si><si><t>spend</t></si><si><t>conversions</t></si><si><t>Search</t></si></sst>');
  zip.file('xl/worksheets/sheet1.xml', '<worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c></row><row r="2"><c r="A2" t="s"><v>3</v></c><c r="B2"><v>100</v></c><c r="C2"><v>4</v></c></row></sheetData></worksheet>');
  const file = new File([await zip.generateAsync({ type: 'arraybuffer' })], 'campaign.xlsx');
  const table = await readCampaignFile(file);
  assert.deepEqual(table, [['campaign', 'spend', 'conversions'], ['Search', '100', '4']]);
});
test('temporal alerts require evidence and distinguish possible fatigue from a proven cause', () => {
  const rows = Array.from({ length: 6 }, (_, i) => ({ campaign: 'Prospecting', date: `2026-09-0${i + 1}`, spend: 100, revenue: 100, conversions: i < 3 ? 10 : 5, clicks: i < 3 ? 100 : 50, impressions: 2000 }));
  const result = analyse({ ...demoWorkspace(), rows });
  assert.ok(result.recommendations.some(r => r.title.includes('performance shift')));
  assert.ok(result.recommendations.some(r => r.confidence.includes('fatigue hypothesis')));
  assert.equal(analyse({ ...demoWorkspace(), rows: rows.slice(0, 3) }).recommendations.some(r => r.title.includes('performance shift')), false);
});
test('a dataset without spend does not imply perfect performance', () => {
  const table = parseCSV('campaign,spend,conversions\nNo activity,0,0');
  assert.equal(analyse({ ...demoWorkspace(), ...normalizeRows(table, autoMap(table[0])) }).score, null);
});
