import { getProduct, formatPrice } from '@/lib/api'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AddToCartButton from '@/components/product/AddToCartButton'
import { CheckCircle2, Clock, MapPin, Share2 } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { data: product } = await getProduct(slug)
    return {
      title: product.nameHe,
      description: product.descriptionHe?.slice(0, 160) ?? undefined,
    }
  } catch {
    return {}
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  let product
  try {
    const res = await getProduct(slug)
    product = res.data
  } catch {
    notFound()
  }

  const shareUrl = `https://www.50instyle.co.il/product/${slug}`
  const shareText = encodeURIComponent(`${product.nameHe} – 50inStyle`)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500" aria-label="breadcrumb">
        <Link href="/" className="hover:text-gold-600">ראשי</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-gold-600">שירותים</Link>
        <span>/</span>
        <span className="text-gray-800">{product.nameHe}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Content — 3 cols */}
        <div className="lg:col-span-3">
          <h1 className="font-frank mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            {product.nameHe}
          </h1>

          {/* Meta chips */}
          <div className="mb-6 flex flex-wrap gap-3">
            {product.durationHours && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-sm text-gold-700">
                <Clock size={13} />
                {product.numSessions && product.numSessions > 1
                  ? `${product.numSessions} מפגשים × ${product.durationHours} שעות`
                  : `${product.durationHours} שעות`}
              </span>
            )}
            {product.locationNoteHe && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-sm text-gold-700">
                <MapPin size={13} />
                {product.locationNoteHe}
              </span>
            )}
            {product.sessionValidityDays && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-sm text-gold-700">
                תוקף {product.sessionValidityDays} ימים
              </span>
            )}
          </div>

          {/* Description */}
          {product.descriptionHe && (
            <div className="prose prose-gold mb-8 max-w-none leading-relaxed text-gray-700">
              {product.descriptionHe.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Features / What's included */}
          {product.features.length > 0 && (
            <div className="rounded-2xl border border-gold-100 bg-gold-50 p-6">
              <h2 className="font-frank mb-4 text-lg font-bold text-charcoal">מה כלול?</h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f.id} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-gold-500" />
                    {f.featureHe}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social share */}
          <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
            <Share2 size={15} />
            <span>שיתוף:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              פייסבוק
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:underline"
            >
              וואטסאפ
            </a>
          </div>
        </div>

        {/* Sidebar / Buy box — 2 cols */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-gold-100 bg-white p-6 shadow-md">
            <p className="mb-1 text-sm text-gray-500">מחיר</p>
            <p className="font-frank mb-6 text-4xl font-bold text-gold-600">
              {formatPrice(product.price)}
            </p>

            {product.maxInstallments > 1 && (
              <p className="mb-4 text-xs text-gray-500">
                עד {product.maxInstallments} תשלומים ללא ריבית
              </p>
            )}

            <AddToCartButton product={product} />

            <a
              href="https://wa.me/972545458278"
              target="_blank"
              rel="noreferrer"
              className="btn-outline mt-3 block w-full text-center"
            >
              יש לכן שאלה?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
