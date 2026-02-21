import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import parse from 'html-react-parser'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getPostBySlug } from '~/lib/blog'
import { ContactForm } from '~/components/ContactForm'
import { siteConfig, pageMeta, canonicalLink } from '~/lib/seo'

const fetchPost = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const locale = getLocale()
    return getPostBySlug(slug, locale).then((post) => ({ ...post, locale }))
  })

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => fetchPost({ data: params.slug }),
  head: ({ loaderData }) => {
    const path = `/blog/${loaderData.slug}`
    return {
      meta: [
        ...pageMeta({
          title: loaderData.title,
          description: loaderData.description,
          path,
          locale: loaderData.locale,
          type: 'article',
          publishedTime: loaderData.date,
        }),
        {
          'script:ld+json': {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: loaderData.title,
            description: loaderData.description,
            datePublished: loaderData.date,
            author: {
              '@type': 'Person',
              name: siteConfig.author,
              url: siteConfig.domain,
            },
            inLanguage: loaderData.locale,
          },
        },
      ],
      links: [
        canonicalLink(path),
      ],
    }
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to="/blog" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; {m.nav_blog()}</Link>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          {post.description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{post.description}</p>
          )}
          <time className="mt-2 block text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
        </header>
        <div className="prose prose-gray max-w-none dark:prose-invert">{parse(post.html)}</div>
      </article>
      <ContactForm heading={post.contactHeading} />
    </div>
  )
}
