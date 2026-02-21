import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getAllServices } from '~/lib/services'

const fetchServices = createServerFn().handler(() => {
  const locale = getLocale()
  return getAllServices(locale)
})

export const Route = createFileRoute('/services/')({
  loader: () => fetchServices(),
  component: ServicesIndex,
})

function ServicesIndex() {
  const services = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
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
