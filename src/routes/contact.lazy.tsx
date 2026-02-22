import { createLazyFileRoute, Link } from "@tanstack/react-router";
import * as m from "~/paraglide/messages";
import { ContactForm } from "~/components/ContactForm";

export const Route = createLazyFileRoute("/contact")({
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
