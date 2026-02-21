import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import parse from 'html-react-parser'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getServiceBySlug } from '~/lib/services'
import { ContactForm } from '~/components/ContactForm'
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
    const path = `/services/${loaderData.slug}`
    return {
      meta: [
        ...pageMeta({
          title: loaderData.title,
          description: loaderData.description,
          path,
          locale: loaderData.locale,
        }),
        {
          'script:ld+json': {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: loaderData.title,
            description: loaderData.description,
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
  component: ServicePage,
})

function ServicePage() {
  const service = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to="/services" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; {m.nav_services()}</Link>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{service.subtitle}</p>
        </header>
        <div className="prose prose-gray max-w-none dark:prose-invert">{parse(service.html)}</div>
      </article>
      <ContactForm heading={service.contactHeading} />
    </div>
  )
}
