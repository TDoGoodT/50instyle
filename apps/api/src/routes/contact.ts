import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '@/db'
import { contactSubmissions } from '@/db/schema'

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(7),
  dateOfBirth: z.string().optional(),
  interestedIn: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
})

export const contact = new Hono()

contact.post('/', zValidator('json', contactSchema), async (c) => {
  const body = c.req.valid('json')

  const [submission] = await db
    .insert(contactSubmissions)
    .values({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth ?? null,
      interestedIn: body.interestedIn ?? null,
      message: body.message ?? null,
      sourcePage: body.sourcePage ?? null,
      status: 'new',
    })
    .returning()

  return c.json({ data: { id: submission.id } }, 201)
})
