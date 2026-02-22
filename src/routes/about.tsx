import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
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
      title: loaderData!.title,
      description:
        "Frontend developer and tech lead based in Munich with 11+ years of experience building modern web applications.",
      path: "/about",
      locale: loaderData!.locale,
    }),
    links: [
      canonicalLink("/about"),
    ],
  }),
});
