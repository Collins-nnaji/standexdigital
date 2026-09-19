export const fields = ['campaign', 'date', 'spend', 'revenue', 'conversions', 'clicks', 'impressions'] as const;
export type Field = typeof fields[number];
export type Mapping = Record<Field, string>;
export type CampaignRow = Record<'spend' | 'revenue' | 'conversions' | 'clicks' | 'impressions', number> & { campaign: string; date: string };
export type Workspace = { id: string; name: string; currency: string; targetCPA: number; targetROAS: number; budget: number; colour: string; contact: string; rows: CampaignRow[]; warnings: string[]; source: string; demo?: boolean };
export type Recommendation = { title: string; finding: string; evidence: string; impact: string; action: string; priority: 'High' | 'Medium' | 'Low'; confidence: string };

export function parseCSV(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ''; let quoted = false;
  text = text.replace(/^\uFEFF/, '');
  const delimiter = text.split(/\r?\n/)[0].includes('\t') ? '\t' : ',';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted;
    } else if (char === delimiter && !quoted) { row.push(cell.trim()); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = '';
    } else cell += char;
  }
  if (quoted) throw new Error('The file contains an unclosed quoted field. Check the CSV export.');
  row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) throw new Error('Include a header and at least one data row.');
  if (rows.length > 20001) throw new Error('Use up to 20,000 rows per upload.');
  if (new Set(rows[0]).size !== rows[0].length) throw new Error('Column headers must be unique.');
  return rows;
}
const aliases: Record<Field, string[]> = {
  campaign: ['campaign', 'campaignname', 'adsetname', 'name'], date: ['date', 'day', 'reportingstarts'],
  spend: ['spend', 'amountspent', 'amountspentgbp', 'amountspentusd', 'cost', 'adspend'],
  revenue: ['revenue', 'purchaseconversionvalue', 'conversionvalue', 'sales', 'totalrevenue'],
  conversions: ['conversions', 'purchases', 'results', 'orders'], clicks: ['clicks', 'linkclicks', 'clicksall'], impressions: ['impressions'],
};
export function autoMap(headers: string[]): Mapping {
  return Object.fromEntries(fields.map(field => [field, headers.find(h => aliases[field].includes(h.toLowerCase().replace(/[^a-z]/g, ''))) || ''])) as Mapping;
}
export function normalizeRows(table: string[][], mapping: Mapping) {
  if (new Set(table[0]).size !== table[0].length) throw new Error('Column headers must be unique.');
  if (!mapping.campaign || !mapping.spend || !mapping.conversions) throw new Error('Map campaign, spend and conversions before analysing.');
  const selected = Object.values(mapping).filter(Boolean);
  if (new Set(selected).size !== selected.length) throw new Error('Each source column can only be mapped once.');
  const warnings: string[] = []; const rows: CampaignRow[] = []; const seen = new Set<string>(); let duplicates = 0; let invalid = 0;
  for (const raw of table.slice(1)) {
    const get = (field: Field) => mapping[field] ? raw[table[0].indexOf(mapping[field])]?.trim() || '' : '';
    const row: CampaignRow = { campaign: get('campaign'), date: get('date'), spend: 0, revenue: 0, conversions: 0, clicks: 0, impressions: 0 };
    let bad = !row.campaign || raw.length !== table[0].length;
    for (const field of ['spend', 'revenue', 'conversions', 'clicks', 'impressions'] as const) {
      const value = get(field).replace(/[£$€,\s]/g, '');
      if (mapping[field] && !value) bad = true;
      row[field] = value ? Number(value) : 0;
      if (!Number.isFinite(row[field]) || row[field] < 0 || row[field] > 1e12) bad = true;
    }
    if (row.date && (!/^\d{4}-\d{2}-\d{2}$/.test(row.date) || !Number.isFinite(Date.parse(row.date)) || new Date(row.date).toISOString().slice(0, 10) !== row.date)) { row.date = ''; warnings.push('Some dates were invalid; use YYYY-MM-DD for daily trends.'); }
    if (bad) { invalid++; continue; }
    const key = JSON.stringify(row); if (seen.has(key)) { duplicates++; continue; } seen.add(key); rows.push(row);
  }
  if (duplicates) warnings.push(`${duplicates} exact duplicate rows excluded. Review your export if identical rows represent separate events.`);
  if (invalid) warnings.push(`${invalid} rows excluded because required values were missing, negative or invalid.`);
  for (const field of ['revenue', 'clicks', 'impressions', 'date'] as const) if (!mapping[field]) warnings.push(`${field} not supplied; related metrics are unavailable.`);
  if (rows.some(r => r.clicks > r.impressions && mapping.impressions)) warnings.push('Clicks exceed impressions in some rows. Check tracking or column mappings.');
  if (rows.some(r => r.conversions > r.clicks && mapping.clicks)) warnings.push('Conversions exceed clicks in some rows. Check event definitions and attribution.');
  if (rows.some(r => r.revenue > 0 && r.conversions === 0)) warnings.push('Revenue appears without conversions in some rows. Check event definitions and attribution.');
  if (!rows.length) throw new Error('No valid campaign rows remain. Check mappings and numeric values.');
  return { rows, warnings: [...new Set(warnings)] };
}
export const ratio = (a: number, b: number): number | null => b > 0 ? a / b : null;
export function analyse(workspace: Workspace) {
  const sum = (rows: CampaignRow[]) => rows.reduce((a, r) => ({ spend: a.spend + r.spend, revenue: a.revenue + r.revenue, conversions: a.conversions + r.conversions, clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }), { spend: 0, revenue: 0, conversions: 0, clicks: 0, impressions: 0 });
  const metrics = (rows: CampaignRow[]) => { const s = sum(rows); return { ...s, cpa: ratio(s.spend, s.conversions), roas: ratio(s.revenue, s.spend), ctr: ratio(s.clicks * 100, s.impressions), cpc: ratio(s.spend, s.clicks), conversionRate: ratio(s.conversions * 100, s.clicks) }; };
  const totals = metrics(workspace.rows);
  const campaignGroups = new Map<string, CampaignRow[]>(); const dateGroups = new Map<string, CampaignRow[]>();
  for (const row of workspace.rows) {
    if (!campaignGroups.has(row.campaign)) campaignGroups.set(row.campaign, []);
    campaignGroups.get(row.campaign)!.push(row);
    if (row.date) { if (!dateGroups.has(row.date)) dateGroups.set(row.date, []); dateGroups.get(row.date)!.push(row); }
  }
  const campaigns = [...campaignGroups].map(([name, rows]) => ({ name, ...metrics(rows) })).sort((a, b) => b.spend - a.spend);
  const trends = [...dateGroups].sort(([a], [b]) => a.localeCompare(b)).map(([date, rows]) => ({ date, ...metrics(rows) }));
  const money = (v: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: workspace.currency, maximumFractionDigits: 0 }).format(v);
  const recommendations: Recommendation[] = campaigns.flatMap<Recommendation>(c => {
    if (c.spend > 0 && c.conversions === 0) return [{ title: `Investigate ${c.name}`, finding: 'Spend without recorded conversions.', evidence: `${money(c.spend)} spent; 0 conversions recorded.`, impact: 'This spend has no attributed conversion value and needs investigation.', action: 'Verify conversion tracking and attribution delay before reducing spend.', priority: 'High' as const, confidence: 'High on observation; cause unconfirmed' }];
    if (c.cpa !== null && c.cpa > workspace.targetCPA) return [{ title: `Improve efficiency: ${c.name}`, finding: 'CPA exceeds the workspace target.', evidence: `CPA ${money(c.cpa)} versus ${money(workspace.targetCPA)} target across ${c.conversions} conversions.`, impact: `${money(Math.max(0, c.spend - c.conversions * workspace.targetCPA))} above target-equivalent spend; this is not guaranteed recoverable waste.`, action: 'Review audience, landing page and creative. Test a small budget reduction after checking conversion lag.', priority: 'High' as const, confidence: c.conversions >= 30 ? 'High on observation' : 'Medium — limited conversion sample' }];
    if (c.conversions >= 10 && c.cpa !== null && c.cpa < workspace.targetCPA * .8) return [{ title: `Test scaling ${c.name}`, finding: 'CPA is at least 20% below target.', evidence: `${c.conversions} conversions at ${money(c.cpa)} CPA; target ${money(workspace.targetCPA)}.`, impact: 'This campaign may support additional efficient conversions.', action: 'Test a 10% budget increase and monitor marginal CPA. Scaling is not guaranteed.', priority: 'Medium' as const, confidence: 'Medium — scaling requires an experiment' }];
    return [];
  });
  for (const [name, rows] of campaignGroups) {
    const dates = [...new Set(rows.map(r => r.date).filter(Boolean))].sort();
    if (dates.length < 6) continue;
    const size = Math.floor(dates.length / 2);
    const previousDates = new Set(dates.slice(-size * 2, -size)); const recentDates = new Set(dates.slice(-size));
    const previous = metrics(rows.filter(r => previousDates.has(r.date))); const recent = metrics(rows.filter(r => recentDates.has(r.date)));
    if (previous.cpa === null || recent.cpa === null || previous.cpa <= 0 || previous.conversions < 10 || recent.conversions < 5) continue;
    if (recent.cpa > previous.cpa * 1.25 && recent.conversions < previous.conversions * .8) recommendations.push({
      title: `Investigate a performance shift: ${name}`, finding: 'CPA rose more than 25% while conversions fell more than 20%.',
      evidence: `Previous ${size} observed days: ${money(previous.cpa)} CPA, ${previous.conversions} conversions. Latest ${size} observed days: ${money(recent.cpa)} CPA, ${recent.conversions} conversions.`,
      impact: 'Acquisition became less efficient across equal counts of observed days. Missing dates or seasonality can affect this comparison.',
      action: 'Check recent budget, targeting, tracking and creative changes. Compare matched weekdays before changing allocation.', priority: 'High', confidence: 'Medium — observed shift; cause unconfirmed',
    });
    if (previous.impressions >= 1000 && recent.impressions >= 1000 && previous.ctr !== null && recent.ctr !== null && previous.ctr > 0 && recent.ctr < previous.ctr * .75 && recent.cpa > previous.cpa * 1.25) recommendations.push({
      title: `Test a creative refresh: ${name}`, finding: 'Falling CTR and rising CPA could indicate a creative or audience issue.',
      evidence: `Across successive ${size}-day observed windows, CTR fell from ${previous.ctr.toFixed(2)}% to ${recent.ctr.toFixed(2)}%; CPA moved from ${money(previous.cpa)} to ${money(recent.cpa)}.`,
      impact: 'Lower engagement can reduce acquisition efficiency. These figures do not prove fatigue.', action: 'Review creative in Creative vision, then test a new variation. Check frequency, placements and audience overlap in the source platform.', priority: 'Medium', confidence: 'Low on fatigue hypothesis; test required',
    });
  }
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const available = (field: string) => !workspace.warnings.some(w => w.startsWith(`${field} not supplied`));
  const efficiency = totals.cpa !== null ? clamp(workspace.targetCPA / totals.cpa * 100) : totals.spend ? 0 : null;
  const roasScore = available('revenue') && totals.roas !== null ? clamp(totals.roas / workspace.targetROAS * 100) : null;
  const efficientSpend = campaigns.filter(c => c.cpa !== null && c.cpa <= workspace.targetCPA).reduce((s, c) => s + c.spend, 0);
  const dailyCPAs = trends.filter(t => t.cpa !== null).map(t => t.cpa!);
  const mean = dailyCPAs.reduce((s, n) => s + n, 0) / dailyCPAs.length;
  const stability = dailyCPAs.length >= 3 && mean > 0 ? clamp(100 * (1 - Math.sqrt(dailyCPAs.reduce((s, n) => s + (n - mean) ** 2, 0) / dailyCPAs.length) / mean)) : null;
  const categories = [
    { name: 'Return & cost efficiency', weight: 30, value: efficiency === null ? roasScore : roasScore === null ? efficiency : (efficiency + roasScore) / 2, formula: 'Average of min(target CPA / actual CPA, 1) and min(actual ROAS / target ROAS, 1), × 100. Missing revenue: CPA only.' },
    { name: 'Conversion performance', weight: 20, value: totals.spend > 0 ? clamp(totals.conversions / (totals.spend / workspace.targetCPA) * 100) : null, formula: 'Conversions / expected conversions at target CPA, capped at 100.' },
    { name: 'Budget allocation', weight: 20, value: ratio(efficientSpend * 100, totals.spend), formula: 'Percentage of spend in campaigns meeting target CPA.' },
    { name: 'Performance stability', weight: 15, value: stability, formula: '100 × (1 − daily CPA standard deviation / mean), floored at 0. Requires 3 converting days.' },
    { name: 'Tracking & data quality', weight: 15, value: workspace.rows.length ? clamp(100 - workspace.warnings.length * 15 - (totals.spend > 0 && !totals.conversions ? 30 : 0)) : null, formula: '100 − 15 per distinct validation warning − 30 if spend has no conversions; floored at 0. A heuristic, not a tracking audit.' },
  ];
  const weight = categories.reduce((s, c) => s + (c.value === null ? 0 : c.weight), 0);
  const score = weight && totals.spend > 0 ? Math.round(categories.reduce((s, c) => s + (c.value ?? 0) * c.weight, 0) / weight) : null;
  return { totals, campaigns, trends, recommendations, categories, score, coverage: weight, budgetUtilisation: ratio(totals.spend * 100, workspace.budget), atRiskSpend: campaigns.filter(c => c.conversions === 0 || (c.cpa ?? 0) > workspace.targetCPA).reduce((s, c) => s + c.spend, 0), available };
}
export function demoWorkspace(): Workspace {
  const rows: CampaignRow[] = [];
  for (let day = 1; day <= 14; day++) for (const [index, campaign] of ['UK Prospecting', 'UK Retargeting', 'Brand Search', 'LinkedIn Lead Gen'].entries()) {
    const spend = [210, 95, 65, 125][index] + day * 2;
    const conversions = [3, 5, 6, day % 3 === 0 ? 1 : 0][index];
    rows.push({ campaign, date: `2026-09-${String(day).padStart(2, '0')}`, spend, conversions, revenue: conversions * [95, 120, 110, 150][index], clicks: 70 + day * 3, impressions: 5200 + day * 110 });
  }
  return { id: 'demo', name: 'Northstar Collective', currency: 'GBP', targetCPA: 40, targetROAS: 3, budget: 16000, colour: '#6366f1', contact: '', rows, warnings: [], source: 'Illustrative sample data', demo: true };
}
