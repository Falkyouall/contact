import { localizeHref, locales, baseLocale } from '~/paraglide/runtime'

export const siteConfig = {
  domain: 'https://falkmichel.com',
  siteName: 'Falk Michel',
  author: 'Falk Michel',
  defaultDescription:
    'Falk Michel, frontend developer and tech lead based in Munich. Building modern web applications with TypeScript, React, and AI integration.',
  twitter: '@falk_approves',
  linkedin: 'https://www.linkedin.com/in/falk-mich%C3%A9l-b48ba753/',
  github: 'https://github.com/Falkyouall',
  // Default social-share image. Square brand mark; replace with a dedicated
  // 1200×630 image for richer large-card previews.
  defaultImage: '/favicon-192.png',
}

const localeMap: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
}

export function buildUrl(path: string): string {
  return `${siteConfig.domain}${path}`
}

// Absolute, locale-prefixed URL for a canonical (de-localized) path.
// e.g. localizedUrl('/about', 'de') -> 'https://falkmichel.com/de/about'
export function localizedUrl(path: string, locale: string): string {
  return buildUrl(localizeHref(path, { locale }))
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
  const loc = locale || baseLocale
  const url = localizedUrl(path, loc)
  const ogLocale = localeMap[loc] ?? 'en_US'
  const allLocales = locales
  const fullTitle = `${title} | ${siteConfig.siteName}`
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : buildUrl(image)
    : buildUrl(siteConfig.defaultImage)

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
  for (const altLoc of allLocales) {
    if (altLoc !== loc) {
      meta.push({ property: 'og:locale:alternate', content: localeMap[altLoc] })
    }
  }

  // OG image (always present so shares never render blank)
  meta.push({ property: 'og:image', content: ogImage })
  meta.push({ name: 'twitter:image', content: ogImage })

  // Article published time
  if (type === 'article' && publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime })
    meta.push({ property: 'article:author', content: siteConfig.author })
  }

  return meta
}

// Stable node id for Falk's Person entity, shared across all JSON-LD blocks so
// crawlers consolidate author/publisher/provider references into one graph node.
export const personId = `${siteConfig.domain}/#person`

export function personSchema(jobTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.author,
    url: siteConfig.domain,
    jobTitle,
    sameAs: ['https://x.com/falk_approves', siteConfig.linkedin, siteConfig.github],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: `${siteConfig.domain}/`,
    name: siteConfig.siteName,
    description: siteConfig.defaultDescription,
    inLanguage: [...locales],
    publisher: { '@id': personId },
  }
}

// items are (label, de-localized path) pairs from the root down to the current page.
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localizedUrl(item.path, locale || baseLocale),
    })),
  }
}

// Self-referencing canonical for the current locale's URL.
export function canonicalLink(path: string, locale: string) {
  return { rel: 'canonical', href: localizedUrl(path, locale || baseLocale) }
}

// Reciprocal hreflang alternates for every locale, plus x-default (base locale).
// `path` is the de-localized path (e.g. '/about'); BCP 47 tags match our locales.
export function alternateLinks(path: string) {
  // React's canonical camelCase prop. React DOM renders the real attribute as
  // lowercase `hreflang`; HTML attribute names are case-insensitive, so the SSR
  // string (`hrefLang`) is parsed identically by crawlers. Using lowercase here
  // instead triggers React's "Invalid DOM property" warning on the client.
  const links = locales.map((loc) => ({
    rel: 'alternate',
    hrefLang: loc,
    href: localizedUrl(path, loc),
  }))
  links.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: localizedUrl(path, baseLocale),
  })
  return links
}
