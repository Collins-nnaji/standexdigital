import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMarketingVisionRequest, isMarketingVisionConfigured } from './vision';
import { restoreWorkspace, workspaceFile } from './workspace-file';
import { demoWorkspace } from './analytics';
import { readImageInput } from './image-input';

test('workspace snapshots restore a validated independent copy', () => {
  const original = demoWorkspace();
  const restored = restoreWorkspace(workspaceFile(original));
  assert.notEqual(restored.id, original.id);
  assert.equal(restored.rows.length, original.rows.length);
  assert.match(restored.name, /restored/);
  assert.throws(() => restoreWorkspace('{"format":"wrong"}'), /valid Standex/);
  assert.throws(() => restoreWorkspace(workspaceFile({ ...original, targetCPA: -1 })), /valid Standex/);
});
test('dedicated vision configuration is isolated from shared writing credentials', () => {
  const names = ['AZURE_OPENAI_VISION_ENDPOINT', 'AZURE_OPENAI_VISION_API_KEY', 'AZURE_OPENAI_VISION_DEPLOYMENT', 'AZURE_OPENAI_VISION_API_VERSION', 'OPENAI_API_KEY'] as const;
  const previous = Object.fromEntries(names.map(n => [n, process.env[n]]));
  Object.assign(process.env, { AZURE_OPENAI_VISION_ENDPOINT: 'https://dedicated.openai.azure.com/openai/v1', AZURE_OPENAI_VISION_API_KEY: 'vision-test-key', AZURE_OPENAI_VISION_DEPLOYMENT: 'creative-review', AZURE_OPENAI_VISION_API_VERSION: '2024-10-21', OPENAI_API_KEY: 'writing-test-key' });
  try {
    const request = createMarketingVisionRequest({ model: 'not-the-deployment', messages: [] });
    assert.equal(request.url, 'https://dedicated.openai.azure.com/openai/deployments/creative-review/chat/completions?api-version=2024-10-21');
    assert.equal(new Headers(request.init.headers).get('api-key'), 'vision-test-key');
    assert.equal(new Headers(request.init.headers).get('Authorization'), null);
    assert.equal(JSON.parse(String(request.init.body)).model, undefined);
    delete process.env.AZURE_OPENAI_VISION_API_KEY;
    assert.equal(isMarketingVisionConfigured(), false);
    assert.throws(() => createMarketingVisionRequest({ messages: [] }), /Complete all/);
  } finally { for (const name of names) { if (previous[name] === undefined) delete process.env[name]; else process.env[name] = previous[name]; } }
});
test('computer vision input rejects remote URLs and unsupported image types', async () => {
  const request = (image: string) => new Request('http://localhost/test', { method: 'POST', body: JSON.stringify({ image }) });
  await assert.rejects(() => readImageInput(request('https://example.com/image.png')), /PNG/);
  await assert.rejects(() => readImageInput(request('data:image/svg+xml;base64,AA==')), /PNG/);
  assert.equal(await readImageInput(request('data:image/png;base64,AA==')), 'data:image/png;base64,AA==');
});
