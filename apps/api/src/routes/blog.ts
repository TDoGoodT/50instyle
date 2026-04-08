import { Hono } from 'hono'
import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export const blog = new Hono()

blog.get('/', async (c) => {
  const tag = c.req.query('tag')

  const rows = await db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    orderBy: (p, { desc }) => [desc(p.publishedAt)],
  })

  const filtered = tag ? rows.filter((p) => p.tags?.includes(tag)) : rows

  // Return list without full content (for index pages)
  return c.json({
    data: filtered.map(({ contentHe: _, ...rest }) => rest),
  })
})

blog.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const post = await db.query.blogPosts.findFirst({
    where: and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)),
  })
  if (!post) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: post })
})
