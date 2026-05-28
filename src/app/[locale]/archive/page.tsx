import { CustomLink } from '@/components/ui/custom-link'
import archive from '@/assets/json/archive.json'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { AppLocale, SITE_URL, buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, graph, personSchema, websiteSchema } from '@/lib/schema'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale
  return buildMetadata({ locale, path: '/archive' })
}

export default async function Page() {
  const locale = (await getLocale()) as AppLocale
  const data: Repository[] = archive.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const homeUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`
  const archiveUrl = locale === 'en' ? `${SITE_URL}/archive` : `${SITE_URL}/${locale}/archive`

  return (
    <>
      <JsonLd
        id='ld-archive'
        data={graph(
          personSchema(),
          websiteSchema(locale),
          breadcrumbSchema([
            { name: 'Geisiel Melo', url: homeUrl },
            { name: 'All Projects', url: archiveUrl },
          ]),
        )}
      />
      <section className='mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0'>
        <div className='lg:py-24'>
          <nav aria-label='Breadcrumb' className='mb-2'>
            <Link href='/' className='group inline-flex items-center text-sm font-semibold leading-tight hover:text-slate-200 transition-colors'>
              ← Geisiel Melo
            </Link>
          </nav>
          <h1 className='text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl'>All Projects</h1>

          <table className='mt-12 w-full border-collapse text-left'>
            <thead className='sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur'>
              <tr>
                <th className='py-4 pr-8 text-sm font-semibold text-slate-200'>Year</th>
                <th className='py-4 pr-8 text-sm font-semibold text-slate-200'>Project</th>
                <th className='hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell'>Made at</th>
                <th className='hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell'>Built with</th>
                <th className='hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell'>Link</th>
              </tr>
            </thead>

            <tbody>
              {data.map((repository, index) => (
                <tr className='border-b border-slate-300/10 last:border-none' key={index}>
                  <td className='py-4 pr-4 align-top text-sm'>{repository.date.substring(0, 4)}</td>
                  <td className='py-4 pr-4 align-top font-semibold leading-snug text-slate-200'>{repository.name}</td>
                  <td className='hidden py-4 pr-4 align-top text-sm lg:table-cell'>{repository.made_at}</td>
                  <td className='hidden py-4 pr-4 align-top lg:table-cell'>
                    <ul>
                      {repository.tags.map((topic, index) => (
                        <li className='mb-3 mr-1 inline-block' key={index} title={topic}>
                          <div className='flex items-center rounded-full bg-slate-900/95 px-3 py-1 text-xs font-medium leading-5 text-white/75'>{topic}</div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className='hidden py-4 align-top sm:table-cell'>
                    <CustomLink repository={repository} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
