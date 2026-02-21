import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import parse from 'html-react-parser'
import { getLocale } from '~/paraglide/runtime'
import { getPostBySlug } from '~/lib/blog'
import { ContactForm } from '~/components/ContactForm'

const fetchPost = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const locale = getLocale()
    return getPostBySlug(slug, locale)
  })

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => fetchPost({ data: params.slug }),
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
        </header>
        <div className="prose prose-gray max-w-none dark:prose-invert">{parse(post.html)}</div>
      </article>
      <ContactForm />
    </div>
  )
}
