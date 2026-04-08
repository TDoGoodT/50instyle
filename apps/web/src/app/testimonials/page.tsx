import { getTestimonials } from '@/lib/api'
import type { Metadata } from 'next'
import { Star } from 'lucide-react'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'המלצות',
  description: 'מה אומרות הלקוחות על שירותי הסטיילינג של לימור בכר.',
}

export default async function TestimonialsPage() {
  const { data: testimonials } = await getTestimonials()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">המלצות</h1>
      <p className="mb-12 text-gray-600">מה אומרות הלקוחות שלי — בגוף ראשון.</p>

      {testimonials.length === 0 ? (
        <p className="text-gray-400">אין המלצות להצגה כרגע.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-gold-100 bg-white p-6 shadow-sm">
              {t.rating && (
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
              )}
              <blockquote className="mb-4 text-sm leading-relaxed text-gray-700 italic">
                "{t.quoteHe}"
              </blockquote>
              <div className="flex items-center gap-3">
                {t.photoUrl ? (
                  <img
                    src={t.photoUrl}
                    alt={t.clientName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-lg font-bold text-gold-600">
                    {t.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{t.clientName}</p>
                  {t.serviceType && (
                    <p className="text-xs text-gray-400">{t.serviceType}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
