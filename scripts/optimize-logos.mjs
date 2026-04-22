import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const LOGOS_DIR = new URL("../public/logos/", import.meta.url).pathname;
const MAX_W = 400;
const MAX_H = 220;
const QUALITY = 85;

const EXT_RE = /\.(png|jpe?g|webp)$/i;

const fmtSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const files = (await readdir(LOGOS_DIR)).filter((f) => EXT_RE.test(f)).sort();

let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const file of files) {
  const src = join(LOGOS_DIR, file);
  const { name } = parse(file);
  const out = join(LOGOS_DIR, `${name}.webp`);
  const tmp = `${out}.tmp`;

  const before = (await stat(src)).size;

  await sharp(src)
    .resize(MAX_W, MAX_H, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tmp);

  const { rename, unlink } = await import("node:fs/promises");
  await rename(tmp, out);

  const after = (await stat(out)).size;
  totalBefore += before;
  totalAfter += after;
  rows.push({ file, before, after });
}

const pad = (s, n) => s.padEnd(n);
console.log();
console.log(pad("FILE", 28), pad("BEFORE", 12), pad("AFTER", 12), "SAVED");
console.log("-".repeat(70));
for (const r of rows) {
  const saved = ((1 - r.after / r.before) * 100).toFixed(0);
  console.log(
    pad(r.file, 28),
    pad(fmtSize(r.before), 12),
    pad(fmtSize(r.after), 12),
    `${saved}%`,
  );
}
console.log("-".repeat(70));
console.log(
  pad("TOTAL", 28),
  pad(fmtSize(totalBefore), 12),
  pad(fmtSize(totalAfter), 12),
  `${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`,
);
console.log();
console.log(
  "Originals left in place. Review .webp output, then delete .png/.jpg sources when ready.",
);
