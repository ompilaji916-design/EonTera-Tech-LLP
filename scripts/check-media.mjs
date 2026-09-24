import { readdir, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export async function checkMedia(directory) {
  const images = (await readdir(directory)).filter(name => /\.(webp|jpe?g|png)$/i.test(name));
  if (!images.length) throw new Error(`No image files found in ${directory}`);
  const errors = [];
  for (const name of images) {
    try {
      const data = await readFile(join(directory, name));
      if (name.endsWith(".webp") && (data.length < 12 || data.toString("ascii", 0, 4) !== "RIFF" || data.readUInt32LE(4) + 8 !== data.length || data.toString("ascii", 8, 12) !== "WEBP")) {
        throw new Error("incomplete or invalid WebP container");
      }
      // Metadata and HTTP 200 alone cannot detect a damaged image bitstream.
      const { info } = await sharp(data, { failOn: "warning" }).raw().toBuffer({ resolveWithObject: true });
      if (!info.width || !info.height) throw new Error("empty decoded image");
    } catch (error) { errors.push(`${name}: ${error.message}`); }
  }
  if (errors.length) throw new Error(`Image validation failed:\n${errors.join("\n")}`);
  console.log(`PASS: ${images.length} images fully decoded in ${directory}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkMedia(resolve(process.argv[2] || "public/media")).catch(error => { console.error(error.message); process.exitCode = 1; });
}
