import { ChangeEvent, useState, type FormEvent } from "react";
import { createServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import * as m from "~/paraglide/messages";
import { contactSchema, type ContactResult } from "~/lib/contact-schema";
import { handleContactSubmission } from "~/lib/contact";

const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }): Promise<ContactResult> => {
    return handleContactSubmission(data);
  });

export function ContactForm({ standalone }: { standalone?: boolean } = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const result = contactSchema.safeParse({ name, email, message, website });
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);
      if (fieldErrors[field]) continue;

      if (field === "name") {
        if (issue.code === "too_small")
          fieldErrors.name = m.contact_name_required();
        else if (issue.code === "too_big")
          fieldErrors.name = m.contact_name_max();
      } else if (field === "email") {
        if (issue.code === "too_small")
          fieldErrors.email = m.contact_email_required();
        else fieldErrors.email = m.contact_email_invalid();
      } else if (field === "message") {
        if (issue.code === "too_small") {
          const min = (issue as { minimum?: number }).minimum;
          fieldErrors.message =
            min === 1 ? m.contact_message_required() : m.contact_message_min();
        } else if (issue.code === "too_big") {
          fieldErrors.message = m.contact_message_max();
        }
      }
    }
    setErrors(fieldErrors);
    return false;
  }

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await submitContactForm({
        data: { name, email, message, website },
      });

      if (result.success) {
        toast.success(m.contact_success());
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else if (result.error === "rate_limit") {
        toast.error(m.contact_rate_limit());
      } else {
        toast.error(m.contact_error());
      }
    } catch {
      toast.error(m.contact_error());
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-white";
  const errorInputClasses =
    "w-full rounded-md border border-red-500 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800";

  return (
    <section className={standalone ? "" : "mt-16 border-t border-gray-200 pt-12 dark:border-gray-700"}>
      {standalone ? (
        <h1 className="mb-8 text-4xl font-bold">{m.heading_contact()}</h1>
      ) : (
        <h2 className="mb-8 text-2xl font-bold">{m.heading_contact()}</h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
            {m.contact_name_label()}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={m.contact_name_placeholder()}
            className={errors.name ? errorInputClasses : inputClasses}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
            {m.contact_email_label()}
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={m.contact_email_placeholder()}
            className={errors.email ? errorInputClasses : inputClasses}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
            {m.contact_message_label()}
          </label>
          <textarea
            id="contact-message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={m.contact_message_placeholder()}
            className={errors.message ? errorInputClasses : inputClasses}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {submitting ? m.contact_submitting() : m.contact_submit()}
        </button>
      </form>
    </section>
  );
}
