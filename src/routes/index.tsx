import { createFileRoute, Link } from '@tanstack/react-router'
import * as m from '~/paraglide/messages'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-0">
      <h1 className="text-4xl font-bold">{m.heading_falk()}</h1>
      <Link to="/blog" className="text-blue-600 hover:underline dark:text-blue-400">
        {m.nav_blog()}
      </Link>
      <Link to="/services" className="text-blue-600 hover:underline dark:text-blue-400">
        {m.nav_services()}
      </Link>
      <Link to="/about" className="text-blue-600 hover:underline dark:text-blue-400">
        {m.nav_about()}
      </Link>
      <Link to="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
        {m.nav_contact()}
      </Link>
    </div>
  )
}
