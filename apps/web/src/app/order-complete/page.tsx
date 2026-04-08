import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; num?: string }>
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <CheckCircle className="mx-auto mb-6 text-green-500" size={64} strokeWidth={1.5} />
      <h1 className="font-frank mb-3 text-3xl font-bold text-charcoal">ההזמנה התקבלה!</h1>
      <p className="mb-2 text-gray-600">
        תודה רבה! ישלח אליך אימייל אישור בקרוב.
      </p>
      <p className="mb-8 text-sm text-gray-400">
        חשבונית מס תישלח תוך 2 ימי עסקים.
      </p>
      <Link href="/services" className="btn-gold">
        המשיכי לעיין בשירותים
      </Link>
    </div>
  )
}
