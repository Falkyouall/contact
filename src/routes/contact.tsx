import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import { pageMeta, canonicalLink } from "~/lib/seo";

const fetchLocale = createServerFn().handler(() => getLocale());

export const Route = createFileRoute("/contact")({
  loader: () => fetchLocale(),
  head: ({ loaderData: locale }) => ({
    meta: pageMeta({
      title: "Contact",
      description:
        "Get in touch with Falk Michel for web development, AI integration, or freelance projects.",
      path: "/contact",
      locale,
    }),
    links: [canonicalLink("/contact")],
  }),
});
