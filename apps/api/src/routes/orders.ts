import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '@/db'
import { orders, orderItems, coupons, products } from '@/db/schema'
import { eq } from 'drizzle-orm'

const createOrderSchema = z.object({
  billingFirstName: z.string().min(1),
  billingLastName: z.string().min(1),
  billingEmail: z.string().email(),
  billingPhone: z.string().min(7),
  billingCity: z.string().optional(),
  billingStreet: z.string().optional(),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'bit']),
  numInstallments: z.number().int().min(1).max(3).default(1),
  couponCode: z.string().optional(),
  termsAccepted: z.boolean().refine((v) => v === true, 'Must accept terms'),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1).default(1),
        workshopSessionId: z.string().uuid().optional(),
      })
    )
    .min(1),
})

export const orders_router = new Hono()

orders_router.post('/', zValidator('json', createOrderSchema), async (c) => {
  const body = c.req.valid('json')

  // Resolve products
  const productRows = await Promise.all(
    body.items.map((item) =>
      db.query.products.findFirst({ where: eq(products.id, item.productId) })
    )
  )
  if (productRows.some((p) => !p)) return c.json({ error: 'One or more products not found' }, 400)

  // Compute subtotal
  let subtotal = productRows.reduce((sum, p, i) => {
    return sum + parseFloat(p!.price) * body.items[i].quantity
  }, 0)

  // Apply coupon
  let discountAmount = 0
  if (body.couponCode) {
    const coupon = await db.query.coupons.findFirst({
      where: (c) => eq(c.code, body.couponCode!),
    })
    if (!coupon || !coupon.isActive) return c.json({ error: 'Invalid coupon' }, 400)
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date())
      return c.json({ error: 'Coupon expired' }, 400)
    if (coupon.maxUses && (coupon.usesCount ?? 0) >= coupon.maxUses)
      return c.json({ error: 'Coupon usage limit reached' }, 400)

    if (coupon.discountType === 'percent') {
      discountAmount = (subtotal * parseFloat(coupon.discountValue)) / 100
    } else {
      discountAmount = parseFloat(coupon.discountValue)
    }
    discountAmount = Math.min(discountAmount, subtotal)
  }

  const total = subtotal - discountAmount

  // Create order
  const [order] = await db
    .insert(orders)
    .values({
      billingFirstName: body.billingFirstName,
      billingLastName: body.billingLastName,
      billingEmail: body.billingEmail,
      billingPhone: body.billingPhone,
      billingCity: body.billingCity,
      billingStreet: body.billingStreet,
      orderNotes: body.orderNotes,
      paymentMethod: body.paymentMethod,
      numInstallments: body.numInstallments,
      couponCode: body.couponCode,
      termsAccepted: body.termsAccepted,
      subtotal: subtotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      total: total.toFixed(2),
      status: 'pending',
    })
    .returning()

  // Insert order items
  await db.insert(orderItems).values(
    body.items.map((item, i) => ({
      orderId: order.id,
      productId: item.productId,
      productNameHe: productRows[i]!.nameHe,
      quantity: item.quantity,
      unitPrice: productRows[i]!.price,
      totalPrice: (parseFloat(productRows[i]!.price) * item.quantity).toFixed(2),
      workshopSessionId: item.workshopSessionId ?? null,
    }))
  )

  return c.json({ data: { orderId: order.id, orderNumber: order.orderNumber, total } }, 201)
})

// GET /orders/:id — fetch order status (for confirmation page)
orders_router.get('/:id', async (c) => {
  const id = c.req.param('id')
  const order = await db.query.orders.findFirst({
    where: (o) => eq(o.id, id),
    with: { items: { with: { product: true } } },
  })
  if (!order) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: order })
})

export { orders_router as orders }
