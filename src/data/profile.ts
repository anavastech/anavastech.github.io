import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;

export const profile = {
  name: 'Alexander Navas Rivadeneyra',
  shortName: 'Alexander Navas',
  initials: 'AN',
  location: { es: 'Lima, Perú', en: 'Lima, Peru' } satisfies Localized,
  email: 'anavas.tech@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexander-navas-rivadeneyra-7083ab27a/',
  github: 'https://github.com/anavastech',
  tagline: {
    es: 'Automatizo pruebas end-to-end de web, API y móvil para que cada entrega llegue estable a producción.',
    en: 'I automate end-to-end web, API and mobile tests so every release reaches production stable.',
  } satisfies Localized,
  about: {
    es: [
      'Soy QA con más de 3 años de experiencia en pruebas funcionales y automatizadas end-to-end sobre plataformas fintech de trading y opciones binarias.',
      'Levanté desde cero un framework con Playwright + TypeScript y migré los flujos a Selenium. Valido APIs con Postman y datos con SQL y MongoDB, y redacto criterios de aceptación en Gherkin para que negocio, desarrollo y QA hablen el mismo idioma.',
      'Trabajo en equipos ágiles con foco en entregas estables. Fuera del trabajo sigo construyendo frameworks públicos, como los de esta página, para practicar con herramientas nuevas.',
    ],
    en: [
      "I'm a QA with over 3 years of experience in functional and end-to-end automated testing on trading and binary options fintech platforms.",
      'I built a Playwright + TypeScript framework from scratch and migrated the flows to Selenium. I validate APIs with Postman and data with SQL and MongoDB, and write acceptance criteria in Gherkin so business, development and QA speak the same language.',
      'I work in agile teams focused on stable releases. Outside work I keep building public frameworks, like the ones on this page, to practice with new tools.',
    ],
  } satisfies Record<Lang, string[]>,
};

export interface Job {
  company: string;
  role: Localized;
  period: Localized;
  bullets: Record<Lang, string[]>;
}

export const experience: Job[] = [
  {
    company: 'Consorcio Cueva',
    role: { es: 'QA Automation', en: 'QA Automation' },
    period: { es: 'abril 2024 – octubre 2026', en: 'April 2024 – October 2026' },
    bullets: {
      es: [
        'Diseñé e implementé desde cero el framework de automatización E2E con Playwright y TypeScript (Page Object Model, selectores estables con data-testid) sobre los flujos críticos, y luego migré los flujos a Selenium (Java, Cucumber).',
        'Automaticé la regresión de los flujos de mayor riesgo, reduciendo el tiempo y la dependencia de pruebas manuales antes de cada entrega.',
        'Documenté requisitos y pruebas en Gherkin: historias como Feature (Como, Quiero, Para) y criterios como Scenario (Given, When, Then).',
        'Validé APIs con Postman, contrastando los datos devueltos con la base de datos y la interfaz.',
        'Validé datos en SQL y MongoDB, incluida la integridad tras migraciones, y concilié saldos entre el procesador de pagos y la plataforma: la diferencia venía de la comisión, calculada en la plataforma pero cobrada en USDT al tipo de cambio de cada momento.',
      ],
      en: [
        'Designed and built the E2E automation framework from scratch with Playwright and TypeScript (Page Object Model, stable data-testid selectors) across the critical business flows, then migrated the flows to Selenium (Java, Cucumber).',
        'Automated regression for the highest-risk flows, cutting the time and reliance on manual testing before each release.',
        'Documented requirements and tests in Gherkin: user stories as Features (As a, I want, So that) and criteria as Scenarios (Given, When, Then).',
        'Validated APIs with Postman, checking that returned data matched the database and the UI.',
        'Validated data in SQL and MongoDB, including integrity after migrations, and reconciled balances between the payment processor and the platform: the difference came from the fee, calculated on the platform but charged in USDT at the exchange rate of each moment.',
      ],
    },
  },
  {
    company: 'GlobalS1',
    role: { es: 'Analista de Calidad de Software', en: 'Software Quality Analyst' },
    period: { es: 'febrero 2023 – febrero 2024', en: 'February 2023 – February 2024' },
    bullets: {
      es: [
        'Revisé el módulo de torneos y rankings de una plataforma de trading, verificando con SQL que resultados, posiciones y premios se calcularan bien, porque la precisión del ranking define quién gana.',
        'Analicé requerimientos, redacté criterios de aceptación en Gherkin y diseñé casos con escenarios positivos, negativos y de valores límite.',
        'Ejecuté pruebas funcionales, de integración, de sistema, regresión, smoke, sanity, confirmación y exploratorias.',
        'Verifiqué la fidelidad visual contra Figma, el comportamiento responsive, las traducciones y las validaciones de formularios.',
        'Gestioné los defectos en Jira bajo Scrum, con evidencia, severidad y seguimiento hasta el cierre.',
      ],
      en: [
        'Reviewed the tournaments and rankings module of a trading platform, verifying with SQL that results, positions and prizes were calculated correctly, since ranking accuracy decides who wins.',
        'Analyzed requirements, wrote acceptance criteria in Gherkin and designed test cases with positive, negative and boundary-value scenarios.',
        'Ran functional, integration, system, regression, smoke, sanity, confirmation and exploratory tests.',
        'Checked visual fidelity against Figma designs, responsive behavior, translations and form validations.',
        'Managed defects in Jira under Scrum, with evidence, severity and follow-up through closure.',
      ],
    },
  },
];

export interface SkillGroup {
  name: Localized;
  items: string[];
}

export const skills: SkillGroup[] = [
  { name: { es: 'Automatización E2E', en: 'E2E automation' }, items: ['Playwright (TypeScript)', 'Selenium (Java)', 'Appium (Android)', 'Cucumber / BDD'] },
  { name: { es: 'Pruebas de API', en: 'API testing' }, items: ['Postman', 'REST Assured', 'Karate'] },
  { name: { es: 'Bases de datos', en: 'Databases' }, items: ['SQL', 'MongoDB'] },
  { name: { es: 'Calidad y proceso', en: 'Quality and process' }, items: ['Gherkin', 'Jira', 'Scrum'] },
  { name: { es: 'Herramientas', en: 'Tools' }, items: ['Git / GitHub', 'GitHub Actions', 'Figma', 'Power BI', 'JMeter'] },
];

export const education = {
  degree: { es: 'Desarrollo de Sistemas Front-End y Back-End — IDAT', en: 'Front-End and Back-End Systems Development — IDAT' } satisfies Localized,
  languages: { es: 'Español nativo · Inglés intermedio (B1)', en: 'Spanish: native · English: intermediate (B1)' } satisfies Localized,
  certifications: {
    es: ['Fundamentos de Pruebas de Software', 'Automatización de Tests con Playwright', 'Fundamentos de Bases de Datos / SQL', 'Algoritmos y Diagramas de Flujo', 'Git y GitHub', 'Excel Avanzado para Análisis de Datos'],
    en: ['Software Testing Fundamentals', 'Test Automation with Playwright', 'Database Fundamentals / SQL', 'Algorithms and Flowcharts', 'Git and GitHub', 'Advanced Excel for Data Analysis'],
  } satisfies Record<Lang, string[]>,
};
