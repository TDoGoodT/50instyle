import { Hono } from 'hono'
import { db } from '@/db'
import { workshopSessions } from '@/db/schema'
import { eq, gte } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const workshops = new Hono()

// GET /workshops — upcoming active sessions
workshops.get('/', async (c) => {
  const today = new Date().toISOString().split('T')[0]

  const rows = await db.query.workshopSessions.findMany({
    where: (ws) => eq(ws.isActive, true),
    with: {
      product: { with: { features: true } },
    },
    orderBy: (ws, { asc }) => [asc(ws.sessionDate)],
  })

  // Filter future sessions
  const upcoming = rows.filter((ws) => ws.sessionDate >= today)
  return c.json({ data: upcoming })
})

// GET /workshops/:id
workshops.get('/:id', async (c) => {
  const id = c.req.param('id')
  const session = await db.query.workshopSessions.findFirst({
    where: (ws) => eq(ws.id, id),
    with: { product: true },
  })
  if (!session) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: session })
})
