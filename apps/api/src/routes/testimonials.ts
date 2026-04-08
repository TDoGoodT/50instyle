import { Hono } from 'hono'
import { db } from '@/db'
import { testimonials as testimonialsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const testimonials = new Hono()

testimonials.get('/', async (c) => {
  const rows = await db.query.testimonials.findMany({
    where: eq(testimonialsTable.isPublished, true),
    orderBy: (t, { asc }) => [asc(t.sortOrder)],
  })
  return c.json({ data: rows })
})
