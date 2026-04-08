'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitContact } from '@/lib/api'
import { useState } from 'react'

const schema = z.object({
  firstName: z.string().min(1, 'שדה חובה'),
  lastName: z.string().optional(),
  email: z.string().email('מייל לא תקין'),
  phone: z.string().min(7, 'טלפון לא תקין'),
  dateOfBirth: z.string().optional(),
  interestedIn: z.string().optional(),
  message: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const SERVICES = [
  { value: '', label: 'מתעניינת בשירות...' },
  { value: 'product-purchase', label: 'רכישת מוצר' },
  { value: 'experiential-workshop', label: 'סדנת סטיילינג חוויתית' },
  { value: 'wardrobe-styling', label: 'סטיילינג בארון' },
  { value: 'shopping-styling', label: 'סטיילינג בקניות' },
  { value: 'combined-styling', label: 'סטיילינג משולב' },
  { value: 'bridal-styling', label: 'סטיילינג לכלות' },
  { value: 'business-styling', label: 'סטיילינג לעסקים' },
  { value: 'bachelorette-workshop', label: 'סדנה למסיבת רווקות' },
  { value: 'business-workshop', label: 'סדנת סטיילינג לעסקים' },
  { value: 'other', label: 'שירות אחר...' },
]

export default function FullContactForm({
  compact = false,
  sourcePage = 'contact',
}: {
  compact?: boolean
  sourcePage?: string
}) {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await submitContact({ ...data, sourcePage })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center">
        <p className="text-xl font-semibold text-green-700">✓ ההודעה נשלחה! אחזור אלייך בקרוב.</p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-100'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">שם פרטי *</label>
          <input {...register('firstName')} className={inputCls} />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">שם משפחה</label>
          <input {...register('lastName')} className={inputCls} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">דואר אלקטרוני *</label>
        <input {...register('email')} type="email" className={inputCls} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">טלפון *</label>
        <input {...register('phone')} type="tel" className={inputCls} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      {!compact && (
        <>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">תאריך לידה</label>
            <input {...register('dateOfBirth')} type="date" className={inputCls} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">מתעניינת ב</label>
            <select {...register('interestedIn')} className={inputCls}>
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">תוכן ההודעה</label>
            <textarea {...register('message')} rows={4} className={inputCls} />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full disabled:opacity-60"
      >
        {isSubmitting ? 'שולח...' : 'שליחה'}
      </button>
    </form>
  )
}
