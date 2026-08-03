// Copies the Pyodide and sql.js runtimes into public/wasm so the Code Lab can
// load them from our own origin. They are large binaries, so they stay out of
// git (see .gitignore) and are regenerated on install/build instead.
import { mkdir, copyFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  {
    from: join(root, "node_modules", "pyodide"),
    to: join(root, "public", "wasm", "pyodide"),
    files: [
      "pyodide.mjs",
      "pyodide.asm.mjs",
      "pyodide.asm.wasm",
      "python_stdlib.zip",
      "pyodide-lock.json",
    ],
  },
  {
    from: join(root, "node_modules", "sql.js", "dist"),
    to: join(root, "public", "wasm", "sqljs"),
    files: ["sql-wasm.js", "sql-wasm.wasm"],
  },
];

let copied = 0;
for (const target of targets) {
  try {
    await access(target.from);
  } catch {
    console.warn(`[copy-wasm] skipped ${target.from} — not installed`);
    continue;
  }

  await mkdir(target.to, { recursive: true });
  for (const file of target.files) {
    await copyFile(join(target.from, file), join(target.to, file));
    copied += 1;
  }
}

console.log(`[copy-wasm] copied ${copied} runtime files into public/wasm`);
