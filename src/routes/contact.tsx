import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import * as m from "~/paraglide/messages";
import { pageMeta, canonicalLink, alternateLinks } from "~/lib/seo";

const fetchLocale = createServerFn().handler(() => getLocale());

export const Route = createFileRoute("/contact")({
  loader: () => fetchLocale(),
  head: ({ loaderData: locale }) => ({
    meta: pageMeta({
      title: m.nav_contact(),
      description: m.seo_contact_description(),
      path: "/contact",
      locale,
    }),
    links: [canonicalLink("/contact", locale), ...alternateLinks("/contact")],
  }),
});
