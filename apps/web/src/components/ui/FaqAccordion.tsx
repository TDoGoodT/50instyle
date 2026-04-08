'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FaqItem } from '@/lib/api'
import { Plus, Minus } from 'lucide-react'

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right font-medium text-gray-900 hover:bg-gold-50"
              aria-expanded={isOpen}
            >
              <span>{item.questionHe}</span>
              {isOpen ? (
                <Minus size={16} className="shrink-0 text-gold-500" />
              ) : (
                <Plus size={16} className="shrink-0 text-gold-500" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">
                    {item.answerHe}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
