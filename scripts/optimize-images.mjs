// Einmalige Bildoptimierung: verkleinert alle JPGs in public/photos auf
// max. 1600px Breite (Qualität 78, progressive + mozjpeg) und die Logos
// auf ihre tatsächlich gerenderte Größe. Läuft in-place — Originale sind
// in der Git-History gesichert.
//
// Aufruf: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join } from "node:path";

const PHOTOS_DIR = "public/photos";
const MAX_WIDTH = 1600;
const QUALITY = 78;

// Logos: Navbar/Footer rendern max. ~40px hoch, Intro ~300px breit,
// OG-Image bettet logo-nav mit 640px ein → 800px Breite reicht überall.
const LOGOS = [
  { file: "public/logo.png", width: 800 },
  { file: "public/logo-nav.png", width: 800 },
  { file: "public/logo-autotech.png", width: 800 },
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function optimizeInPlace(path, transform) {
  const before = (await stat(path)).size;
  const tmp = `${path}.tmp`;
  await transform(sharp(path)).toFile(tmp);
  const after = (await stat(tmp)).size;
  if (after < before) {
    await unlink(path);
    await rename(tmp, path);
    console.log(`${path}: ${kb(before)} -> ${kb(after)}`);
  } else {
    await unlink(tmp);
    console.log(`${path}: ${kb(before)} (bereits optimal, übersprungen)`);
  }
}

let totalBefore = 0;
let totalAfter = 0;

for (const name of await readdir(PHOTOS_DIR)) {
  if (!/\.(jpe?g)$/i.test(name)) continue;
  const path = join(PHOTOS_DIR, name);
  totalBefore += (await stat(path)).size;
  await optimizeInPlace(path, (img) =>
    img
      .rotate() // EXIF-Orientierung einbrennen, bevor Metadaten wegfallen
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
  );
  totalAfter += (await stat(path)).size;
}

for (const { file, width } of LOGOS) {
  await optimizeInPlace(file, (img) =>
    img.resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9, palette: false })
  );
}

console.log(`\nFotos gesamt: ${kb(totalBefore)} -> ${kb(totalAfter)}`);
