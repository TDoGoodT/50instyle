'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartDrawer from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/about', label: 'מי אני' },
  { href: '/services', label: 'שירותי סטיילינג' },
  { href: '/workshops', label: 'סדנאות סטיילינג' },
  { href: '/gift-vouchers', label: 'שוברי מתנה' },
  { href: '/blog', label: 'בלוג' },
  { href: '/faq', label: 'שאלות תשובות' },
  { href: '/testimonials', label: 'המלצות' },
  { href: '/contact', label: 'דברי איתי' },
]

export default function Header() {
  const { itemCount, toggleCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold-100 bg-white shadow-sm">
        {/* Top bar */}
        <div className="bg-gold-500 py-1.5 text-center text-sm text-white">
          <a href="tel:054-5458278" className="inline-flex items-center gap-1.5 hover:underline">
            <Phone size={13} />
            054-5458278
          </a>
          <span className="mx-3 opacity-50">|</span>
          <span>סטיילינג אישי לנשים בגיל 50+</span>
        </div>

        {/* Main nav */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="font-frank text-2xl font-bold text-gold-600">
            50inStyle
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="ניווט ראשי">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gold-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              aria-label={`עגלת קניות, ${itemCount} פריטים`}
              className="relative rounded-full p-2 hover:bg-gold-50"
            >
              <ShoppingCart size={22} className="text-gold-600" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="rounded-full p-2 hover:bg-gold-50 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="תפריט"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="border-t border-gold-100 bg-white px-4 pb-4 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-gray-700 hover:text-gold-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
