import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as m from '~/paraglide/messages'
import { getLocale } from '~/paraglide/runtime'
import { getAllPosts } from '~/lib/blog'

const fetchPosts = createServerFn().handler(() => {
  const locale = getLocale()
  return getAllPosts(locale)
})

export const Route = createFileRoute('/blog/')({
  loader: () => fetchPosts(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
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
