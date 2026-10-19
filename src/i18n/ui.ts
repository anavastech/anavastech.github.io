export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;

/** Textos fijos de la interfaz. El contenido (perfil, proyectos) vive en src/data/. */
export const ui = {
  es: {
    'meta.description': 'Alexander Navas, QA Automation Engineer en Lima, Perú. Automatización E2E web, API y móvil con Playwright, Selenium y Appium.',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.switch': 'English',
    'hero.role': 'QA Automation Engineer',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.cv': 'Descargar CV',
    'about.title': 'Sobre mí',
    'about.photoAlt': 'Foto de Alexander Navas',
    'experience.title': 'Experiencia',
    'skills.title': 'Habilidades',
    'education.title': 'Formación y certificaciones',
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Tres frameworks de automatización públicos, cada uno con CI en GitHub Actions. Usan sitios y apps de práctica: nada de código propietario.',
    'projects.details': 'Ver detalles',
    'projects.kind.mobile': 'App móvil nativa',
    'projects.kind.web': 'Web + API',
    'projects.target': 'Prueba sobre',
    'projects.keyStack': 'Herramientas principales',
    'projects.repo': 'Repositorio',
    'projects.highlights': 'Decisiones destacadas',
    'projects.stack': 'Stack',
    'projects.run': 'Cómo ejecutarlo',
    'projects.back': '← Volver a proyectos',
    'contact.title': 'Contacto',
    'contact.text': '¿Buscas a alguien que automatice tus pruebas y cuide la calidad de tus entregas? Escríbeme.',
    'contact.email': 'Correo',
  },
  en: {
    'meta.description': 'Alexander Navas, QA Automation Engineer based in Lima, Peru. Web, API and mobile E2E automation with Playwright, Selenium and Appium.',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.switch': 'Español',
    'hero.role': 'QA Automation Engineer',
    'hero.cta.projects': 'See projects',
    'hero.cta.cv': 'Download CV',
    'about.title': 'About me',
    'about.photoAlt': 'Photo of Alexander Navas',
    'experience.title': 'Experience',
    'skills.title': 'Skills',
    'education.title': 'Education and certifications',
    'projects.title': 'Projects',
    'projects.subtitle': 'Three public automation frameworks, each with CI on GitHub Actions. They target practice sites and apps: no proprietary code.',
    'projects.details': 'View details',
    'projects.kind.mobile': 'Native mobile app',
    'projects.kind.web': 'Web + API',
    'projects.target': 'Tested on',
    'projects.keyStack': 'Main tools',
    'projects.repo': 'Repository',
    'projects.highlights': 'Key decisions',
    'projects.stack': 'Stack',
    'projects.run': 'How to run it',
    'projects.back': '← Back to projects',
    'contact.title': 'Contact',
    'contact.text': 'Looking for someone to automate your tests and keep your releases stable? Get in touch.',
    'contact.email': 'Email',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

/** Ruta de inicio de cada idioma: español en la raíz, inglés bajo /en/. */
export function homePath(lang: Lang): string {
  return lang === 'es' ? '/' : '/en/';
}

export function projectPath(lang: Lang, slug: string): string {
  return lang === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`;
}
