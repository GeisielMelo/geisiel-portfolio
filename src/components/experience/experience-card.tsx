import { FC } from 'react'

interface Card {
  start: string
  end: string
  title: string
  description: string
  tags: string
  href?: string
}

export const ExperienceCard: FC<Card> = ({ start, end, title, description, tags, href }) => {
  const tagsArray = tags.split(', ')
  const descriptionArray = description.split('|')

  return (
    <div className='group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 mb-12'>
      <div className='absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg' />

      <header className='z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2'>
        {start} — {end}
      </header>

      <div className='z-10 sm:col-span-6'>
        <h3 className='font-medium leading-snug text-slate-200'>{title}</h3>

        <ul className='flex flex-col'>
          {descriptionArray.map((desc, key) => (
            <li key={key} className='mt-2 text-sm leading-normal list-disc'>
              {desc}
            </li>
          ))}
        </ul>

        <ul className='mt-2 flex flex-wrap'>
          {tagsArray.map((tag, key) => (
            <li key={key} className='mr-1.5 mt-2'>
              <div className='flex items-center rounded-full bg-slate-900/95 px-3 py-1 text-xs font-medium leading-5 text-white/95'>{tag}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
