import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import parse from 'html-react-parser'
import { getLocale } from '~/paraglide/runtime'
import { getServiceBySlug } from '~/lib/services'
import { ContactForm } from '~/components/ContactForm'

const fetchService = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const locale = getLocale()
    return getServiceBySlug(slug, locale)
  })

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => fetchService({ data: params.slug }),
  component: ServicePage,
})

function ServicePage() {
  const service = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{service.subtitle}</p>
        </header>
        <div className="prose prose-gray max-w-none dark:prose-invert">{parse(service.html)}</div>
      </article>
      <ContactForm />
    </div>
  )
}
