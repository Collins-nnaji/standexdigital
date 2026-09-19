import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { accountPrefix, describeFile, fileType, MAX_FILE_BYTES, ownedFileKey, safeFileName, type FileCategory } from './policy';

export const storageEnvNames = ['AWS_ENDPOINT_URL_S3', 'AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'STUDIO_STORAGE_BUCKET'] as const;
export function missingStorageConfig() { return storageEnvNames.filter(name => !process.env[name]?.trim()); }
function storage() {
  if (missingStorageConfig().length) throw new Error('Neon file storage is not configured.');
  const endpoint = new URL(process.env.AWS_ENDPOINT_URL_S3!);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('Storage requires an HTTPS endpoint without embedded credentials.');
  return { bucket: process.env.STUDIO_STORAGE_BUCKET!.trim(), client: new S3Client({
    region: process.env.AWS_REGION!.trim(), endpoint: endpoint.toString(), forcePathStyle: true,
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID!.trim(), secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!.trim() },
    requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', maxAttempts: 2,
  }) };
}
export async function listFiles(accountId: string, continuationToken?: string) {
  const { bucket, client } = storage();
  try {
    const result = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: accountPrefix(accountId), MaxKeys: 100, ContinuationToken: continuationToken }), { abortSignal: AbortSignal.timeout(20000) });
    return { files: (result.Contents || []).filter(item => item.Key && ownedFileKey(accountId, item.Key)).map(item => describeFile(item.Key!, item.Size || 0, item.LastModified || new Date())), nextToken: result.NextContinuationToken || null };
  } finally { client.destroy(); }
}
export async function saveFile(accountId: string, name: string, category: FileCategory, bytes: Uint8Array) {
  if (!bytes.length || bytes.length > MAX_FILE_BYTES) throw new Error('Files must be non-empty and at most 5 MB.');
  name = safeFileName(name);
  const key = `${accountPrefix(accountId)}${category}/${randomUUID()}/${name}`;
  const { bucket, client } = storage();
  try {
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: fileType(name), ContentDisposition: `attachment; filename="${name}"` }), { abortSignal: AbortSignal.timeout(30000) });
    return describeFile(key, bytes.length, new Date());
  } finally { client.destroy(); }
}
export async function readFile(accountId: string, key: string) {
  if (!ownedFileKey(accountId, key)) throw new Error('File not found.');
  const { bucket, client } = storage();
  try {
    const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }), { abortSignal: AbortSignal.timeout(30000) });
    if (!result.Body || (result.ContentLength ?? 0) > MAX_FILE_BYTES) throw new Error('File is unavailable or too large.');
    const chunks: Uint8Array[] = []; let size = 0;
    for await (const chunk of result.Body as AsyncIterable<Uint8Array>) { size += chunk.length; if (size > MAX_FILE_BYTES) throw new Error('File is too large.'); chunks.push(chunk); }
    const bytes = Buffer.concat(chunks); return { bytes, name: safeFileName(key.split('/').at(-1)!) };
  } finally { client.destroy(); }
}
export async function removeFile(accountId: string, key: string) {
  if (!ownedFileKey(accountId, key)) throw new Error('File not found.');
  const { bucket, client } = storage();
  try { await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }), { abortSignal: AbortSignal.timeout(20000) }); }
  finally { client.destroy(); }
}
