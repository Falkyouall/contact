import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "~/components/ContactForm";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <ContactForm standalone />
    </div>
  );
}
