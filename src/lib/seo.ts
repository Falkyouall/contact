export const siteConfig = {
  domain: 'https://falkmichel.com',
  siteName: 'Falk Michel',
  author: 'Falk Michel',
  defaultDescription:
    'Falk Michel — Frontend developer and tech lead based in Munich. Building modern web applications with TypeScript, React, and AI integration.',
  twitter: '@falk_approves',
  linkedin: 'https://www.linkedin.com/in/falk-mich%C3%A9l-b48ba753/',
  github: 'https://github.com/Falkyouall',
}

const localeMap: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
}

const localePrefixes: Record<string, string> = {
  en: '',
  de: '/de',
  es: '/es',
}

export function buildUrl(path: string, locale: string = 'en'): string {
  const prefix = localePrefixes[locale] ?? ''
  return `${siteConfig.domain}${prefix}${path}`
}

export function pageMeta({
  title,
  description,
  path,
  locale,
  type = 'website',
  publishedTime,
  image,
}: {
  title: string
  description: string
  path: string
  locale: string
  type?: 'website' | 'article'
  publishedTime?: string
  image?: string
}) {
  const url = buildUrl(path, locale)
  const ogLocale = localeMap[locale] ?? 'en_US'
  const allLocales = ['en', 'de', 'es']
  const fullTitle = `${title} | ${siteConfig.siteName}`

  const meta: Array<Record<string, unknown>> = [
    { title: fullTitle },
    { name: 'description', content: description },
    { name: 'author', content: siteConfig.author },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: ogLocale },
    // Twitter
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:site', content: siteConfig.twitter },
    { name: 'twitter:creator', content: siteConfig.twitter },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  // OG locale alternates
  for (const loc of allLocales) {
    if (loc !== locale) {
      meta.push({ property: 'og:locale:alternate', content: localeMap[loc] })
    }
  }

  // OG image
  if (image) {
    meta.push({ property: 'og:image', content: image })
    meta.push({ name: 'twitter:image', content: image })
  }

  // Article published time
  if (type === 'article' && publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime })
    meta.push({ property: 'article:author', content: siteConfig.author })
  }

  return meta
}

export function canonicalLink(path: string, locale: string) {
  return { rel: 'canonical', href: buildUrl(path, locale) }
}

export function hreflangLinks(path: string) {
  const locales = ['en', 'de', 'es'] as const
  const links = locales.map((loc) => ({
    rel: 'alternate',
    hreflang: loc,
    href: buildUrl(path, loc),
  }))
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: buildUrl(path, 'en'),
  })
  return links
}
