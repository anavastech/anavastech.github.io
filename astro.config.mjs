import { defineConfig } from 'astro/config';

// Repo "anavastech.github.io": GitHub Pages lo publica en la raíz del dominio, sin base path.
export default defineConfig({
  site: 'https://anavastech.github.io',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
