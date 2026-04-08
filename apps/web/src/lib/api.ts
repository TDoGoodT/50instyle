const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((err as any).error ?? 'API error')
  }
  return res.json()
}

export type Product = {
  id: string
  slug: string
  nameHe: string
  descriptionHe: string | null
  price: string
  durationHours: string | null
  numSessions: number | null
  sessionValidityDays: number | null
  locationType: string | null
  locationNoteHe: string | null
  maxInstallments: number
  isGiftVoucher: boolean
  isWorkshop: boolean
  category: { slug: string; nameHe: string } | null
  features: { id: string; featureHe: string; sortOrder: number }[]
}

export type BlogPost = {
  id: string
  slug: string
  titleHe: string
  excerptHe: string | null
  coverImage: string | null
  tags: string[] | null
  publishedAt: string | null
}

export type Testimonial = {
  id: string
  clientName: string
  serviceType: string | null
  quoteHe: string
  photoUrl: string | null
  rating: number | null
  sortOrder: number
}

export type FaqItem = {
  id: string
  questionHe: string
  answerHe: string
  category: string | null
  sortOrder: number
}

export type WorkshopSession = {
  id: string
  sessionDate: string
  startTime: string
  endTime: string | null
  locationName: string | null
  locationAddress: string | null
  maxSeats: number
  seatsTaken: number
  price: string | null
  product: Product
}

// Products
export const getProducts = (category?: string) =>
  apiFetch<{ data: Product[] }>(`/products${category ? `?category=${category}` : ''}`)

export const getProduct = (slug: string) =>
  apiFetch<{ data: Product }>(`/products/${slug}`)

// Blog
export const getBlogPosts = (tag?: string) =>
  apiFetch<{ data: BlogPost[] }>(`/blog${tag ? `?tag=${tag}` : ''}`)

export const getBlogPost = (slug: string) =>
  apiFetch<{ data: BlogPost & { contentHe: string } }>(`/blog/${slug}`)

// Testimonials
export const getTestimonials = () =>
  apiFetch<{ data: Testimonial[] }>('/testimonials')

// FAQ
export const getFaq = () =>
  apiFetch<{ data: FaqItem[] }>('/faq')

// Workshops
export const getWorkshops = () =>
  apiFetch<{ data: WorkshopSession[] }>('/workshops')

// Coupon validation
export const validateCoupon = (code: string, orderAmount: number) =>
  apiFetch<{
    valid: boolean
    discountType?: string
    discountValue?: string
    discountAmount?: string
    error?: string
  }>('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code, orderAmount }),
  })

// Contact
export const submitContact = (data: {
  firstName: string
  lastName?: string
  email: string
  phone: string
  dateOfBirth?: string
  interestedIn?: string
  message?: string
  sourcePage?: string
}) =>
  apiFetch<{ data: { id: string } }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// Orders
export const createOrder = (data: {
  billingFirstName: string
  billingLastName: string
  billingEmail: string
  billingPhone: string
  billingCity?: string
  billingStreet?: string
  orderNotes?: string
  paymentMethod: 'credit_card' | 'bit'
  numInstallments: number
  couponCode?: string
  termsAccepted: boolean
  items: { productId: string; quantity: number; workshopSessionId?: string }[]
}) =>
  apiFetch<{ data: { orderId: string; orderNumber: number; total: number } }>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getOrder = (id: string) =>
  apiFetch<{ data: any }>(`/orders/${id}`)

// Formatting helpers
export const formatPrice = (price: string | number) => {
  const n = typeof price === 'string' ? parseFloat(price) : price
  return `₪${n.toLocaleString('he-IL')}`
}
