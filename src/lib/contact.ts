import { Resend } from "resend";
import { getRequestIP } from "@tanstack/react-start/server";
import type { ContactFormData, ContactResult } from "./contact-schema";
import { checkRateLimit } from "./rate-limit";

// Lazily constructed so importing this module never throws when
// RESEND_API_KEY is absent (e.g. during the MCP module's import chain).
let resendClient: Resend | undefined;
function getResend(): Resend {
  return (resendClient ??= new Resend(process.env.RESEND_API_KEY));
}

export async function handleContactSubmission(
  data: ContactFormData,
  ipOverride?: string,
): Promise<ContactResult> {
  // ipOverride lets callers outside the TanStack request context (e.g. the MCP
  // endpoint) supply the IP; the contact route relies on the getRequestIP fallback.
  const ip = ipOverride ?? getRequestIP({ xForwardedFor: true }) ?? "unknown";
  const timestamp = new Date().toISOString();

  // Honeypot check — silent rejection
  if (data.website) {
    console.log(
      `[contact] ${timestamp} | bot detected | ip=${ip} email=${data.email}`,
    );
    return { success: true };
  }

  // Rate limit
  if (!checkRateLimit(ip)) {
    console.log(
      `[contact] ${timestamp} | rate limited | ip=${ip} email=${data.email}`,
    );
    return { success: false, error: "rate_limit" };
  }

  try {
    await getResend().emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `Contact from ${data.name}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        ``,
        `Message:`,
        data.message,
        ``,
        `---`,
        `Sent at: ${timestamp}`,
        `IP: ${ip}`,
      ].join("\n"),
    });

    console.log(
      `[contact] ${timestamp} | success | ip=${ip} email=${data.email}`,
    );
    return { success: true };
  } catch (error) {
    console.error(
      `[contact] ${timestamp} | error | ip=${ip} email=${data.email}`,
      error,
    );
    return { success: false, error: "send_failed" };
  }
}
