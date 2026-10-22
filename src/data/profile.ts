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
  /** Cifras del hero: valor corto y una etiqueta. */
  facts: [
    { value: { es: '3+', en: '3+' }, label: { es: 'años en QA fintech', en: 'years in fintech QA' } },
    { value: { es: '4', en: '4' }, label: { es: 'frameworks públicos con CI', en: 'public frameworks with CI' } },
    { value: { es: 'Web · API · Móvil', en: 'Web · API · Mobile' }, label: { es: 'automatización end-to-end', en: 'end-to-end automation' } },
  ] satisfies { value: Localized; label: Localized }[],
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
    period: { es: 'abril 2024 – septiembre 2026', en: 'April 2024 – September 2026' },
    bullets: {
      es: [
        'Diseñé e implementé desde cero el framework de automatización E2E con Playwright y TypeScript (Page Object Model, selectores estables con data-testid) sobre los flujos críticos, y luego migré los flujos a Selenium (Java, Cucumber).',
        'Automaticé la regresión de los flujos de mayor riesgo, reduciendo el trabajo manual.',
        'Gestioné los scripts de automatización en GitHub con ramas, commits y pull requests, y configuré el CI/CD para ejecutarlos en cada push en los ambientes dev, QA y prod.',
        'Documenté requisitos en Gherkin (Feature con Como, Quiero, Para; Scenario con Given, When, Then y And) y los ejecuté como pruebas automatizadas con Cucumber.',
        'Validé APIs con Postman, contrastando los datos devueltos con la base de datos y la interfaz.',
        'Validé datos en SQL y MongoDB, incluida la integridad tras migraciones, y concilié saldos entre el procesador de pagos y la plataforma: la diferencia venía de la comisión, calculada en la plataforma pero cobrada en USDT al tipo de cambio de cada momento.',
      ],
      en: [
        'Designed and built the E2E automation framework from scratch with Playwright and TypeScript (Page Object Model, stable data-testid selectors) across the critical business flows, then migrated the flows to Selenium (Java, Cucumber).',
        'Automated regression for the highest-risk flows, reducing manual work.',
        'Managed the automation scripts on GitHub with branches, commits and pull requests, and set up CI/CD to run them on every push across the dev, QA and prod environments.',
        'Documented requirements in Gherkin (Features with As a, I want, So that; Scenarios with Given, When, Then and And) and ran them as automated tests with Cucumber.',
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
        'Analicé requerimientos, redacté criterios de aceptación en Gherkin como documentación para las pruebas manuales y diseñé casos con escenarios positivos, negativos y de valores límite.',
        'Ejecuté pruebas funcionales, de integración, de sistema, regresión, smoke, sanity, confirmación y exploratorias, validando reglas de negocio y consistencia de datos.',
        'Verifiqué la fidelidad visual contra Figma, el comportamiento responsive, las traducciones y las validaciones de formularios.',
        'Gestioné los defectos en Jira bajo Scrum, con evidencia, severidad y seguimiento hasta el cierre.',
      ],
      en: [
        'Reviewed the tournaments and rankings module of a trading platform, verifying with SQL that results, positions and prizes were calculated correctly, since ranking accuracy decides who wins.',
        'Analyzed requirements, wrote acceptance criteria in Gherkin as documentation for manual testing and designed test cases with positive, negative and boundary-value scenarios.',
        'Ran functional, integration, system, regression, smoke, sanity, confirmation and exploratory tests, validating business rules and data consistency.',
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
  { name: { es: 'Automatización E2E', en: 'E2E automation' }, items: ['Playwright (TypeScript)', 'Selenium (Java)', 'Appium (Android)', 'Cucumber'] },
  { name: { es: 'API y datos', en: 'API and data' }, items: ['Postman', 'Karate', 'REST Assured', 'SQL', 'MongoDB'] },
  { name: { es: 'BDD y gestión', en: 'BDD and management' }, items: ['Gherkin', 'Criterios de aceptación', 'Jira', 'Scrum'] },
  { name: { es: 'CI/CD y versiones', en: 'CI/CD and version control' }, items: ['GitHub Actions', 'Git', 'GitHub'] },
  { name: { es: 'Herramientas', en: 'Tools' }, items: ['Excel', 'Power BI', 'Figma', 'IA (Claude)', 'JMeter (básico)'] },
];

export const education = {
  degree: { es: 'Desarrollo de Sistemas Front-End y Back-End — IDAT', en: 'Front-End and Back-End Systems Development — IDAT' } satisfies Localized,
  languages: { es: 'Español nativo · Inglés intermedio (B1)', en: 'Spanish: native · English: intermediate (B1)' } satisfies Localized,
  certifications: {
    es: ['Fundamentos de Pruebas de Software', 'Automatización de Tests con Playwright', 'Base de Datos con SQL', 'Git y GitHub', 'Excel Avanzado para Análisis de Datos', 'CCNA: Introducción a las redes (Cisco)'],
    en: ['Software Testing Fundamentals', 'Test Automation with Playwright', 'Databases with SQL', 'Git and GitHub', 'Advanced Excel for Data Analysis', 'CCNA: Introduction to Networks (Cisco)'],
  } satisfies Record<Lang, string[]>,
};
