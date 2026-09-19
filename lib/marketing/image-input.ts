export async function readImageInput(request: Request): Promise<string> {
  const limit = 6_000_000;
  const reader = request.body?.getReader(); if (!reader) throw new Error('Upload an image.');
  let size = 0; let raw = ''; const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.length; if (size > limit) { await reader.cancel(); throw new Error('Choose an image under 4 MB.'); }
    raw += decoder.decode(value, { stream: true });
  }
  const body = JSON.parse(raw + decoder.decode());
  if (typeof body.image !== 'string' || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(body.image)) throw new Error('Choose a PNG, JPEG or WebP image.');
  return body.image;
}
