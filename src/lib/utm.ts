const DEFAULT_SOURCE = 'geisiel.com'
const DEFAULT_MEDIUM = 'referral'
const DEFAULT_CAMPAIGN = 'portfolio'

const OWN_HOSTS = new Set(['geisiel.com', 'www.geisiel.com'])

export const UTM_CAMPAIGNS = {
  Social: 'social',
  Projects: 'projects',
  Archive: 'archive',
  Resume: 'resume',
  Portfolio: 'portfolio',
} as const

export type UtmCampaignName = (typeof UTM_CAMPAIGNS)[keyof typeof UTM_CAMPAIGNS]

export interface UtmOptions {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

export function withUtm(href: string, options: UtmOptions = {}): string {
  if (!href) return href
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return href

  let url: URL
  try {
    url = new URL(href)
  } catch {
    return href
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return href
  if (OWN_HOSTS.has(url.hostname)) return href

  const params: Array<[string, string]> = [
    ['utm_source', options.source ?? DEFAULT_SOURCE],
    ['utm_medium', options.medium ?? DEFAULT_MEDIUM],
    ['utm_campaign', options.campaign ?? DEFAULT_CAMPAIGN],
  ]
  if (options.content) params.push(['utm_content', options.content])
  if (options.term) params.push(['utm_term', options.term])

  for (const [key, value] of params) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  }

  return url.toString()
}
