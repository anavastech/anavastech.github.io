# Portafolio — Alexander Navas

[![Test & Deploy](https://github.com/anavastech/anavastech.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/anavastech/anavastech.github.io/actions/workflows/deploy.yml)

Sitio personal de **Alexander Navas, QA Automation Engineer**: perfil, experiencia y los tres frameworks de automatización públicos (Playwright, Selenium + Cucumber y Appium). Bilingüe español / inglés.

🔗 **https://anavastech.github.io**

Como corresponde a un portafolio de QA, el sitio tiene sus propios tests: cada push construye el sitio, corre la suite de Playwright y solo publica si todo pasa.

## Stack

| Necesidad | Herramienta |
| --- | --- |
| Sitio estático | [Astro](https://astro.build) 7 + TypeScript |
| Tests | Playwright (escritorio + móvil) |
| Accesibilidad | axe-core (WCAG 2.1 A/AA) |
| Despliegue | GitHub Actions → GitHub Pages |

## Qué verifican los tests

- La página de inicio muestra nombre, rol y los tres proyectos en ambos idiomas.
- El selector ES/EN lleva a la misma página en el otro idioma (también en el detalle de cada proyecto).
- Cada tarjeta enlaza al repositorio correcto de GitHub.
- La foto de perfil carga, o se muestran las iniciales si todavía no hay foto.
- Ninguna página tiene enlaces internos rotos.
- Todas las páginas pasan axe-core (WCAG 2.1 A/AA) en escritorio y en móvil.
- Ninguna página produce scroll horizontal en móvil.

## Estructura

```
src/
  data/        Contenido: perfil, experiencia, habilidades (profile.ts) y proyectos (projects.ts)
  i18n/        Textos fijos de la interfaz en ES/EN y rutas por idioma
  components/  Header, Hero, tarjetas y páginas (inicio y detalle de proyecto)
  layouts/     Layout base (meta tags, hreflang, fuentes)
  pages/       /  ·  /proyectos/<slug>/  ·  /en/  ·  /en/projects/<slug>/
public/
  foto/        Tu foto de perfil
  cv/          Tus CV en PDF
tests/         Suite de Playwright y servidor estático para probar dist/
.github/       Workflow de test y despliegue
```

## Foto de perfil

Copia tu foto en `public/foto/` (por ejemplo `perfil.jpg`). Se aceptan `.jpg`, `.jpeg`, `.png`, `.webp` y `.avif`.

- Se usa la **primera imagen** de la carpeta en orden alfabético.
- Mientras no haya ninguna, se muestra un avatar con las iniciales (AN).
- Recomendado: foto **cuadrada**, al menos **600×600 px** y menos de **500 KB**. Se muestra recortada en círculo.

## CV descargable

Copia tus CV en `public/cv/` con estos nombres exactos:

- `CV-Alexander-ES.pdf`: lo descarga la versión en español.
- `CV-Alexander-EN.pdf`: lo descarga la versión en inglés.

El botón **Descargar CV** solo aparece cuando hay al menos uno; si falta el de un idioma, se ofrece el del otro.

> ⚠️ Todo lo que esté en `public/` queda **público** en internet. Si tu CV incluye tu teléfono o tu dirección, considera subir una versión sin esos datos.

## Editar el contenido

Todo el texto está en `src/data/`:

- `profile.ts`: presentación, experiencia, habilidades, formación y enlaces de contacto.
- `projects.ts`: proyectos (resumen, cifras, stack, decisiones destacadas y comando para ejecutarlos).

Cada texto tiene su versión `es` y `en`. Para añadir un proyecto basta con agregar un objeto a `projects`: se generan solas su tarjeta y sus páginas de detalle en ambos idiomas.

## Desarrollo local

Requisitos: Node.js 20+.

```bash
npm install
npm run dev            # http://localhost:4321 con recarga en vivo
npm run build          # genera dist/
npm run check          # chequeo de tipos de Astro

npx playwright install chromium   # solo la primera vez
npm test               # construye el sitio y corre los tests
npm run test:headed    # igual, viendo el navegador
```

## Despliegue

`.github/workflows/deploy.yml` corre en cada push a `main`: chequeo de tipos → build → Playwright → publicación en GitHub Pages. En los pull requests solo corre los tests, sin publicar.

Configuración única en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
