import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export const SITE_URL = 'https://www.geisiel.com'
export const CANONICAL_NAME = 'Geisiel Melo'

export type AppLocale = (typeof routing.locales)[number]

const OG_LOCALE: Record<AppLocale, string> = {
  en: 'en_US',
  pt: 'pt_BR',
}

function pathFor(locale: AppLocale, path: string): string {
  const clean = path === '/' ? '' : path
  if (locale === routing.defaultLocale) return `${SITE_URL}${clean}` || SITE_URL
  return `${SITE_URL}/${locale}${clean}`
}

export function htmlLang(locale: AppLocale): string {
  return locale === 'pt' ? 'pt-BR' : 'en'
}

interface BuildMetadataArgs {
  locale: AppLocale
  path?: string
  title?: string
  description?: string
}

export async function buildMetadata({ locale, path = '/', title, description }: BuildMetadataArgs): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' })

  const canonical = pathFor(locale, path)
  const resolvedTitle = title ?? t('title')
  const resolvedDescription = description ?? t('description')

  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[htmlLang(l)] = pathFor(l, path)
  }
  languages['x-default'] = pathFor(routing.defaultLocale, path)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: t('siteName'),
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
    },
  }
}
