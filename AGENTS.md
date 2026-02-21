# AGENTS.md
## New Blog Post Workflow
- If user says "new blog post" without topic/title: ask for topic/title first.
- Pick branch name: short slug from topic/title.
- Scaffold file: `src/content/blog/<year>/<slug>.md`.
- Frontmatter: only set `title` from user input; keep required placeholders minimal (`description: "TBD"`, `draft: true`, `pubDate: <today ISO-8601>`).
- No body content; no invented outline.
- Open editor: `code <new-post-path>`.

## Project Context
- Framework: TanStack Start (`@tanstack/react-start`) with TanStack Router
- Package manager: pnpm
- Build tool: Vite
- Routes live in `src/routes/` (file-based routing, auto-generates `src/routeTree.gen.ts`)
- Blog content (markdown files) lives in `src/content/blog/<year>/`
- Blog route handler lives in `src/routes/blog/` and reads from the content directory
- Do NOT edit `src/routeTree.gen.ts` — it is auto-generated
