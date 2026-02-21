import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

function getContentDir(locale: string) {
  return path.join(process.cwd(), 'content', locale, 'blog')
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
}

export interface Post extends PostMeta {
  html: string
}

export function getAllPosts(locale: string = 'en'): PostMeta[] {
  const dir = getContentDir(locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title,
      date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
      description: data.description,
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<Post> {
  let dir = getContentDir(locale)
  let filePath = path.join(dir, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    dir = getContentDir('en')
    filePath = path.join(dir, `${slug}.md`)
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)

  return {
    slug,
    title: data.title,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
    description: data.description,
    html: String(result),
  }
}
