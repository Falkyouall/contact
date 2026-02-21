import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import parse from "html-react-parser";
import { getLocale } from "~/paraglide/runtime";
import { getAboutPage } from "~/lib/about";

const fetchAbout = createServerFn().handler(() => {
  const locale = getLocale();
  return getAboutPage(locale);
});

export const Route = createFileRoute("/about")({
  loader: () => fetchAbout(),
  component: About,
});

function About() {
  const about = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="prose prose-gray max-w-none dark:prose-invert">
        {parse(about.html)}
      </div>
    </div>
  );
}
