import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import { getPostBySlug } from "~/lib/blog";
import * as m from "~/paraglide/messages";
import {
  siteConfig,
  pageMeta,
  canonicalLink,
  alternateLinks,
  localizedUrl,
  breadcrumbSchema,
  personId,
} from "~/lib/seo";

const fetchPost = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const locale = getLocale();
    return getPostBySlug(slug, locale).then((post) => ({ ...post, locale }));
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => fetchPost({ data: params.slug }),
  head: ({ loaderData }) => {
    const path = `/blog/${loaderData?.slug}`;
    return {
      meta: [
        ...pageMeta({
          title: loaderData!.title,
          description: loaderData!.description,
          path,
          locale: loaderData?.locale,
          type: "article",
          publishedTime: loaderData?.date,
        }),
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: loaderData!.title,
            description: loaderData!.description,
            datePublished: loaderData?.date,
            dateModified: loaderData?.date,
            url: localizedUrl(path, loaderData!.locale),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": localizedUrl(path, loaderData!.locale),
            },
            author: {
              "@type": "Person",
              "@id": personId,
              name: siteConfig.author,
              url: siteConfig.domain,
            },
            publisher: { "@id": personId },
            inLanguage: loaderData!.locale,
          },
        },
        {
          "script:ld+json": breadcrumbSchema(
            [
              { name: m.nav_home(), path: "/" },
              { name: m.nav_blog(), path: "/blog" },
              { name: loaderData!.title, path },
            ],
            loaderData!.locale,
          ),
        },
      ],
      links: [
        canonicalLink(path, loaderData?.locale ?? "en"),
        ...alternateLinks(path),
      ],
    };
  },
});
