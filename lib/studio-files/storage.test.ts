import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import { Readable } from 'node:stream';
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { accountPrefix, ownedFileKey, safeFileName } from './policy';
import { listFiles, readFile, saveFile, missingStorageConfig } from './storage';

test('file keys enforce exact account ownership and prevent traversal', () => {
  const key = 'studio/alice/reports/11111111-1111-4111-8111-111111111111/report.pdf';
  assert.equal(ownedFileKey('alice', key), true);
  assert.equal(ownedFileKey('bob', key), false);
  assert.equal(ownedFileKey('ali', key), false);
  assert.equal(ownedFileKey('alice', key.replace('report.pdf', '../report.pdf')), false);
  assert.throws(() => accountPrefix('../alice'));
  assert.equal(safeFileName('../../report.pdf'), 'report.pdf');
  assert.equal(safeFileName('report..pdf'), 'report.pdf');
});
test('unsupported executable and HTML files are rejected', () => {
  assert.throws(() => safeFileName('script.html'), /Supported files/);
  assert.throws(() => safeFileName('script.js'), /Supported files/);
});
test('storage upload, listing and download use account prefixes with mocked S3', async () => {
  const names = ['AWS_ENDPOINT_URL_S3', 'AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'STUDIO_STORAGE_BUCKET'] as const;
  const previous = Object.fromEntries(names.map(n => [n, process.env[n]]));
  Object.assign(process.env, { AWS_ENDPOINT_URL_S3: 'https://test.storage.neon.tech', AWS_REGION: 'us-east-2', AWS_ACCESS_KEY_ID: 'test-id', AWS_SECRET_ACCESS_KEY: 'test-secret', STUDIO_STORAGE_BUCKET: 'private-test' });
  let storedKey = '';
  const mocked = mock.method(S3Client.prototype, 'send', async (command: unknown) => {
    if (command instanceof PutObjectCommand) { storedKey = command.input.Key!; assert.ok(storedKey.startsWith('studio/alice/reports/')); assert.equal(command.input.ContentDisposition, 'attachment; filename="report.pdf"'); return {}; }
    if (command instanceof ListObjectsV2Command) { assert.equal(command.input.Prefix, 'studio/alice/'); return { Contents: [{ Key: storedKey, Size: 4, LastModified: new Date() }, { Key: storedKey.replace('/alice/', '/bob/'), Size: 4, LastModified: new Date() }] }; }
    if (command instanceof GetObjectCommand) return { Body: Readable.from([Buffer.from('test')]), ContentLength: 4 };
    throw new Error('Unexpected S3 command');
  });
  try {
    assert.deepEqual(missingStorageConfig(), []);
    const saved = await saveFile('alice', 'report.pdf', 'reports', Buffer.from('test'));
    assert.equal(saved.name, 'report.pdf');
    assert.equal((await listFiles('alice')).files.length, 1);
    assert.equal((await readFile('alice', saved.key)).bytes.toString(), 'test');
    await assert.rejects(() => readFile('bob', saved.key), /File not found/);
    await assert.rejects(() => saveFile('alice', 'empty.pdf', 'reports', new Uint8Array()), /non-empty/);
  } finally { mocked.mock.restore(); for (const name of names) { if (previous[name] === undefined) delete process.env[name]; else process.env[name] = previous[name]; } }
});
