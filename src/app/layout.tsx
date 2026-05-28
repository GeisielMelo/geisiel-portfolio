import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { AppLocale, CANONICAL_NAME, SITE_URL, htmlLang } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    applicationName: t('siteName'),
    authors: [{ name: CANONICAL_NAME, url: 'https://www.linkedin.com/in/geisiel' }],
    creator: CANONICAL_NAME,
    publisher: CANONICAL_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.APP_GOOGLE_SITE_VERIFICATION,
      other: {
        'msvalidate.01': process.env.APP_BING_SITE_VERIFICATION as string,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getLocale()) as AppLocale
  const messages = await getMessages()

  return (
    <html lang={htmlLang(locale)}>
      <body className={`${inter.className} bg-custom-one text-slate-400`}>
        <GoogleTagManager gtmId='GTM-5W62N986' />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
