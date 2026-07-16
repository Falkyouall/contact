import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";

export interface LegalPage {
  title: string;
  description: string;
  html: string;
}

export type LegalSlug = "impressum" | "datenschutz";

export async function getLegalPage(
  slug: LegalSlug,
  locale: string = "en",
): Promise<LegalPage> {
  let filePath = path.join(process.cwd(), "content", locale, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), "content", "en", `${slug}.md`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(rehypeStringify)
    .process(content);

  return {
    title: data.title,
    description: data.description ?? "",
    html: String(result),
  };
}
