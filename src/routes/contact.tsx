import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import * as m from "~/paraglide/messages";
import { getLocale } from "~/paraglide/runtime";
import { ContactForm } from "~/components/ContactForm";
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
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-4xl min-w-3xl px-4 pb-16">
      <Link
        to="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        &larr; {m.nav_home()}
      </Link>
      <ContactForm standalone />
    </div>
  );
}
