import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import parse from "html-react-parser";
import * as m from "~/paraglide/messages";
import { getLocale } from "~/paraglide/runtime";
import { getAboutPage } from "~/lib/about";
import { pageMeta, canonicalLink } from "~/lib/seo";

const fetchAbout = createServerFn().handler(async () => {
  const locale = getLocale();
  const about = await getAboutPage(locale);
  return { ...about, locale };
});

export const Route = createFileRoute("/about")({
  loader: () => fetchAbout(),
  head: ({ loaderData }) => ({
    meta: pageMeta({
      title: loaderData.title,
      description:
        "Frontend developer and tech lead based in Munich with 11+ years of experience building modern web applications.",
      path: "/about",
      locale: loaderData.locale,
    }),
    links: [
      canonicalLink("/about"),
    ],
  }),
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
