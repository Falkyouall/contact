import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export interface AboutPage {
  title: string;
  html: string;
}

export async function getAboutPage(
  locale: string = "en",
): Promise<AboutPage> {
  let filePath = path.join(process.cwd(), "content", locale, "about.md");

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), "content", "en", "about.md");
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return {
    title: data.title,
    html: String(result),
  };
}
