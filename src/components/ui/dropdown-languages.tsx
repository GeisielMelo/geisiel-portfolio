import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from '@/i18n/routing'
import { GlobeIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

export const DropdownLanguage: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className='shrink-0 text-xs bg-slate-800/50 hover:text-white transition-all p-1.5 rounded-sm' title='Languages'>
          <GlobeIcon height={16} width={16} />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-36' aria-label='languages'>
        <Link href='/' locale='en'>
          <DropdownMenuItem>English</DropdownMenuItem>
        </Link>

        <Link href='/' locale='pt'>
          <DropdownMenuItem>Português</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
