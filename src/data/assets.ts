import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from '../i18n/ui';

// Se evalúa al construir el sitio (astro build / astro dev), no en el navegador:
// basta con copiar los archivos en public/ y volver a construir para que aparezcan.
const PUBLIC_DIR = join(process.cwd(), 'public');
const PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

/** Primera imagen que haya en public/foto/, o null para mostrar las iniciales. */
export function profilePhoto(): string | null {
  const dir = join(PUBLIC_DIR, 'foto');
  if (!existsSync(dir)) return null;
  const photo = readdirSync(dir)
    .sort()
    .find((file) => PHOTO_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)));
  return photo ? `/foto/${encodeURIComponent(photo)}` : null;
}

const CV_FILES: Record<Lang, string> = {
  es: 'CV-Alexander-ES.pdf',
  en: 'CV-Alexander-EN.pdf',
};

/** CV del idioma pedido si existe en public/cv/; si no, el del otro idioma; si no hay ninguno, null. */
export function cvPath(lang: Lang): string | null {
  const order: Lang[] = lang === 'es' ? ['es', 'en'] : ['en', 'es'];
  const file = order.map((l) => CV_FILES[l]).find((name) => existsSync(join(PUBLIC_DIR, 'cv', name)));
  return file ? `/cv/${file}` : null;
}
