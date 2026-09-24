import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, join, extname, relative } from "node:path";
import { checkMedia } from "./check-media.mjs";
const root = resolve("out");
await checkMedia(join(root, "media"));
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    files.push(...(entry.isDirectory() ? await walk(p) : [p]));
  }
  return files;
}
const files = await walk(root);
const html = files.filter((f) => f.endsWith(".html"));
const docs = new Map();
const failures = [];
for (const file of html) {
  const text = await readFile(file, "utf8");
  const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
  docs.set(file, { text, ids: new Set(ids) });
  if (ids.length !== new Set(ids).size)
    failures.push(`${relative(root, file)}: duplicate IDs`);
  if ((text.match(/<h1(?:\s|>)/g) || []).length !== 1)
    failures.push(`${relative(root, file)}: expected one H1`);
  if (!/<title>[^<]+<\/title>/.test(text))
    failures.push(`${file}: missing title`);
  for (const img of text.matchAll(/<img\b[^>]*>/g))
    if (!/\balt=/.test(img[0]))
      failures.push(`${file}: image without alt attribute`);
}
let checked = 0;
for (const [file, { text }] of docs) {
  const pathname = "/" + relative(root, file).replace(/index\.html$/, "");
  for (const m of text.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const raw = m[1].replaceAll("&amp;", "&");
    if (/^(mailto:|tel:|data:|blob:|https?:\/\/)/.test(raw)) continue;
    const u = new URL(raw, "https://preview.invalid" + pathname);
    let target = join(root, decodeURIComponent(u.pathname));
    try {
      const info = await stat(target);
      if (info.isDirectory()) target = join(target, "index.html");
      await stat(target);
    } catch {
      failures.push(`${relative(root, file)}: missing ${raw}`);
      continue;
    }
    if (
      u.hash &&
      docs.has(target) &&
      !docs.get(target).ids.has(decodeURIComponent(u.hash.slice(1)))
    )
      failures.push(`${relative(root, file)}: missing anchor ${raw}`);
    checked++;
  }
}
for (const forbidden of ["admin", "api"])
  if (files.some((f) => relative(root, f).startsWith(forbidden + "/")))
    failures.push(`Server-only ${forbidden} shipped in static output`);
for (const file of files.filter((f) =>
  [".html", ".js", ".css"].includes(extname(f)),
)) {
  const s = await readFile(file, "utf8");
  if (/dev-only-insecure-secret|changeme|\/api\/leads|\/api\/documents/.test(s))
    failures.push(`${relative(root, file)}: legacy server reference`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `PASS: ${html.length} HTML documents; ${checked} local links/assets/anchors verified. No API/admin output or legacy server secrets.`,
);
