import { createLazyFileRoute, Link } from "@tanstack/react-router";
import parse from "html-react-parser";
import * as m from "~/paraglide/messages";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  const about = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to="/" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; {m.nav_home()}</Link>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        {parse(about.html)}
      </div>
    </div>
  );
}
