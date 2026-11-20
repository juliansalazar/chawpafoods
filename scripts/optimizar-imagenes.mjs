// Convierte las imágenes de /public a WebP (máx. 1200 px de ancho).
// Uso: npm run imagenes
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const carpetas = ['public', 'public/cafe'];
const extensiones = new Set(['.jpg', '.jpeg', '.png']);

for (const carpeta of carpetas) {
  const archivos = await readdir(carpeta).catch(() => []);
  for (const archivo of archivos) {
    const ext = path.extname(archivo).toLowerCase();
    if (!extensiones.has(ext) || archivo.startsWith('logo')) continue;
    const origen = path.join(carpeta, archivo);
    const destino = path.join(carpeta, `${path.basename(archivo, ext)}.webp`);
    const info = await sharp(origen)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destino);
    console.log(`${origen} → ${destino} (${Math.round(info.size / 1024)} KB)`);
  }
}
