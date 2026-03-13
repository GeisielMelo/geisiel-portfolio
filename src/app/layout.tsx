import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    metadataBase: new URL('https://www.geisiel.com/'),
    title: {
      default: 'Geisiel | Web Developer',
      template: '%s | Geisiel',
    },
    authors: {
      name: 'Geisiel',
      url: 'https://www.linkedin.com/in/geisiel',
    },
    description: 'Web developer with years of experience specializing in creating optimized, responsive sites for exceptional user experiences.',
    applicationName: 'GeisielMelo',
    publisher: 'Geisiel',
    archives: '/static/resume.pdf',
    creator: 'Geisiel Nascimento',
    icons: { icon: '/favicon.ico' },
    keywords: ['web developer', 'web developer geisiel', 'web developer geisiel melo', 'web developer geisiel nascimento', 'geisiel open to work, open to work, geisiel melo'],
    classification: 'Portfolio - GeisielMelo',
    alternates: { canonical: `/${locale}` },
    openGraph: {
      images: ['/img/social.png'],
      type: 'website',
      url: '/',
      description: "I'm the right developer to optimize your Google positioning with quality and results.",
    },
    twitter: {
      images: ['/img/social.png'],
      description: "I'm the right developer to optimize your Google positioning with quality and results.",
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
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-custom-one text-slate-400`}>
        <GoogleTagManager gtmId='GTM-5W62N986' />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
