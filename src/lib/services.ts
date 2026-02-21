import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeExternalLinks from 'rehype-external-links'

function getContentDir(locale: string) {
  return path.join(process.cwd(), 'content', locale, 'services')
}

export interface ServiceMeta {
  slug: string
  title: string
  subtitle: string
  date: string
  description: string
}

export interface Service extends ServiceMeta {
  html: string
  contactHeading?: string
}

export function getAllServices(locale: string = 'en'): ServiceMeta[] {
  const dir = getContentDir(locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const services = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
      description: data.description,
    }
  })

  return services.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getServiceBySlug(slug: string, locale: string = 'en'): Promise<Service> {
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
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeStringify)
    .process(content)

  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
    description: data.description,
    html: String(result),
    contactHeading: data.contactHeading,
  }
}
