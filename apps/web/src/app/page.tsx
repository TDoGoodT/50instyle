export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getProducts, getTestimonials, formatPrice } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import TestimonialsSlider from '@/components/home/TestimonialsSlider'
import ContactForm from '@/components/home/ContactForm'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default async function HomePage() {
  const [{ data: allProducts }, { data: testimonials }] = await Promise.all([
    getProducts(),
    getTestimonials(),
  ])

  const featuredProducts = allProducts
    .filter((p) => !p.isGiftVoucher)
    .slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-gold-50 to-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <p className="mb-2 font-medium text-gold-600 tracking-wide">לימור בכר</p>
            <h1 className="font-frank mb-6 text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              כי כל אישה ראויה <br />
              <span className="text-gold-500">להרגיש מושלמת</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              סטיילינג אישי לנשים בגיל 50+ — לגלות את הסגנון שמחכה לך, להתאהב מחדש בהתלבשות.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="btn-gold">
                לשירותי הסטיילינג
              </Link>
              <Link href="/contact" className="btn-outline">
                דברי איתי
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-frank text-3xl font-bold text-charcoal">שירותי הסטיילינג</h2>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:underline">
              לכל השירותים <ArrowLeft size={14} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Limor */}
      <section className="bg-gold-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-frank mb-10 text-3xl font-bold text-center text-charcoal">
            למה לימור?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'אני מאמינה', body: 'שסטיילינג מעצים ביטחון עצמי ומשפיע על כל תחומי החיים' },
              { title: 'אני מרגישה', body: 'מבורכת שאוכל לעזור לנשים למצוא את עצמן דרך הלבוש' },
              { title: 'אני מתחייבת', body: 'לליווי אישי מלא, כי כל אישה היא עולם ומלואו' },
              { title: 'אני מבטיחה', body: 'תהליך מלא של גילוי עצמי שתוצאותיו יישמרו לנצח' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="mb-3 text-gold-500" size={28} />
                <h3 className="font-frank mb-2 text-lg font-bold text-charcoal">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-frank mb-10 text-3xl font-bold text-center text-charcoal">
              מה אומרות הלקוחות
            </h2>
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-frank mb-3 text-3xl font-bold text-center">רוצה להתחיל?</h2>
          <p className="mb-8 text-center text-gray-300">
            השאירי פרטים ואחזור אלייך בהקדם
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
