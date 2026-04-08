'use client'

import { useCart } from '@/context/CartContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createOrder, validateCoupon, formatPrice } from '@/lib/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  billingFirstName: z.string().min(1, 'שדה חובה'),
  billingLastName: z.string().min(1, 'שדה חובה'),
  billingEmail: z.string().email('כתובת מייל לא תקינה'),
  billingPhone: z.string().min(7, 'מספר טלפון לא תקין'),
  billingCity: z.string().optional(),
  billingStreet: z.string().optional(),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'bit']),
  numInstallments: z.number().min(1).max(3),
  termsAccepted: z.boolean().refine((v) => v, 'יש לאשר את התקנון'),
})

type FormData = z.infer<typeof schema>

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponResult, setCouponResult] = useState<{ discountAmount: string } | null>(null)
  const [couponError, setCouponError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: 'credit_card', numInstallments: 1 },
  })

  const paymentMethod = watch('paymentMethod')
  const finalTotal = couponResult
    ? total - parseFloat(couponResult.discountAmount)
    : total

  const handleCoupon = async () => {
    setCouponError('')
    try {
      const res = await validateCoupon(couponCode, total)
      if (res.valid) {
        setCouponResult({ discountAmount: res.discountAmount! })
      } else {
        setCouponError(res.error ?? 'קוד לא תקין')
      }
    } catch {
      setCouponError('שגיאה באימות הקופון')
    }
  }

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return
    setSubmitting(true)
    setError('')
    try {
      const res = await createOrder({
        ...data,
        couponCode: couponResult ? couponCode : undefined,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      })
      clearCart()
      router.push(`/order-complete?id=${res.data.orderId}&num=${res.data.orderNumber}`)
    } catch (e: any) {
      setError(e.message ?? 'שגיאה בביצוע ההזמנה')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-lg text-gray-500">העגלה ריקה</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-frank mb-8 text-3xl font-bold text-charcoal">תשלום</h1>

      {/* Coupon */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setCouponOpen(!couponOpen)}
          className="text-sm text-gold-600 hover:underline"
        >
          יש לכם קוד קופון? לחצי כאן
        </button>
        {couponOpen && (
          <div className="mt-2 flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="קוד קופון"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleCoupon}
              className="btn-gold px-4 py-2 text-sm"
            >
              אמת
            </button>
          </div>
        )}
        {couponResult && (
          <p className="mt-1 text-sm text-green-600">
            ✓ הנחה של {formatPrice(couponResult.discountAmount)} הוחלה
          </p>
        )}
        {couponError && <p className="mt-1 text-sm text-red-500">{couponError}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-3">
        {/* Left — form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Billing */}
          <section>
            <h2 className="font-frank mb-4 text-xl font-bold text-charcoal">פרטי חיוב</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="שם פרטי *" error={errors.billingFirstName?.message}>
                <input {...register('billingFirstName')} className={inputCls} />
              </Field>
              <Field label="שם משפחה *" error={errors.billingLastName?.message}>
                <input {...register('billingLastName')} className={inputCls} />
              </Field>
              <Field label="כתובת אימייל *" error={errors.billingEmail?.message}>
                <input {...register('billingEmail')} type="email" className={inputCls} />
              </Field>
              <Field label="טלפון *" error={errors.billingPhone?.message}>
                <input {...register('billingPhone')} type="tel" className={inputCls} />
              </Field>
              <Field label="רחוב" error={errors.billingStreet?.message}>
                <input {...register('billingStreet')} className={inputCls} />
              </Field>
              <Field label="עיר" error={errors.billingCity?.message}>
                <input {...register('billingCity')} className={inputCls} />
              </Field>
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="font-frank mb-4 text-xl font-bold text-charcoal">מידע נוסף</h2>
            <Field label="הערות להזמנה (אופציונלי)">
              <textarea {...register('orderNotes')} rows={3} className={inputCls} />
            </Field>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-frank mb-4 text-xl font-bold text-charcoal">תשלום</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-gold-400">
                <input {...register('paymentMethod')} type="radio" value="credit_card" />
                <span className="text-sm font-medium">כרטיס אשראי</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-gold-400">
                <input {...register('paymentMethod')} type="radio" value="bit" />
                <span className="text-sm font-medium">ביט</span>
              </label>
            </div>

            {paymentMethod === 'credit_card' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">מספר תשלומים</label>
                <select {...register('numInstallments', { valueAsNumber: true })} className={`${inputCls} w-40`}>
                  <option value={1}>תשלום 1</option>
                  <option value={2}>2 תשלומים</option>
                  <option value={3}>3 תשלומים</option>
                </select>
              </div>
            )}
          </section>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-600">
              <input {...register('termsAccepted')} type="checkbox" className="mt-0.5" />
              <span>
                קראתי ואני מסכימה ל
                <a href="/terms" target="_blank" className="text-gold-600 hover:underline">תקנון האתר</a>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 text-xs text-red-500">{errors.termsAccepted.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full py-4 text-base disabled:opacity-60"
          >
            {submitting ? 'מעבד...' : 'לתשלום מאובטח 🔒'}
          </button>
        </div>

        {/* Right — order summary */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-gold-100 bg-gold-50 p-6">
            <h2 className="font-frank mb-4 text-lg font-bold text-charcoal">פרטי ההזמנה</h2>
            <ul className="space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-2">
                  <span className="text-gray-700">{item.nameHe} × {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="my-3 border-t border-gold-200" />
            {couponResult && (
              <div className="flex justify-between text-sm text-green-600 mb-1">
                <span>הנחה</span>
                <span>-{formatPrice(couponResult.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>סה"כ לתשלום</span>
              <span className="text-xl text-gold-600">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const inputCls =
  'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
