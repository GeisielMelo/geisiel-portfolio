import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { getLocale } from 'next-intl/server'
import { Header } from '@/components/header'
import { About } from '@/components/about'
import { AppLocale, buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { graph, organizationUniFTC, personSchema, websiteSchema } from '@/lib/schema'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale
  return buildMetadata({ locale, path: '/' })
}

export default async function Page() {
  const locale = (await getLocale()) as AppLocale

  return (
    <>
      <JsonLd
        id='ld-home'
        data={graph(personSchema(), websiteSchema(locale), organizationUniFTC())}
      />
      <div className='mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0'>
        <div className='lg:flex lg:justify-between lg:gap-4'>
          <Header locale={locale} />
          <main className='pt-24 lg:w-[52%] lg:py-24'>
            <About />
            <Experience />
            <Projects />
          </main>
        </div>
      </div>
    </>
  )
}
