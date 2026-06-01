// Raw Markdown source endpoints for agents and text-first tools. Appending `.md`
// to a content URL returns the underlying Markdown instead of HTML — no JS, no
// scraping. Locale-aware via the same /de, /es prefixes used by the pages.
//
//   /about.md, /de/about.md
//   /services.md (index), /services/<slug>.md
//   /blog.md (index), /blog/<slug>.md
import fs from "node:fs";
import path from "node:path";
import { getAllServices } from "./services";
import { getAllPosts } from "./blog";
import { localizedUrl } from "./seo";

const LOCALES = ["en", "de", "es"] as const;
type Loc = (typeof LOCALES)[number];

const MD_HEADERS: Record<string, string> = {
  "Content-Type": "text/markdown; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "Access-Control-Allow-Origin": "*",
};

function readContent(locale: Loc, rel: string): string | null {
  for (const loc of [locale, "en"] as Loc[]) {
    const file = path.join(process.cwd(), "content", loc, rel);
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf-8");
  }
  return null;
}

type Target =
  | { locale: Loc; kind: "about" }
  | { locale: Loc; kind: "services-index" }
  | { locale: Loc; kind: "blog-index" }
  | { locale: Loc; kind: "service"; slug: string }
  | { locale: Loc; kind: "post"; slug: string };

function parsePath(pathname: string): Target | null {
  let p = pathname.replace(/\.md$/, "");
  let locale: Loc = "en";
  const m = p.match(/^\/(de|es)(?=\/|$)/);
  if (m) {
    locale = m[1] as Loc;
    p = p.slice(m[0].length) || "/";
  }
  if (p === "/about") return { locale, kind: "about" };
  if (p === "/services") return { locale, kind: "services-index" };
  if (p === "/blog") return { locale, kind: "blog-index" };
  let mm = p.match(/^\/services\/([^/]+)$/);
  if (mm) return { locale, kind: "service", slug: mm[1]! };
  mm = p.match(/^\/blog\/([^/]+)$/);
  if (mm) return { locale, kind: "post", slug: mm[1]! };
  return null;
}

function servicesIndex(locale: Loc): string {
  const items = getAllServices(locale).map(
    (s) => `- [${s.title}](${localizedUrl(`/services/${s.slug}`, locale)}): ${s.description}`,
  );
  return `# Services\n\n${items.join("\n")}\n`;
}

function blogIndex(locale: Loc): string {
  const items = getAllPosts(locale).map(
    (p) =>
      `- [${p.title}](${localizedUrl(`/blog/${p.slug}`, locale)}) — ${p.date}: ${p.description}`,
  );
  return `# Blog\n\n${items.join("\n")}\n`;
}

// Returns a Markdown Response for *.md content paths, or null for everything else
// so the caller can fall through to normal request handling.
export function handleMarkdownRequest(req: Request): Response | null {
  const { pathname } = new URL(req.url);
  if (!pathname.endsWith(".md")) return null;

  const target = parsePath(pathname);
  if (!target) {
    return new Response("Not found", { status: 404, headers: MD_HEADERS });
  }

  let text: string | null = null;
  switch (target.kind) {
    case "about":
      text = readContent(target.locale, "about.md");
      break;
    case "service":
      text = readContent(target.locale, `services/${target.slug}.md`);
      break;
    case "post":
      text = readContent(target.locale, `blog/${target.slug}.md`);
      break;
    case "services-index":
      text = servicesIndex(target.locale);
      break;
    case "blog-index":
      text = blogIndex(target.locale);
      break;
  }

  if (text == null) {
    return new Response("Not found", { status: 404, headers: MD_HEADERS });
  }
  return new Response(text, { status: 200, headers: MD_HEADERS });
}
