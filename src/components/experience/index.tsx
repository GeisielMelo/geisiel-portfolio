import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { ExperienceCard } from './experience-card'

export const Experience: FC = () => {
  const t = useTranslations('Experience')
  const keys = ['c1', 'c2', 'c3']

  return (
    <section id='experience' className='section'>
      <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only my-6'>{t('title')}</h2>
      {keys.map((key, index) => (
        <ExperienceCard key={index} start={t(`cards.${key}.start`)} end={t(`cards.${key}.end`)} description={t(`cards.${key}.description`)} tags={t(`cards.${key}.tags`)} title={t(`cards.${key}.title`)} href={t(`cards.${key}.href`)} />
      ))}
    </section>
  )
}
