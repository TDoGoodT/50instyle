import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { products } from '@/routes/products'
import { categories } from '@/routes/categories'
import { workshops } from '@/routes/workshops'
import { orders } from '@/routes/orders'
import { contact } from '@/routes/contact'
import { blog } from '@/routes/blog'
import { testimonials } from '@/routes/testimonials'
import { faq } from '@/routes/faq'
import { coupons } from '@/routes/coupons'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use(
  '*',
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  })
)

// Health
app.get('/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }))

// API v1
const v1 = new Hono()
v1.route('/products', products)
v1.route('/categories', categories)
v1.route('/workshops', workshops)
v1.route('/orders', orders)
v1.route('/contact', contact)
v1.route('/blog', blog)
v1.route('/testimonials', testimonials)
v1.route('/faq', faq)
v1.route('/coupons', coupons)

app.route('/api/v1', v1)

const port = parseInt(process.env.PORT ?? '3001')
console.log(`🚀 API running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
