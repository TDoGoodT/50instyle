import { getFaq } from '@/lib/api'
import FaqAccordion from '@/components/ui/FaqAccordion'
import FullContactForm from '@/components/contact/FullContactForm'
import type { Metadata } from 'next'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'שאלות ותשובות',
  description: 'תשובות לשאלות הכי נפוצות על סטיילינג אישי.',
}

export default async function FaqPage() {
  const { data: items } = await getFaq()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">שאלות ותשובות</h1>
      <p className="mb-10 text-gray-600">
        לא מצאת תשובה? כתבי לי בטופס למטה.
      </p>

      {items.length > 0 ? (
        <FaqAccordion items={items} />
      ) : (
        <p className="text-gray-400">אין שאלות להצגה כרגע.</p>
      )}

      <div className="mt-16 rounded-2xl bg-gold-50 p-8">
        <h2 className="font-frank mb-6 text-2xl font-bold text-charcoal">יש לך שאלה?</h2>
        <FullContactForm compact />
      </div>
    </div>
  )
}
