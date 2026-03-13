import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { getLocale } from 'next-intl/server'
import { Header } from '@/components/header'
import { About } from '@/components/about'

export default async function Page() {
  const locale = await getLocale()

  return (
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
  )
}
