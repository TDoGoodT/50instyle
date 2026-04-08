import { Hono } from 'hono'
import { db } from '@/db'
import { productCategories } from '@/db/schema'

export const categories = new Hono()

categories.get('/', async (c) => {
  const rows = await db.query.productCategories.findMany({
    with: { children: true },
    orderBy: (cat, { asc }) => [asc(cat.sortOrder)],
  })
  return c.json({ data: rows })
})
