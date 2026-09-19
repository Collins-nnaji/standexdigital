import { z } from 'zod';
import type { Workspace } from './analytics';
const metric = z.number().finite().min(0).max(1e12);
const schema = z.object({
  format: z.literal('standex-marketing-workspace-v1'),
  workspace: z.object({
    name: z.string().trim().min(1).max(80), currency: z.enum(['GBP', 'USD', 'EUR']),
    targetCPA: metric.positive(), targetROAS: metric.positive(), budget: metric.positive(),
    colour: z.string().regex(/^#[0-9a-f]{6}$/i), contact: z.string().max(160), source: z.string().max(500), demo: z.boolean().optional(),
    warnings: z.array(z.string().max(500)).max(100),
    rows: z.array(z.object({ campaign: z.string().min(1).max(300), date: z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/), spend: metric, revenue: metric, conversions: metric, clicks: metric, impressions: metric })).max(20000),
  }),
});
export function workspaceFile(workspace: Workspace) { return JSON.stringify({ format: 'standex-marketing-workspace-v1', workspace }, null, 2); }
export function restoreWorkspace(text: string): Workspace {
  const result = schema.safeParse(JSON.parse(text));
  if (!result.success) throw new Error('This is not a valid Standex workspace snapshot. Save a workspace from Marketing and use that JSON file.');
  return { ...result.data.workspace, id: crypto.randomUUID(), name: `${result.data.workspace.name.slice(0, 65)} (restored)` };
}
