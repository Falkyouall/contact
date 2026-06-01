// Open HTTP contact endpoint for AI agents (and anyone else): a single JSON POST,
// no protocol handshake, no install. CORS is open so cross-origin agents can call
// it directly. Reuses the same validation, rate limiting, and email delivery as
// the website's contact form.
import { contactSchema } from "./contact-schema";
import { handleContactSubmission } from "./contact";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function handleContactApiRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json(
      {
        ok: false,
        error: "method_not_allowed",
        message: "POST a JSON body { name, email, message }.",
      },
      405,
    );
  }

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // email is required (so Falk has a reply address) and validated, same as the form.
  const parsed = contactSchema.safeParse({
    name: body?.name,
    email: body?.email,
    message: body?.message,
  });
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fields[issue.path.join(".") || "_"] = issue.message;
    }
    return json(
      {
        ok: false,
        error: "validation_error",
        message:
          "Provide name, a valid reply email, and a message (min 10 chars).",
        fields,
      },
      400,
    );
  }

  const result = await handleContactSubmission(parsed.data, clientIp(req));
  if (result.success) {
    return json({
      ok: true,
      message: "Message sent. Falk will reply to the email you provided.",
    });
  }
  const status = result.error === "rate_limit" ? 429 : 502;
  return json({ ok: false, error: result.error }, status);
}
