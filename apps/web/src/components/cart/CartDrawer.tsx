'use client'

import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/api'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeCart}
          />

          {/* Drawer — slides in from the right (RTL: right side = start) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold-100 px-5 py-4">
              <h2 className="font-frank text-lg font-bold text-gray-900">עגלת קניות</h2>
              <button
                onClick={closeCart}
                aria-label="סגור עגלה"
                className="rounded-full p-1.5 hover:bg-gold-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm">העגלה ריקה</p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-sm font-medium text-gold-600 hover:underline"
                  >
                    המשיכי לקנות
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.nameHe}</p>
                        <p className="mt-0.5 text-sm text-gold-600">{formatPrice(item.price)}</p>
                        {/* Quantity */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQty(item.productId, item.quantity - 1)
                                : removeItem(item.productId)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 hover:border-gold-400"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 hover:border-gold-400"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs text-gray-400 hover:text-red-500"
                        >
                          הסר
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold-100 px-5 py-5">
                <div className="mb-4 flex justify-between text-sm font-medium">
                  <span className="text-gray-600">סה"כ</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-gold block w-full text-center"
                >
                  המשך לתשלום
                </Link>
                <button
                  onClick={closeCart}
                  className="mt-2 w-full text-center text-sm text-gray-500 hover:text-gold-600"
                >
                  המשיכי לקנות
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
