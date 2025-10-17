import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { GlobeIcon } from '@radix-ui/react-icons'
import { LanguagesIcon } from 'lucide-react'
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
        <a href='/en'>
          <DropdownMenuItem>English</DropdownMenuItem>
        </a>

        <a href='/pt'>
          <DropdownMenuItem>Português</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
