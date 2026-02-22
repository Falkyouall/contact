import { createLazyFileRoute, Link } from "@tanstack/react-router";
import parse from "html-react-parser";
import * as m from "~/paraglide/messages";
import { ContactForm } from "~/components/ContactForm";

export const Route = createLazyFileRoute("/blog/$slug")({
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16">
      <Link
        to="/blog"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        &larr; {m.nav_blog()}
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          {post.description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-white">
              {post.description}
            </p>
          )}
          <time className="mt-2 block text-xs font-extralight text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
        </header>
        <div className="prose prose-gray max-w-none dark:prose-invert">
          {parse(post.html)}
        </div>
      </article>
      <ContactForm heading={post.contactHeading} />
    </div>
  );
}
