import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;

export interface Project {
  slug: string;
  name: string;
  repo: string;
  /** Archivo del workflow de GitHub Actions, para el badge de CI. */
  workflow: string;
  summary: Localized;
  stats: { value: string; label: Localized }[];
  stack: string[];
  highlights: Record<Lang, { title: string; text: string }[]>;
  run: string;
}

const GITHUB = 'https://github.com/anavastech';

export const projects: Project[] = [
  {
    slug: 'appium',
    name: 'Appium Mobile Framework',
    repo: `${GITHUB}/appium-cucumber-java-framework`,
    workflow: 'android.yml',
    summary: {
      es: 'Automatización E2E de una app Android con Appium, Java 21 y Cucumber en español. Va más allá de tocar botones: cambia de contexto nativo a WebView, hace gestos, manda la app a segundo plano y usa el botón Atrás del sistema.',
      en: 'E2E automation of an Android app with Appium, Java 21 and Cucumber (scenarios in Spanish). It goes beyond tapping buttons: it switches from native to WebView context, performs gestures, sends the app to the background and uses the system Back button.',
    },
    stats: [
      { value: '23', label: { es: 'escenarios', en: 'scenarios' } },
      { value: '6', label: { es: 'features', en: 'features' } },
      { value: 'Android', label: { es: 'emulador en CI', en: 'emulator in CI' } },
    ],
    stack: ['Java 21', 'Appium 3', 'UiAutomator2', 'Cucumber', 'JUnit 5', 'AssertJ', 'GitHub Actions'],
    highlights: {
      es: [
        { title: 'Contexto nativo ↔ WebView', text: 'Entra al contexto web con chromedriver, valida título y DOM, y vuelve a NATIVE_APP en un finally para que un fallo no deje la sesión en el contexto equivocado.' },
        { title: 'Gestos con W3C Actions', text: 'Swipe portable entre Android e iOS que detecta solo el final del catálogo, en lugar de un número fijo de deslizamientos.' },
        { title: 'Diagnóstico de una fuga de memoria', text: 'El emulador acumulaba ~130 MB por cada apertura de la app hasta congelar WSL. Lo medí, lo aislé con adb (no era Appium) y lo resolví con un script que levanta un emulador limpio por corrida.' },
        { title: 'Tests estables, no reintentos ciegos', text: 'La app reutiliza ids entre pantallas: cada Page Object espera un elemento exclusivo de su pantalla, lo que eliminó StaleElementReferenceException intermitentes.' },
      ],
      en: [
        { title: 'Native ↔ WebView context', text: 'Switches into the web context through chromedriver, checks title and DOM, and returns to NATIVE_APP in a finally block so a failure never leaves the session in the wrong context.' },
        { title: 'Gestures with W3C Actions', text: 'A swipe that works on both Android and iOS and detects the end of the catalog by itself instead of using a fixed number of swipes.' },
        { title: 'Tracking down a memory leak', text: 'The emulator grew ~130 MB every time the app opened until WSL froze. I measured it, isolated it with adb (it was not Appium) and solved it with a script that boots a clean emulator per run.' },
        { title: 'Stable tests, not blind retries', text: 'The app reuses ids across screens, so each Page Object waits for an element unique to its screen, which removed intermittent StaleElementReferenceExceptions.' },
      ],
    },
    run: 'scripts/run-android.sh -Dcucumber.filter.tags="@smoke"',
  },
  {
    slug: 'selenium',
    name: 'Selenium + Cucumber Framework',
    repo: `${GITHUB}/selenium-cucumber-java-framework`,
    workflow: 'selenium.yml',
    summary: {
      es: 'Framework E2E y de API con Java 21, Selenium 4 y Cucumber sobre SauceDemo y restful-booker. Gherkin ejecutable, IDs trazables por caso y ejecución en Chrome, Firefox, Edge y viewport móvil.',
      en: 'E2E and API framework with Java 21, Selenium 4 and Cucumber against SauceDemo and restful-booker. Executable Gherkin, traceable IDs per test case and runs on Chrome, Firefox, Edge and a mobile viewport.',
    },
    stats: [
      { value: '52', label: { es: 'escenarios UI + API', en: 'UI + API scenarios' } },
      { value: '3 + 1', label: { es: 'navegadores + móvil en CI', en: 'browsers + mobile in CI' } },
      { value: '4.5×', label: { es: 'suite más rápida (215→48 s)', en: 'faster suite (215→48 s)' } },
    ],
    stack: ['Java 21', 'Selenium 4', 'Cucumber 7', 'PicoContainer', 'REST Assured', 'axe-core', 'Allure', 'Datafaker'],
    highlights: {
      es: [
        { title: 'Defectos reales documentados', text: 'Los escenarios @known-defect fijan el comportamiento real de la app (como el visual_user de SauceDemo). Si alguien corrige el bug, el test falla y avisa del cambio.' },
        { title: 'Contrato de API con JSON Schema', text: 'La forma de las respuestas se valida con schemas, y toda reserva creada se borra en un hook aunque el escenario falle a mitad de camino.' },
        { title: 'Contexto por escenario', text: 'PicoContainer inyecta el estado en los steps sin estáticos ni ThreadLocal, lo que hace segura la ejecución en paralelo.' },
        { title: 'De 215 s a 48 s', text: 'Selenium Manager resolvía el driver en cada escenario. Memorizar la ruta por corrida bajó la suite completa a menos de una cuarta parte.' },
      ],
      en: [
        { title: 'Real defects documented', text: '@known-defect scenarios pin down the actual behavior of the app (such as SauceDemo’s visual_user). If someone fixes the bug, the test fails and flags the change.' },
        { title: 'API contract with JSON Schema', text: 'Response shapes are validated with schemas, and every booking created is deleted by a hook even if the scenario fails halfway.' },
        { title: 'Per-scenario context', text: 'PicoContainer injects state into the steps without statics or ThreadLocal, which makes parallel runs safe.' },
        { title: 'From 215 s to 48 s', text: 'Selenium Manager resolved the driver on every scenario. Caching the path per run cut the full suite to under a quarter of the time.' },
      ],
    },
    run: './mvnw test -Dcucumber.filter.tags="@smoke"',
  },
  {
    slug: 'playwright',
    name: 'Playwright + TypeScript Suite',
    repo: `${GITHUB}/playwright-ts-qa-suite`,
    workflow: 'playwright.yml',
    summary: {
      es: 'Suite E2E y de API con Playwright y TypeScript sobre SauceDemo y restful-booker. Cada caso está escrito en Gherkin con su ID y un chequeo en CI garantiza que documentación y tests no se desincronicen.',
      en: 'E2E and API suite with Playwright and TypeScript against SauceDemo and restful-booker. Every case is written in Gherkin with its ID, and a CI check guarantees docs and tests never drift apart.',
    },
    stats: [
      { value: '41', label: { es: 'casos con ID trazable', en: 'traceable test cases' } },
      { value: '3 + 1', label: { es: 'navegadores + móvil', en: 'browsers + mobile' } },
      { value: 'a11y', label: { es: 'WCAG 2.0 A/AA', en: 'WCAG 2.0 A/AA' } },
    ],
    stack: ['TypeScript', 'Playwright', 'zod', 'axe-core', 'Biome', 'GitHub Actions'],
    highlights: {
      es: [
        { title: 'Trazabilidad verificada', text: 'Un script en CI falla si un caso documentado en Gherkin no tiene test, o si los tags del documento y del test no coinciden.' },
        { title: 'Mocking de red', text: 'Con page.route() simula imágenes y terceros caídos, e intercepta el reporte de errores a monitoreo sin depender de que el fallo ocurra de verdad.' },
        { title: 'Sesión reutilizada', text: 'Un proyecto de setup inicia sesión una sola vez y guarda el storageState; los tests lo reciben por fixture en vez de repetir el login.' },
        { title: 'Contrato de API con zod', text: 'La forma de cada respuesta se valida con un schema, así un cambio en la API falla con un mensaje claro.' },
      ],
      en: [
        { title: 'Verified traceability', text: 'A CI script fails if a case documented in Gherkin has no test, or if the tags in the doc and the test do not match.' },
        { title: 'Network mocking', text: 'page.route() simulates broken images and third parties, and intercepts error reporting to monitoring without waiting for real failures.' },
        { title: 'Reused session', text: 'A setup project logs in once and saves the storageState; tests receive it through a fixture instead of repeating the login.' },
        { title: 'API contract with zod', text: 'Each response shape is validated with a schema, so an API change fails with a clear message.' },
      ],
    },
    run: 'npm run test:smoke',
  },
];

export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Proyecto desconocido: ${slug}`);
  return project;
}
