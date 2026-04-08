export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/api'
import ProductCard from '@/components/product/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'שירותי סטיילינג אישי',
  description: 'כל שירותי הסטיילינג האישי — בארון, בקניות, משולב, עם חברה, לכלות, ועסקי.',
}

const CATEGORIES = [
  { slug: 'personal-styling', label: 'סטיילינג אישי' },
  { slug: 'online-styling', label: 'מקוון' },
  { slug: 'business-styling', label: 'עסקי' },
]

export default async function ServicesPage() {
  const { data: products } = await getProducts()
  const services = products.filter((p) => !p.isGiftVoucher && !p.isWorkshop)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">שירותי סטיילינג אישי</h1>
      <p className="mb-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
        כל שירות מותאם אישית — מאבחון מבנה גוף וצבעים, דרך סינון הארון, ועד ליווי בקניות.
        תבחרי את מה שמתאים לך.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
