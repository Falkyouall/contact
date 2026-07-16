import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import * as m from "~/paraglide/messages";
import { getLocale } from "~/paraglide/runtime";
import { getAboutPage } from "~/lib/about";
import {
  siteConfig,
  pageMeta,
  canonicalLink,
  alternateLinks,
  localizedUrl,
  breadcrumbSchema,
  personId,
} from "~/lib/seo";

const fetchAbout = createServerFn().handler(async () => {
  const locale = getLocale();
  const about = await getAboutPage(locale);
  return { ...about, locale };
});

export const Route = createFileRoute("/about")({
  loader: () => fetchAbout(),
  head: ({ loaderData }) => {
    const locale = loaderData!.locale;
    return {
      meta: [
        ...pageMeta({
          title: loaderData!.title,
          description: m.seo_about_description(),
          path: "/about",
          locale,
        }),
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: localizedUrl("/about", locale),
            inLanguage: locale,
            name: loaderData!.title,
            mainEntity: {
              "@type": "Person",
              "@id": personId,
              name: siteConfig.author,
              url: siteConfig.domain,
              jobTitle: m.job_title(),
              description: m.seo_about_description(),
              homeLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "München",
                  addressCountry: "DE",
                },
              },
              sameAs: [
                "https://x.com/falk_approves",
                siteConfig.linkedin,
                siteConfig.github,
              ],
            },
          },
        },
        {
          "script:ld+json": breadcrumbSchema(
            [
              { name: m.nav_home(), path: "/" },
              { name: loaderData!.title, path: "/about" },
            ],
            locale,
          ),
        },
      ],
      links: [canonicalLink("/about", locale), ...alternateLinks("/about")],
    };
  },
});
