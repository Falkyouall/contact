// Stateless Model Context Protocol (MCP) endpoint exposing Falk Michel's
// services, blog posts, and contact form to external AI agents over JSON-RPC.
//
// Implements the Streamable HTTP transport in its simplest form: each POST is a
// self-contained JSON-RPC request answered with a single application/json
// response. No sessions, no server-initiated streams. See:
// https://modelcontextprotocol.io
import { getAllServices, getServiceBySlug } from "./services";
import { getAllPosts, getPostBySlug } from "./blog";
import { handleContactSubmission } from "./contact";
import { contactSchema } from "./contact-schema";
import { siteConfig, localizedUrl } from "./seo";

const LATEST_PROTOCOL_VERSION = "2025-06-18";
const LOCALES = ["en", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

const SERVER_INFO = {
  name: "falk-michel-portfolio",
  version: "1.0.0",
  title: "Falk Michel — Portfolio",
};

const INSTRUCTIONS =
  "Read-only access to Falk Michel's freelance services and blog posts, plus a " +
  "write tool to send him a message via the contact form. Use `list_services` / " +
  "`list_blog_posts` to discover content, `get_service` / `get_blog_post` to fetch " +
  "full text by slug, and `send_contact_message` to get in touch. Content is " +
  "available in English (en, default), German (de), and Spanish (es).";

const localeProperty = {
  type: "string",
  enum: LOCALES,
  description: "Content language. Defaults to 'en'.",
};

const TOOLS = [
  {
    name: "list_services",
    description:
      "List the freelance services Falk Michel offers (title, slug, summary, URL).",
    inputSchema: {
      type: "object",
      properties: { locale: localeProperty },
    },
  },
  {
    name: "get_service",
    description:
      "Get the full description of a single service by its slug (as returned by list_services).",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Service slug, e.g. 'ai-integration'." },
        locale: localeProperty,
      },
      required: ["slug"],
    },
  },
  {
    name: "list_blog_posts",
    description: "List Falk Michel's blog posts (title, slug, date, summary, URL).",
    inputSchema: {
      type: "object",
      properties: { locale: localeProperty },
    },
  },
  {
    name: "get_blog_post",
    description:
      "Get the full text of a single blog post by its slug (as returned by list_blog_posts).",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Post slug, e.g. 'agents-are-the-next-browser'." },
        locale: localeProperty,
      },
      required: ["slug"],
    },
  },
  {
    name: "send_contact_message",
    description:
      "Send a message to Falk Michel through his contact form. Delivers an email he can reply to.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Sender's name." },
        email: { type: "string", description: "Sender's email address (used for the reply)." },
        message: { type: "string", description: "The message (at least 10 characters)." },
      },
      required: ["name", "email", "message"],
    },
  },
];

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function rpcResult(id: unknown, result: unknown): Response {
  return jsonResponse({ jsonrpc: "2.0", id, result });
}

function rpcError(
  id: unknown,
  code: number,
  message: string,
  status = 200,
): Response {
  return jsonResponse({ jsonrpc: "2.0", id, error: { code, message } }, status);
}

function textContent(value: unknown, isError = false) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: "text", text }], isError };
}

function normalizeLocale(input: unknown): Locale {
  return LOCALES.includes(input as Locale) ? (input as Locale) : "en";
}

// Minimal HTML → readable plain text for content delivered to agents.
function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|h[1-6]|li|ul|ol|blockquote|pre|div)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<br\s*\/?>(?=)/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

async function callTool(name: string, args: Record<string, unknown>, ip: string) {
  switch (name) {
    case "list_services": {
      const locale = normalizeLocale(args.locale);
      const services = getAllServices(locale).map((s) => ({
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        url: localizedUrl(`/services/${s.slug}`, locale),
      }));
      return textContent({ locale, services });
    }
    case "get_service": {
      const locale = normalizeLocale(args.locale);
      const slug = String(args.slug ?? "");
      if (!slug) return textContent("Missing required argument: slug", true);
      const exists = getAllServices(locale).some((s) => s.slug === slug) ||
        getAllServices("en").some((s) => s.slug === slug);
      if (!exists) return textContent(`No service found with slug '${slug}'.`, true);
      const service = await getServiceBySlug(slug, locale);
      return textContent({
        slug: service.slug,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        url: localizedUrl(`/services/${slug}`, locale),
        content: htmlToText(service.html),
      });
    }
    case "list_blog_posts": {
      const locale = normalizeLocale(args.locale);
      const posts = getAllPosts(locale).map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        description: p.description,
        url: localizedUrl(`/blog/${p.slug}`, locale),
      }));
      return textContent({ locale, posts });
    }
    case "get_blog_post": {
      const locale = normalizeLocale(args.locale);
      const slug = String(args.slug ?? "");
      if (!slug) return textContent("Missing required argument: slug", true);
      const exists = getAllPosts(locale).some((p) => p.slug === slug) ||
        getAllPosts("en").some((p) => p.slug === slug);
      if (!exists) return textContent(`No blog post found with slug '${slug}'.`, true);
      const post = await getPostBySlug(slug, locale);
      return textContent({
        slug: post.slug,
        title: post.title,
        date: post.date,
        description: post.description,
        url: localizedUrl(`/blog/${slug}`, locale),
        content: htmlToText(post.html),
      });
    }
    case "send_contact_message": {
      const parsed = contactSchema.safeParse({
        name: args.name,
        email: args.email,
        message: args.message,
      });
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `${i.path.join(".") || "input"}: ${i.message}`)
          .join("; ");
        return textContent(`Invalid input — ${issues}`, true);
      }
      const result = await handleContactSubmission(parsed.data, ip);
      if (result.success) {
        return textContent("Message sent. Falk will reply to the email you provided.");
      }
      const reason =
        result.error === "rate_limit"
          ? "Too many requests — please try again later."
          : "Sending failed — please try again later.";
      return textContent(reason, true);
    }
    default:
      return null;
  }
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function handleMcpRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return rpcError(null, -32600, "MCP endpoint expects JSON-RPC over POST.", 405);
  }

  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: any };
  try {
    body = await req.json();
  } catch {
    return rpcError(null, -32700, "Parse error: invalid JSON.");
  }

  const { id = null, method, params } = body ?? {};

  switch (method) {
    case "initialize":
      return rpcResult(id, {
        protocolVersion:
          typeof params?.protocolVersion === "string"
            ? params.protocolVersion
            : LATEST_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      });

    // Notifications carry no id and expect no response body.
    case "notifications/initialized":
    case "notifications/cancelled":
      return new Response(null, { status: 202, headers: CORS_HEADERS });

    case "ping":
      return rpcResult(id, {});

    case "tools/list":
      return rpcResult(id, { tools: TOOLS });

    case "tools/call": {
      const name = params?.name;
      const args = (params?.arguments ?? {}) as Record<string, unknown>;
      if (typeof name !== "string") {
        return rpcError(id, -32602, "Invalid params: missing tool name.");
      }
      try {
        const result = await callTool(name, args, clientIp(req));
        if (result === null) {
          return rpcError(id, -32602, `Unknown tool: ${name}`);
        }
        return rpcResult(id, result);
      } catch (error) {
        return rpcError(
          id,
          -32603,
          `Internal error while running tool '${name}'.`,
        );
      }
    }

    default:
      return rpcError(id, -32601, `Method not found: ${method ?? "(none)"}`);
  }
}

// Re-exported for potential discovery/documentation use.
export const MCP_ENDPOINT = `${siteConfig.domain}/mcp`;
