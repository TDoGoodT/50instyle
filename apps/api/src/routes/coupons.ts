import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '@/db'
import { coupons as couponsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

const validateSchema = z.object({
  code: z.string().min(1),
  orderAmount: z.number().positive(),
})

export const coupons = new Hono()

coupons.post('/validate', zValidator('json', validateSchema), async (c) => {
  const { code, orderAmount } = c.req.valid('json')

  const coupon = await db.query.coupons.findFirst({
    where: eq(couponsTable.code, code.toUpperCase()),
  })

  if (!coupon || !coupon.isActive) {
    return c.json({ valid: false, error: 'קוד קופון לא תקין' }, 400)
  }
  if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
    return c.json({ valid: false, error: 'תוקף הקופון פג' }, 400)
  }
  if (coupon.maxUses && (coupon.usesCount ?? 0) >= coupon.maxUses) {
    return c.json({ valid: false, error: 'הקופון מוצה' }, 400)
  }
  if (coupon.minOrderAmount && orderAmount < parseFloat(coupon.minOrderAmount)) {
    return c.json({
      valid: false,
      error: `סכום מינימלי להזמנה: ₪${coupon.minOrderAmount}`,
    }, 400)
  }

  const discountAmount =
    coupon.discountType === 'percent'
      ? Math.min((orderAmount * parseFloat(coupon.discountValue)) / 100, orderAmount)
      : Math.min(parseFloat(coupon.discountValue), orderAmount)

  return c.json({
    valid: true,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmount: discountAmount.toFixed(2),
  })
})
