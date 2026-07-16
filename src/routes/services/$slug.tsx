import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getLocale } from '~/paraglide/runtime'
import { getServiceBySlug } from '~/lib/services'
import * as m from '~/paraglide/messages'
import {
  siteConfig,
  pageMeta,
  canonicalLink,
  alternateLinks,
  localizedUrl,
  breadcrumbSchema,
  personId,
} from '~/lib/seo'

const fetchService = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const locale = getLocale()
    return getServiceBySlug(slug, locale).then((service) => ({
      ...service,
      locale,
    }))
  })

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => fetchService({ data: params.slug }),
  head: ({ loaderData }) => {
    const path = `/services/${loaderData!.slug}`
    return {
      meta: [
        ...pageMeta({
          title: loaderData!.title,
          description: loaderData!.description,
          path,
          locale: loaderData?.locale,
        }),
        {
          'script:ld+json': {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: loaderData!.title,
            description: loaderData!.description,
            url: localizedUrl(path, loaderData!.locale),
            inLanguage: loaderData!.locale,
            provider: {
              '@type': 'Person',
              '@id': personId,
              name: siteConfig.author,
              url: siteConfig.domain,
            },
          },
        },
        {
          'script:ld+json': breadcrumbSchema(
            [
              { name: m.nav_home(), path: '/' },
              { name: m.nav_services(), path: '/services' },
              { name: loaderData!.title, path },
            ],
            loaderData!.locale,
          ),
        },
      ],
      links: [
        canonicalLink(path, loaderData?.locale ?? 'en'),
        ...alternateLinks(path),
      ],
    }
  },
})
