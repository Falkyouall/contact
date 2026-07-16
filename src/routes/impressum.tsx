import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import { getLegalPage } from "~/lib/legal";
import { pageMeta, canonicalLink, alternateLinks } from "~/lib/seo";

const fetchImpressum = createServerFn().handler(async () => {
  const locale = getLocale();
  const page = await getLegalPage("impressum", locale);
  return { ...page, locale };
});

export const Route = createFileRoute("/impressum")({
  loader: () => fetchImpressum(),
  head: ({ loaderData }) => ({
    meta: pageMeta({
      title: loaderData!.title,
      description: loaderData!.description,
      path: "/impressum",
      locale: loaderData!.locale,
    }),
    links: [
      canonicalLink("/impressum", loaderData!.locale),
      ...alternateLinks("/impressum"),
    ],
  }),
});
