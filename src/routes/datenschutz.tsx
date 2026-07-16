import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import { getLegalPage } from "~/lib/legal";
import { pageMeta, canonicalLink, alternateLinks } from "~/lib/seo";

const fetchDatenschutz = createServerFn().handler(async () => {
  const locale = getLocale();
  const page = await getLegalPage("datenschutz", locale);
  return { ...page, locale };
});

export const Route = createFileRoute("/datenschutz")({
  loader: () => fetchDatenschutz(),
  head: ({ loaderData }) => ({
    meta: pageMeta({
      title: loaderData!.title,
      description: loaderData!.description,
      path: "/datenschutz",
      locale: loaderData!.locale,
    }),
    links: [
      canonicalLink("/datenschutz", loaderData!.locale),
      ...alternateLinks("/datenschutz"),
    ],
  }),
});
