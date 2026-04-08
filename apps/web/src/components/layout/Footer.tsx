import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

// Brand icons as inline SVG (lucide v1 dropped brand icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t border-gold-100 bg-gold-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="font-frank mb-3 text-xl font-bold text-gold-700">50inStyle</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              סטיילינג אישי לנשים. עוזרת לכן להתלבש נכון, להרגיש בטוחות ולאהוב את עצמכן.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="פייסבוק" className="text-gold-500 hover:text-gold-700">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="אינסטגרם" className="text-gold-500 hover:text-gold-700">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="יוטיוב" className="text-gold-500 hover:text-gold-700">
                <YoutubeIcon />
              </a>
              <a href="https://wa.me/972545458278" target="_blank" rel="noreferrer" aria-label="וואטסאפ" className="text-gold-500 hover:text-gold-700">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">ניווט</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                ['/services', 'שירותי סטיילינג'],
                ['/workshops', 'סדנאות סטיילינג'],
                ['/gift-vouchers', 'שוברי מתנה'],
                ['/blog', 'בלוג'],
                ['/faq', 'שאלות תשובות'],
                ['/testimonials', 'המלצות'],
                ['/contact', 'צרי קשר'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold-600">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">יצירת קשר</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="tel:054-5458278" className="inline-flex items-center gap-2 hover:text-gold-600">
                  <Phone size={15} />
                  054-5458278
                </a>
              </li>
              <li>
                <a href="mailto:info@50instyle.co.il" className="inline-flex items-center gap-2 hover:text-gold-600">
                  <Mail size={15} />
                  info@50instyle.co.il
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-200 pt-6 text-center text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="hover:text-gold-600">תקנון</Link>
            <Link href="/privacy" className="hover:text-gold-600">מדיניות פרטיות</Link>
            <Link href="/sitemap" className="hover:text-gold-600">מפת אתר</Link>
            <Link href="/accessibility" className="hover:text-gold-600">הצהרת נגישות</Link>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} לימור בכר – 50inStyle. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
