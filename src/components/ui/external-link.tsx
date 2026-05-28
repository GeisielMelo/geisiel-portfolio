import { AnchorHTMLAttributes, FC } from 'react'
import { UtmOptions, withUtm } from '@/lib/utm'

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  campaign?: string
  content?: string
  term?: string
  source?: string
  medium?: string
  skipUtm?: boolean
}

export const ExternalLink: FC<ExternalLinkProps> = ({
  href,
  campaign,
  content,
  term,
  source,
  medium,
  skipUtm,
  target = '_blank',
  rel = 'noopener external',
  children,
  ...rest
}) => {
  const utm: UtmOptions = { campaign, content, term, source, medium }
  const finalHref = skipUtm ? href : withUtm(href, utm)

  return (
    <a href={finalHref} target={target} rel={rel} {...rest}>
      {children}
    </a>
  )
}
