import { FC } from 'react'

interface Card {
  start: string
  end: string
  title: string
  description: string
  tags: string
  href?: string
}

interface TagGroup {
  label: string
  tags: string[]
}

function parseTagGroups(tags: string): TagGroup[] | null {
  if (!tags.includes(';')) return null
  return tags.split(';').map((group) => {
    const colonIndex = group.indexOf(':')
    if (colonIndex === -1) {
      return { label: '', tags: group.split(',').map((t) => t.trim()).filter(Boolean) }
    }
    return {
      label: group.slice(0, colonIndex).trim(),
      tags: group
        .slice(colonIndex + 1)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
  })
}

export const ExperienceCard: FC<Card> = ({ start, end, title, description, tags, href }) => {
  const tagsArray = tags.split(', ')
  const descriptionArray = description.split('|')
  const tagGroups = parseTagGroups(tags)

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

        {tagGroups ? (
          <div className='mt-4 flex flex-col gap-y-2'>
            {tagGroups.map((group, i) => (
              <div key={i} className='grid grid-cols-[6rem_1fr] items-start gap-x-3'>
                {group.label && (
                  <span className='pt-0.5 text-[10px] font-semibold uppercase leading-5 tracking-widest text-slate-500'>{group.label}</span>
                )}
                <div className={`flex flex-wrap gap-1.5${!group.label ? ' col-span-2' : ''}`}>
                  {group.tags.map((tag, j) => (
                    <span key={j} className='rounded-full bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium leading-5 text-teal-300'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className='mt-2 flex flex-wrap gap-1.5'>
            {tagsArray.map((tag, key) => (
              <li key={key}>
                <span className='rounded-full bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium leading-5 text-teal-300'>{tag}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
