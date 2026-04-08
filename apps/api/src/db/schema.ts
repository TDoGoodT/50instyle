import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  decimal,
  timestamp,
  date,
  time,
  serial,
  check,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// Product Categories
// ─────────────────────────────────────────────

export const productCategories = pgTable('product_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  nameHe: text('name_he').notNull(),
  nameEn: text('name_en'),
  description: text('description'),
  sortOrder: integer('sort_order').default(0),
  parentId: uuid('parent_id'), // self-reference added via relations
})

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  parent: one(productCategories, {
    fields: [productCategories.parentId],
    references: [productCategories.id],
  }),
  children: many(productCategories),
  products: many(products),
}))

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  categoryId: uuid('category_id').references(() => productCategories.id),
  nameHe: text('name_he').notNull(),
  nameEn: text('name_en'),
  descriptionHe: text('description_he'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),

  // Session details
  durationHours: decimal('duration_hours', { precision: 4, scale: 1 }),
  numSessions: integer('num_sessions'),
  sessionValidityDays: integer('session_validity_days'),

  // Location
  locationType: text('location_type'),  // client_home | mall | remote | salon | workplace | group
  locationNoteHe: text('location_note_he'),

  // Installments
  maxInstallments: integer('max_installments').default(3),

  // Flags
  isGiftVoucher: boolean('is_gift_voucher').default(false),
  isWorkshop: boolean('is_workshop').default(false),
  isActive: boolean('is_active').default(true),

  // SEO
  metaTitleHe: text('meta_title_he'),
  metaDescHe: text('meta_desc_he'),

  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
  features: many(productFeatures),
  workshopSessions: many(workshopSessions),
  orderItems: many(orderItems),
}))

// ─────────────────────────────────────────────
// Product Features (what's included bullet list)
// ─────────────────────────────────────────────

export const productFeatures = pgTable('product_features', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  featureHe: text('feature_he').notNull(),
  featureEn: text('feature_en'),
  sortOrder: integer('sort_order').default(0),
})

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.productId],
    references: [products.id],
  }),
}))

// ─────────────────────────────────────────────
// Workshop Sessions (scheduled group events)
// ─────────────────────────────────────────────

export const workshopSessions = pgTable('workshop_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  sessionDate: date('session_date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time'),
  locationName: text('location_name'),
  locationAddress: text('location_address'),
  maxSeats: integer('max_seats').default(15),
  seatsTaken: integer('seats_taken').default(0),
  price: decimal('price', { precision: 10, scale: 2 }),
  notesHe: text('notes_he'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const workshopSessionsRelations = relations(workshopSessions, ({ one, many }) => ({
  product: one(products, {
    fields: [workshopSessions.productId],
    references: [products.id],
  }),
  orderItems: many(orderItems),
}))

// ─────────────────────────────────────────────
// Users (customers)
// ─────────────────────────────────────────────

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone'),
  dateOfBirth: date('date_of_birth'),
  city: text('city'),
  street: text('street'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}))

// ─────────────────────────────────────────────
// Coupons
// ─────────────────────────────────────────────

export const coupons = pgTable('coupons', {
  code: text('code').primaryKey(),
  discountType: text('discount_type').notNull(), // fixed | percent
  discountValue: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
  maxUses: integer('max_uses'),
  usesCount: integer('uses_count').default(0),
  validFrom: date('valid_from'),
  validUntil: date('valid_until'),
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: serial('order_number').unique(),
  userId: uuid('user_id').references(() => users.id), // null = guest

  // Billing snapshot
  billingFirstName: text('billing_first_name').notNull(),
  billingLastName: text('billing_last_name').notNull(),
  billingEmail: text('billing_email').notNull(),
  billingPhone: text('billing_phone').notNull(),
  billingCity: text('billing_city'),
  billingStreet: text('billing_street'),

  // Financials
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),

  // Payment
  paymentMethod: text('payment_method').notNull(), // credit_card | bit
  numInstallments: integer('num_installments').default(1),
  couponCode: text('coupon_code').references(() => coupons.code),

  // Status
  status: text('status').default('pending').notNull(), // pending | processing | paid | cancelled | refunded

  // Notes & refs
  orderNotes: text('order_notes'),
  paymentRef: text('payment_ref'),
  termsAccepted: boolean('terms_accepted').notNull().default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}))

// ─────────────────────────────────────────────
// Order Items
// ─────────────────────────────────────────────

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  productNameHe: text('product_name_he').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  workshopSessionId: uuid('workshop_session_id').references(() => workshopSessions.id),
})

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  workshopSession: one(workshopSessions, {
    fields: [orderItems.workshopSessionId],
    references: [workshopSessions.id],
  }),
}))

// ─────────────────────────────────────────────
// Contact Submissions
// ─────────────────────────────────────────────

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  email: text('email').notNull(),
  phone: text('phone'),
  dateOfBirth: date('date_of_birth'),
  interestedIn: text('interested_in'),
  message: text('message'),
  sourcePage: text('source_page'),
  status: text('status').default('new').notNull(), // new | read | replied
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─────────────────────────────────────────────
// Blog Posts
// ─────────────────────────────────────────────

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  titleHe: text('title_he').notNull(),
  contentHe: text('content_he').notNull(),
  excerptHe: text('excerpt_he'),
  coverImage: text('cover_image'),
  tags: text('tags').array(),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ─────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────

export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientName: text('client_name').notNull(),
  serviceType: text('service_type'),
  quoteHe: text('quote_he').notNull(),
  photoUrl: text('photo_url'),
  rating: integer('rating'),
  isPublished: boolean('is_published').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─────────────────────────────────────────────
// FAQ Items
// ─────────────────────────────────────────────

export const faqItems = pgTable('faq_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionHe: text('question_he').notNull(),
  answerHe: text('answer_he').notNull(),
  category: text('category'),
  sortOrder: integer('sort_order').default(0),
  isPublished: boolean('is_published').default(true),
})

// ─────────────────────────────────────────────
// Gallery
// ─────────────────────────────────────────────

export const galleryItems = pgTable('gallery_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  imageUrl: text('image_url').notNull(),
  captionHe: text('caption_he'),
  altHe: text('alt_he'),
  sortOrder: integer('sort_order').default(0),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
