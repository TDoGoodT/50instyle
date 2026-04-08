import { Hono } from 'hono'
import { db } from '@/db'
import { products, productFeatures } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export const products_router = new Hono()

// GET /products — list all active products (optionally filter by category slug)
products_router.get('/', async (c) => {
  const categorySlug = c.req.query('category')

  const rows = await db.query.products.findMany({
    where: eq(products.isActive, true),
    with: {
      category: true,
      features: { orderBy: (f, { asc }) => [asc(f.sortOrder)] },
    },
    orderBy: (p, { asc }) => [asc(p.sortOrder)],
  })

  const filtered = categorySlug
    ? rows.filter((p) => p.category?.slug === categorySlug)
    : rows

  return c.json({ data: filtered })
})

// GET /products/:slug — single product with full details
products_router.get('/:slug', async (c) => {
  const slug = c.req.param('slug')

  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      category: true,
      features: { orderBy: (f, { asc }) => [asc(f.sortOrder)] },
    },
  })

  if (!product) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: product })
})

export { products_router as products }
