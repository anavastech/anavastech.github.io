import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;

export type ProjectKind = 'mobile' | 'web' | 'api';

export interface Project {
  slug: string;
  name: string;
  /** Qué se automatiza: app móvil nativa, web + API o solo API. Se muestra como etiqueta en la tarjeta. */
  kind: ProjectKind;
  /** App o sitios de práctica sobre los que corren las pruebas. */
  target: Localized;
  repo: string;
  /** Archivo del workflow de GitHub Actions, para el badge de CI. */
  workflow: string;
  /** Reporte publicado de la última ejecución, si existe. */
  report?: string;
  /** Una línea, como en el CV. */
  summary: Localized;
  /** Cuándo corre en CI: se muestra junto al badge. */
  ci: Localized;
  /**
   * Cifras clave, sacadas del último run de CI y del repo. El valor va grande en la tarjeta,
   * así que tiene que ser corto; la explicación tiene que entenderse sin conocer el proyecto.
   */
  stats: { value: string; label: Localized }[];
  /** Las herramientas principales, para la tarjeta. El stack completo se ve en la página de detalle. */
  keyStack: string[];
  stack: string[];
  highlights: Record<Lang, { title: string; text: string }[]>;
  run: string;
}

const GITHUB = 'https://github.com/anavastech';

// Mismo orden y mismas cifras que la sección "Proyectos personales" del CV.
export const projects: Project[] = [
  {
    slug: 'appium',
    name: 'Appium Mobile Framework',
    kind: 'mobile',
    target: { es: 'My Demo App de Sauce Labs (Android)', en: 'Sauce Labs My Demo App (Android)' },
    repo: `${GITHUB}/appium-cucumber-java-framework`,
    workflow: 'android.yml',
    summary: {
      es: '23 escenarios BDD sobre una app Android nativa: login, catálogo, carrito, checkout de punta a punta, WebView y gestos.',
      en: '23 BDD scenarios on a native Android app: login, catalog, cart, end-to-end checkout, WebView and gestures.',
    },
    ci: { es: '4 smoke en cada push, en un emulador Android 14', en: '4 smoke tests on every push, on an Android 14 emulator' },
    stats: [
      { value: '23', label: { es: 'escenarios BDD en 6 features', en: 'BDD scenarios across 6 features' } },
      { value: '4', label: { es: 'smoke en CI en cada push', en: 'smoke tests in CI on every push' } },
      { value: 'WebView', label: { es: 'pasa de la vista nativa a la web dentro de la app', en: 'switches from native view to web inside the app' } },
    ],
    keyStack: ['Java 21', 'Appium 3', 'Cucumber', 'GitHub Actions'],
    stack: ['Java 21', 'Appium 3', 'UiAutomator2', 'Cucumber', 'JUnit 5', 'AssertJ', 'GitHub Actions'],
    highlights: {
      es: [
        { title: 'Contexto nativo ↔ WebView', text: 'Entra al contexto web con chromedriver, valida título y DOM, y vuelve a NATIVE_APP en un finally para que un fallo no deje la sesión en el contexto equivocado.' },
        { title: 'Gestos y funciones del sistema', text: 'Swipe con W3C Actions que detecta solo el final del catálogo, app en segundo plano y botón Atrás del sistema.' },
        { title: 'Diagnóstico de una fuga de memoria', text: 'El emulador acumulaba ~130 MB por cada apertura de la app hasta congelar WSL. Lo medí, lo aislé con adb (no era Appium) y lo resolví con un script que levanta un emulador limpio por corrida.' },
        { title: 'Tests estables, no reintentos ciegos', text: 'La app reutiliza ids entre pantallas: cada Page Object espera un elemento exclusivo de su pantalla, lo que eliminó StaleElementReferenceException intermitentes.' },
      ],
      en: [
        { title: 'Native ↔ WebView context', text: 'Switches into the web context through chromedriver, checks title and DOM, and returns to NATIVE_APP in a finally block so a failure never leaves the session in the wrong context.' },
        { title: 'Gestures and system features', text: 'A W3C Actions swipe that detects the end of the catalog by itself, app in background and the system Back button.' },
        { title: 'Tracking down a memory leak', text: 'The emulator grew ~130 MB every time the app opened until WSL froze. I measured it, isolated it with adb (it was not Appium) and solved it with a script that boots a clean emulator per run.' },
        { title: 'Stable tests, not blind retries', text: 'The app reuses ids across screens, so each Page Object waits for an element unique to its screen, which removed intermittent StaleElementReferenceExceptions.' },
      ],
    },
    run: 'scripts/run-android.sh -Dcucumber.filter.tags="@smoke"',
  },
  {
    slug: 'selenium',
    name: 'Selenium + Cucumber Framework',
    kind: 'web',
    target: { es: 'SauceDemo (tienda web) y Restful Booker (API)', en: 'SauceDemo (web store) and Restful Booker (API)' },
    repo: `${GITHUB}/selenium-cucumber-java-framework`,
    workflow: 'selenium.yml',
    summary: {
      es: '52 escenarios de UI y API en un mismo framework Java, en Chrome, Firefox y Edge, con REST Assured para la API.',
      en: '52 UI and API scenarios in a single Java framework, on Chrome, Firefox and Edge, with REST Assured for the API.',
    },
    ci: { es: 'Suite completa en cada push y a diario, navegadores en paralelo', en: 'Full suite on every push and daily, browsers in parallel' },
    stats: [
      { value: '52', label: { es: 'escenarios: 37 de UI y 15 de API', en: 'scenarios: 37 UI and 15 API' } },
      { value: '3 + móvil', label: { es: 'Chrome, Firefox y Edge, más vista móvil', en: 'Chrome, Firefox and Edge, plus mobile view' } },
      { value: '10', label: { es: 'defectos reales documentados como tests', en: 'real defects documented as tests' } },
    ],
    keyStack: ['Java 21', 'Selenium 4', 'Cucumber 7', 'REST Assured'],
    stack: ['Java 21', 'Selenium 4', 'Cucumber 7', 'PicoContainer', 'REST Assured', 'axe-core', 'Allure', 'GitHub Actions'],
    highlights: {
      es: [
        { title: 'Defectos reales documentados', text: 'Los escenarios @known-defect fijan el comportamiento real de la app y la API. Si alguien corrige el bug, el test falla y avisa del cambio.' },
        { title: 'Contrato de API con JSON Schema', text: 'La forma de las respuestas se valida con schemas, y toda reserva creada se borra en un hook aunque el escenario falle a mitad de camino.' },
        { title: 'Paralelo y sin estado compartido', text: '4 hilos en paralelo: PicoContainer inyecta el estado en los steps sin estáticos ni ThreadLocal, así cada escenario tiene su propio WebDriver.' },
        { title: 'De 215 s a 48 s', text: 'Selenium Manager resolvía el driver en cada escenario. Memorizar la ruta por corrida bajó la suite completa a menos de una cuarta parte.' },
      ],
      en: [
        { title: 'Real defects documented', text: '@known-defect scenarios pin down the actual behavior of the app and the API. If someone fixes the bug, the test fails and flags the change.' },
        { title: 'API contract with JSON Schema', text: 'Response shapes are validated with schemas, and every booking created is deleted by a hook even if the scenario fails halfway.' },
        { title: 'Parallel with no shared state', text: '4 parallel threads: PicoContainer injects state into the steps without statics or ThreadLocal, so each scenario gets its own WebDriver.' },
        { title: 'From 215 s to 48 s', text: 'Selenium Manager resolved the driver on every scenario. Caching the path per run cut the full suite to under a quarter of the time.' },
      ],
    },
    run: './mvnw test -Dcucumber.filter.tags="@smoke"',
  },
  {
    slug: 'playwright',
    name: 'Playwright + TypeScript Suite',
    kind: 'web',
    target: { es: 'SauceDemo (tienda web) y Restful Booker (API)', en: 'SauceDemo (web store) and Restful Booker (API)' },
    repo: `${GITHUB}/playwright-ts-qa-suite`,
    workflow: 'playwright.yml',
    summary: {
      es: '48 tests de UI y API en Chromium, Firefox, WebKit y mobile, con revisión de accesibilidad y mocking de red.',
      en: '48 UI and API tests on Chromium, Firefox, WebKit and mobile, with accessibility checks and network mocking.',
    },
    ci: { es: 'Smoke en cada push y suite completa a diario', en: 'Smoke on every push and full suite daily' },
    stats: [
      { value: '48', label: { es: 'tests: 33 de UI y 15 de API', en: 'tests: 33 UI and 15 API' } },
      { value: '122', label: { es: 'ejecuciones en 4 navegadores, en 1.3 min', en: 'runs across 4 browsers, in 1.3 min' } },
      { value: 'WCAG', label: { es: 'accesibilidad A y AA con axe-core', en: 'A and AA accessibility with axe-core' } },
    ],
    keyStack: ['TypeScript', 'Playwright', 'axe-core', 'GitHub Actions'],
    stack: ['TypeScript', 'Playwright', 'zod', 'axe-core', 'Biome', 'GitHub Actions'],
    highlights: {
      es: [
        { title: 'Trazabilidad verificada', text: 'Cada caso está documentado en Gherkin con su ID, y un script en CI falla si un caso no tiene test o si los tags del documento y del test no coinciden.' },
        { title: 'Mocking de red', text: 'Con page.route() simula imágenes y terceros caídos, e intercepta el reporte de errores a monitoreo sin depender de que el fallo ocurra de verdad.' },
        { title: 'Sesión reutilizada', text: 'Un proyecto de setup inicia sesión una sola vez y guarda el storageState; los tests lo reciben por fixture en vez de repetir el login.' },
        { title: 'Contrato de API con zod', text: 'La forma de cada respuesta se valida con un schema, así un cambio en la API falla con un mensaje claro.' },
      ],
      en: [
        { title: 'Verified traceability', text: 'Every case is documented in Gherkin with its ID, and a CI script fails if a case has no test or if the tags in the doc and the test do not match.' },
        { title: 'Network mocking', text: 'page.route() simulates broken images and third parties, and intercepts error reporting to monitoring without waiting for real failures.' },
        { title: 'Reused session', text: 'A setup project logs in once and saves the storageState; tests receive it through a fixture instead of repeating the login.' },
        { title: 'API contract with zod', text: 'Each response shape is validated with a schema, so an API change fails with a clear message.' },
      ],
    },
    run: 'npm run test:smoke',
  },
  {
    slug: 'karate',
    name: 'Karate API Tests',
    kind: 'api',
    target: { es: 'Restful Booker (API REST de reservas)', en: 'Restful Booker (booking REST API)' },
    repo: `${GITHUB}/karate-restful-booker-api-tests`,
    workflow: 'api-tests.yml',
    report: 'https://anavastech.github.io/karate-restful-booker-api-tests/',
    summary: {
      es: '47 escenarios de API sobre los 8 endpoints de Restful Booker, con validación de contratos y casos data-driven.',
      en: '47 API scenarios covering the 8 endpoints of Restful Booker, with contract validation and data-driven cases.',
    },
    ci: { es: 'En cada push y a diario, con el reporte en GitHub Pages', en: 'On every push and daily, with the report on GitHub Pages' },
    stats: [
      { value: '47', label: { es: 'escenarios sobre los 8 endpoints', en: 'scenarios across the 8 endpoints' } },
      { value: '7 s', label: { es: 'en 5 hilos, 3.4× más rápido que en serie', en: 'on 5 threads, 3.4× faster than serial' } },
      { value: '20', label: { es: 'defectos reales de la API documentados', en: 'real API defects documented' } },
    ],
    keyStack: ['Java 17', 'Karate', 'JUnit 5', 'GitHub Actions'],
    stack: ['Java 17', 'Karate 1.5', 'JUnit 5', 'Maven', 'GitHub Actions', 'GitHub Pages'],
    highlights: {
      es: [
        { title: 'Comportamiento real vs. correcto', text: 'La regresión valida lo que la API hace hoy, verificado antes con curl. Cuando eso es incorrecto, un escenario @bug aparte valida lo correcto y falla a propósito: si la API se corrige, la señal es inmediata.' },
        { title: 'Independientes y en paralelo', text: 'Cada escenario crea su propia reserva con nombres únicos y fechas relativas, sin depender de otro escenario ni de datos precargados. Así corren en 5 hilos aunque la API se reinicie.' },
        { title: 'Contratos reutilizables', text: '4 esquemas fuzzy-match de Karate validan la forma de las respuestas y se comparten entre features.' },
        { title: 'Efectos secundarios verificados', text: 'Cada PUT, PATCH o DELETE rechazado va seguido de un GET que demuestra que la reserva no cambió, y cada borrado se confirma con un 404.' },
      ],
      en: [
        { title: 'Actual vs. correct behavior', text: 'Regression checks what the API does today, verified first with curl. When that is wrong, a separate @bug scenario checks the correct behavior and fails on purpose: if the API is fixed, the signal is immediate.' },
        { title: 'Independent and parallel', text: 'Each scenario creates its own booking with unique names and relative dates, with no dependency on other scenarios or seeded data. That lets them run on 5 threads even when the API resets.' },
        { title: 'Reusable contracts', text: '4 Karate fuzzy-match schemas validate response shapes and are shared across features.' },
        { title: 'Side effects verified', text: 'Every rejected PUT, PATCH or DELETE is followed by a GET proving the booking did not change, and every deletion is confirmed with a 404.' },
      ],
    },
    run: 'mvn test -Dtags=@smoke',
  },
];

export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Proyecto desconocido: ${slug}`);
  return project;
}
