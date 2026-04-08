import { getProducts } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import type { Metadata } from 'next'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'שוברי מתנה',
  description: 'שוברי מתנה לסטיילינג אישי — ליום הולדת, יום נישואין, לחברה ועוד.',
}

export default async function GiftVouchersPage() {
  const { data: allProducts } = await getProducts()
  const vouchers = allProducts.filter((p) => p.isGiftVoucher)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">שוברי מתנה</h1>
      <p className="mb-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
        מתנה שתמיד מתאימה — חוויה של סטיילינג אישי. מושלם ליום הולדת, יום נישואין, או סתם
        כדי לפנק אישה שאת אוהבת.
      </p>
      {vouchers.length === 0 ? (
        <p className="text-gray-400">אין שוברים זמינים כרגע.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vouchers.map((v) => (
            <ProductCard key={v.id} product={v} />
          ))}
        </div>
      )}
    </div>
  )
}
