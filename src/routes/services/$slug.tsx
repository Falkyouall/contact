import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getLocale } from '~/paraglide/runtime'
import { getServiceBySlug } from '~/lib/services'
import { siteConfig, pageMeta, canonicalLink } from '~/lib/seo'

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
            provider: {
              '@type': 'Person',
              name: siteConfig.author,
              url: siteConfig.domain,
            },
          },
        },
      ],
      links: [
        canonicalLink(path),
      ],
    }
  },
})
