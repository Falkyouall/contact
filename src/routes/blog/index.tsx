import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getAllPosts } from '~/lib/blog'
import { pageMeta, canonicalLink, hreflangLinks } from '~/lib/seo'

const fetchPosts = createServerFn().handler(() => {
  const locale = getLocale()
  return { posts: getAllPosts(locale), locale }
})

export const Route = createFileRoute('/blog/')({
  loader: () => fetchPosts(),
  head: ({ loaderData }) => ({
    meta: pageMeta({
      title: 'Blog',
      description:
        'Thoughts on software development, AI agents, developer tools, and building for the web.',
      path: '/blog',
      locale: loaderData.locale,
    }),
    links: [
      canonicalLink('/blog', loaderData.locale),
      ...hreflangLinks('/blog'),
    ],
  }),
  component: BlogIndex,
})

function BlogIndex() {
  const { posts } = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to="/" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; {m.nav_home()}</Link>
      <h1 className="mb-8 text-4xl font-bold">{m.heading_blog()}</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
