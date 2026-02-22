import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "~/paraglide/runtime";
import { getPostBySlug } from "~/lib/blog";
import { siteConfig, pageMeta, canonicalLink } from "~/lib/seo";

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
            author: {
              "@type": "Person",
              name: siteConfig.author,
              url: siteConfig.domain,
            },
            inLanguage: loaderData!.locale,
          },
        },
      ],
      links: [canonicalLink(path)],
    };
  },
});
