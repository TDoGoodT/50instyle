import Link from 'next/link'
import type { Product } from '@/lib/api'
import { formatPrice } from '@/lib/api'
import { Clock, ArrowLeft } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {product.category && (
        <span className="mb-3 self-start rounded-full bg-gold-50 px-2.5 py-0.5 text-xs font-medium text-gold-700">
          {product.category.nameHe}
        </span>
      )}
      <h3 className="font-frank mb-2 text-xl font-bold text-charcoal group-hover:text-gold-600 transition-colors">
        {product.nameHe}
      </h3>
      {product.durationHours && (
        <p className="mb-3 flex items-center gap-1 text-xs text-gray-400">
          <Clock size={12} />
          {product.numSessions && product.numSessions > 1
            ? `${product.numSessions} מפגשים × ${product.durationHours} שעות`
            : `${product.durationHours} שעות`}
        </p>
      )}
      {product.descriptionHe && (
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {product.descriptionHe}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xl font-bold text-gold-600">{formatPrice(product.price)}</span>
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:underline"
        >
          פרטים <ArrowLeft size={14} />
        </Link>
      </div>
    </div>
  )
}
