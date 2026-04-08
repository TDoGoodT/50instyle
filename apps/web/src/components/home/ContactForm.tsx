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
})
type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await submitContact({ ...data, sourcePage: 'homepage' })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white/10 p-8 text-center text-white">
        <p className="text-xl font-semibold">✓ קיבלתי! אחזור אלייך בקרוב 🙏</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input {...register('firstName')} placeholder="שם פרטי *" className={inputCls} />
          {errors.firstName && <p className="mt-1 text-xs text-red-300">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register('lastName')} placeholder="שם משפחה" className={inputCls} />
        </div>
      </div>
      <div>
        <input {...register('email')} type="email" placeholder="אימייל *" className={inputCls} />
        {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('phone')} type="tel" placeholder="טלפון *" className={inputCls} />
        {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-gold w-full disabled:opacity-60">
        {isSubmitting ? 'שולח...' : 'שלחי פרטים'}
      </button>
    </form>
  )
}

const inputCls =
  'w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-gray-300 focus:border-gold-300 focus:outline-none focus:ring-1 focus:ring-gold-300'
