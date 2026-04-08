'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Testimonial } from '@/lib/api'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  const t = testimonials[idx]

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-2xl rounded-2xl bg-gold-50 p-8 text-center"
        >
          <blockquote className="mb-4 text-lg leading-relaxed text-gray-700 italic">
            "{t.quoteHe}"
          </blockquote>
          <cite className="font-semibold text-gold-700 not-italic">{t.clientName}</cite>
          {t.serviceType && (
            <p className="mt-1 text-xs text-gray-400">{t.serviceType}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={prev} aria-label="הקודם" className="rounded-full border border-gold-200 p-2 hover:bg-gold-50">
            <ChevronRight size={18} className="text-gold-600" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 w-2 rounded-full transition-all ${i === idx ? 'w-6 bg-gold-500' : 'bg-gold-200'}`}
                aria-label={`המלצה ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="הבא" className="rounded-full border border-gold-200 p-2 hover:bg-gold-50">
            <ChevronLeft size={18} className="text-gold-600" />
          </button>
        </div>
      )}
    </div>
  )
}
