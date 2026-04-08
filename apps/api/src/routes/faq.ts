import { Hono } from 'hono'
import { db } from '@/db'
import { faqItems } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const faq = new Hono()

faq.get('/', async (c) => {
  const rows = await db.query.faqItems.findMany({
    where: eq(faqItems.isPublished, true),
    orderBy: (f, { asc }) => [asc(f.sortOrder)],
  })
  return c.json({ data: rows })
})
