import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { projects } from '../src/data/projects';

const PAGES = [
  { path: '/', lang: 'es' },
  { path: '/en/', lang: 'en' },
  ...projects.flatMap((p) => [
    { path: `/proyectos/${p.slug}/`, lang: 'es' },
    { path: `/en/projects/${p.slug}/`, lang: 'en' },
  ]),
];

test.describe('Inicio', () => {
  test('muestra nombre, rol y los tres proyectos en español', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Alexander Navas Rivadeneyra');
    await expect(page.getByText('QA Automation Engineer').first()).toBeVisible();
    for (const project of projects) {
      await expect(page.getByTestId(`project-${project.slug}`)).toBeVisible();
    }
  });

  test('el selector de idioma lleva a la versión en inglés y vuelve', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('lang-switch').click();
    await expect(page).toHaveURL('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();

    await page.getByTestId('lang-switch').click();
    await expect(page).toHaveURL('/');
  });

  test('cada tarjeta enlaza al repositorio correcto de GitHub', async ({ page }) => {
    await page.goto('/');
    for (const project of projects) {
      const card = page.getByTestId(`project-${project.slug}`);
      await expect(card.getByTestId('repo-link')).toHaveAttribute('href', project.repo);
    }
  });

  test('sin foto en public/foto/ muestra las iniciales; con foto, la imagen', async ({ page }) => {
    await page.goto('/');
    const avatar = page.getByTestId('profile-photo');
    await expect(avatar).toBeVisible();
    const hasPhoto = (await avatar.locator('img').count()) > 0;
    if (hasPhoto) {
      await expect(avatar.locator('img')).toHaveJSProperty('complete', true);
      expect(await avatar.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    } else {
      await expect(avatar).toHaveText('AN');
    }
  });
});

test.describe('Detalle de proyecto', () => {
  test('el selector de idioma mantiene el mismo proyecto', async ({ page }) => {
    await page.goto('/proyectos/appium/');
    await page.getByTestId('lang-switch').click();
    await expect(page).toHaveURL('/en/projects/appium/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Appium Mobile Framework');
  });
});

for (const { path, lang } of PAGES) {
  test.describe(`Página ${path}`, () => {
    test('no tiene enlaces internos rotos', async ({ page, request }) => {
      await page.goto(path);
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''));
      const paths = [...new Set(hrefs.map((href) => href.split('#')[0]).filter(Boolean))];
      for (const target of paths) {
        const response = await request.get(target);
        expect(response.status(), `${target} enlazado desde ${path}`).toBe(200);
      }
    });

    test('pasa la revisión de accesibilidad WCAG 2.1 A/AA', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });

    test('no produce scroll horizontal', async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
