'use client'

import { GitHubLogoIcon, LinkedInLogoIcon, ArchiveIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { DropdownLanguage } from '@/components/ui/dropdown-languages'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FC } from 'react'

export const Header: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('Header')
  const keys = ['about', 'experience', 'projects'] as const

  return (
    <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24'>
      <div>
        <span className='text-4xl font-bold tracking-tight text-[#ededed] sm:text-5xl'>{t('name')}</span>
        <h1 className='mt-3 text-lg font-medium tracking-tight text-[#ededed] sm:text-xl'>{t('dev')}</h1>
        <p className='mt-4 max-w-xs leading-normal'>{t('description')}</p>

        <nav className='nav hidden lg:block'>
          <ul className='flex flex-col gap-1 mt-16 w-max'>
            {keys.map((key, index) => (
              <li key={index} className='flex text-sm font-bold uppercase tracking-widest hover:pl-4 hover:text-white transition-all cursor-pointer'>
                <Link href={locale + '/' + t(`options.${key}.href`)}>{t(`options.${key}.title`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className='mt-8 flex items-center gap-2'>
        <a href='https://github.com/GeisielMelo' className='shrink-0 text-xs bg-slate-800/50 hover:text-white transition-all p-1.5 rounded' target='_blank' title='GitHub'>
          <GitHubLogoIcon height={16} width={16} />
        </a>

        <a href='https://www.linkedin.com/in/geisiel' className='shrink-0 text-xs bg-slate-800/50 hover:text-white transition-all p-1.5 rounded-sm' target='_blank' title='LinkedIn'>
          <LinkedInLogoIcon height={16} width={16} />
        </a>

        <a href='mailto:geisiel.nascimento@gmail.com' className='shrink-0 text-xs bg-slate-800/50 hover:text-white transition-all p-1.5 rounded-sm' target='_blank' title='Email'>
          <EnvelopeClosedIcon height={16} width={16} />
        </a>

        <Link href={locale + '/archive'} className='shrink-0 text-xs bg-slate-800/50 hover:text-white transition-all p-1.5 rounded-sm' title='Archive'>
          <ArchiveIcon height={16} width={16} />
        </Link>

        <DropdownLanguage />
      </div>
    </header>
  )
}
