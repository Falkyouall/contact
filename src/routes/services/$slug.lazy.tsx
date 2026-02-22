import { createLazyFileRoute, Link } from '@tanstack/react-router'
import parse from 'html-react-parser'
import * as m from '~/paraglide/messages'
import { ContactForm } from '~/components/ContactForm'

export const Route = createLazyFileRoute('/services/$slug')({
  component: ServicePage,
})

function ServicePage() {
  const service = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16">
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
