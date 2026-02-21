import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getAllServices } from '~/lib/services'
import { pageMeta, canonicalLink } from '~/lib/seo'

const fetchServices = createServerFn().handler(() => {
  const locale = getLocale()
  return { services: getAllServices(locale), locale }
})

export const Route = createFileRoute('/services/')({
  loader: () => fetchServices(),
  head: ({ loaderData }) => ({
    meta: pageMeta({
      title: 'Services',
      description:
        'Web development, AI integration, rapid prototyping, Figma plugin development, and fullstack TypeScript services.',
      path: '/services',
      locale: loaderData.locale,
    }),
    links: [
      canonicalLink('/services'),
    ],
  }),
  component: ServicesIndex,
})

function ServicesIndex() {
  const { services } = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to="/" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; {m.nav_home()}</Link>
      <h1 className="mb-8 text-4xl font-bold">{m.heading_services()}</h1>
      <ul className="space-y-6">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
            >
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
