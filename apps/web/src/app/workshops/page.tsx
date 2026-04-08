import { getWorkshops, formatPrice } from '@/lib/api'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import { Calendar, MapPin, Users } from 'lucide-react'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'סדנאות סטיילינג',
  description: 'סדנאות סטיילינג קבוצתיות — ללבוש אהבה עצמית, סדנת רווקות, סדנה לעסקים ועוד.',
}

export default async function WorkshopsPage() {
  const [{ data: sessions }, { data: allProducts }] = await Promise.all([
    getWorkshops(),
    getProducts(),
  ])
  const workshopProducts = allProducts.filter((p) => p.isWorkshop)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">סדנאות סטיילינג</h1>
      <p className="mb-12 max-w-2xl text-lg text-gray-600 leading-relaxed">
        בוקר כיף לנשים בנות דורנו. עד 15 משתתפות. כל אחת מקבלת אבחון אישי של מבנה גוף ולוח
        צבעים.
      </p>

      {/* Upcoming sessions */}
      <section className="mb-14">
        <h2 className="font-frank mb-6 text-2xl font-bold text-charcoal">סדנאות קרובות</h2>
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gold-200 bg-gold-50 p-10 text-center">
            <p className="text-gray-500">אין סדנאות מתוכננות כרגע.</p>
            <p className="mt-2 text-sm text-gray-400">
              השאירי פרטים ואודיע לך על הסדנה הבאה.
            </p>
            <a href="/contact" className="btn-gold mt-4 inline-block">
              עדכני אותי
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <div key={session.id} className="rounded-2xl border border-gold-100 bg-white p-6 shadow-sm">
                <h3 className="font-frank mb-2 text-lg font-bold text-charcoal">
                  {session.product.nameHe}
                </h3>
                <ul className="mb-4 space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold-500" />
                    {new Date(session.sessionDate).toLocaleDateString('he-IL')} · {session.startTime}
                    {session.endTime && `–${session.endTime}`}
                  </li>
                  {session.locationName && (
                    <li className="flex items-center gap-2">
                      <MapPin size={14} className="text-gold-500" />
                      {session.locationName}
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <Users size={14} className="text-gold-500" />
                    {session.seatsTaken}/{session.maxSeats} משתתפות
                  </li>
                </ul>
                <p className="mb-4 text-xl font-bold text-gold-600">
                  {formatPrice(session.price ?? session.product.price)}
                </p>
                <a href="/contact" className="btn-gold block text-center">
                  הרשמה טלפונית
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Workshop products */}
      {workshopProducts.length > 0 && (
        <section>
          <h2 className="font-frank mb-6 text-2xl font-bold text-charcoal">סוגי סדנאות</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshopProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
