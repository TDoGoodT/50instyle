'use client'

import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/api'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      nameHe: product.nameHe,
      price: parseFloat(product.price),
      quantity: 1,
    })
  }

  return (
    <button
      onClick={handleAdd}
      className="btn-gold flex w-full items-center justify-center gap-2"
    >
      <ShoppingCart size={18} />
      לרכישה
    </button>
  )
}
