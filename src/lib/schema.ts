import { AppLocale, CANONICAL_NAME, SITE_URL, htmlLang } from '@/lib/metadata'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const UNIFTC_ID = 'https://www.uniftc.edu.br/#organization'

const KNOWS_ABOUT = [
  'TypeScript',
  'JavaScript',
  'Next.js',
  'React',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'MySQL',
  'Tailwind CSS',
  'AWS',
  'Web Performance',
  'Web Accessibility',
]

const SAME_AS = [
  'https://github.com/GeisielMelo',
  'https://www.linkedin.com/in/geisiel',
]

export function organizationUniFTC() {
  return {
    '@type': 'Organization',
    '@id': UNIFTC_ID,
    name: 'UniFTC',
    url: 'https://www.uniftc.edu.br',
  }
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: CANONICAL_NAME,
    alternateName: ['Geisiel', 'Geisiel Nascimento'],
    url: SITE_URL,
    jobTitle: 'Full Stack Developer',
    description:
      'Geisiel Melo is a Brazilian Full Stack Developer at REDE UniFTC, working across web platforms, APIs and system integrations with a focus on performance and accessibility. He has been developing software professionally since 2020, starting as a freelance developer building full-stack applications for small businesses and independent professionals before joining REDE UniFTC in 2024.',
    worksFor: { '@id': UNIFTC_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
    email: 'mailto:geisiel.nascimento@gmail.com',
  }
}

export function websiteSchema(locale: AppLocale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: CANONICAL_NAME,
    url: SITE_URL,
    inLanguage: htmlLang(locale),
    publisher: { '@id': PERSON_ID },
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
