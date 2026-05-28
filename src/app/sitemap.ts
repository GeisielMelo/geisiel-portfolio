import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/metadata'
import { routing } from '@/i18n/routing'

const ROUTES: Array<{ path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }> = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/archive', priority: 0.7, changeFrequency: 'monthly' },
]

function urlFor(locale: string, path: string): string {
  const clean = path === '/' ? '' : path
  if (locale === routing.defaultLocale) return `${SITE_URL}${clean}` || SITE_URL
  return `${SITE_URL}/${locale}${clean}`
}

function hreflangKey(locale: string): string {
  return locale === 'pt' ? 'pt-BR' : locale
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.map(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {}
    for (const locale of routing.locales) {
      languages[hreflangKey(locale)] = urlFor(locale, path)
    }
    languages['x-default'] = urlFor(routing.defaultLocale, path)

    return {
      url: urlFor(routing.defaultLocale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    }
  })
}
