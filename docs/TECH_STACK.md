# Proposed Tech Stack

## Guiding Principles

- **Modern, maintainable full-stack** — not a WordPress plugin maze
- **Hebrew/RTL first** — layout, text direction, date formatting
- **Israeli market ready** — Bit payment, Israeli credit cards, ILS currency
- **Fast & SEO-friendly** — critical for a local business
- **Simple admin** — Limor needs to manage products, blog posts, upcoming workshops herself

---

## Frontend

### Framework: Next.js 14+ (App Router)
- React-based, SSR/SSG for SEO
- File-system routing mirrors site structure
- Built-in image optimization
- Easy i18n support (Hebrew-only for now, but structured for future)

### UI / Styling
- **Tailwind CSS v4** — utility-first, RTL support via `dir="rtl"`
- **shadcn/ui** — accessible component library
- **Framer Motion** — smooth animations (product cards, accordion, cart slide-out)
- **Lucide React** — icons

### State Management
- **React Context** — cart state (simple enough, no Redux needed)
- **TanStack Query** — server state, caching API responses

### Forms
- **React Hook Form** + **Zod** — validation, contact forms, checkout

### RTL
- `<html dir="rtl" lang="he">` at root
- Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- Custom RTL-aware CSS where needed

---

## Backend

### Framework: Hono (on Bun)
- Ultra-fast, lightweight
- Consistent with Snir's existing stack (Podium app)
- TypeScript throughout

### API Design
- RESTful API under `/api/v1/`
- JSON responses
- JWT auth for admin panel

### Key API Modules
```
/api/v1/products          GET list, GET by slug
/api/v1/categories        GET list
/api/v1/workshops         GET upcoming sessions
/api/v1/cart              POST add, DELETE remove, GET state
/api/v1/checkout          POST place order
/api/v1/coupons/validate  POST validate code
/api/v1/contact           POST submit form
/api/v1/blog              GET posts, GET by slug
/api/v1/testimonials      GET list
/api/v1/faq               GET list
/api/v1/admin/*           Admin endpoints (auth required)
```

---

## Database

### PostgreSQL (via Supabase or self-hosted)
- Full schema in DATA_MODELS.md
- Supabase gives: hosted Postgres + auth + storage + realtime

### ORM: Drizzle ORM
- Type-safe, Bun-compatible
- Lightweight vs Prisma
- Great migration tooling

---

## Payments

### Primary: Tranzila or Cardcom
- Israeli payment gateways supporting credit cards in ILS
- Cardcom supports Bit integration
- PCI-compliant hosted payment pages (iframe or redirect)

### Bit (ביט)
- Israeli mobile payment — via Cardcom or direct Bit Business API
- Show as radio option at checkout

### Installments
- Implemented via payment gateway (Tranzila/Cardcom handle credit splitting)
- 1, 2, or 3 installments

---

## Email

### Transactional: Resend or SendGrid
- Order confirmation emails
- Tax invoice (PDF attachment via pdf-lib)
- Contact form notifications to Limor

### Templates: React Email
- Hebrew RTL email templates
- Order confirmation
- Workshop registration confirmation

---

## File Storage / Media

### Supabase Storage or Cloudflare R2
- Product images
- Gallery photos
- Blog post images
- Stylist photos

### Image Optimization
- Next.js `<Image>` component
- WebP conversion
- Responsive sizes

---

## Admin Panel

### Option A: Custom admin (Next.js)
- Simple dashboard for Limor
- Manage: products, blog posts, workshop sessions, testimonials, orders
- Auth via Supabase Auth (email + password)

### Option B: Payload CMS
- Headless CMS with admin UI out of the box
- TypeScript-native, Bun-compatible
- Built-in media management

**Recommendation: Custom admin** — simpler, full control, Limor's needs are straightforward

---

## Hosting / Infrastructure

| Service | Purpose |
|---|---|
| **Vercel** | Next.js frontend (automatic SSL, CDN, preview deploys) |
| **Railway or Render** | Hono/Bun backend API |
| **Supabase** | PostgreSQL database + Auth + Storage |
| **Cloudflare** | DNS, DDoS protection, CDN edge |
| **GitHub** | Version control, CI/CD |

---

## Dev Tooling

| Tool | Purpose |
|---|---|
| TypeScript | End-to-end type safety |
| Bun | Runtime + package manager |
| ESLint + Prettier | Code quality |
| Vitest | Unit tests |
| Playwright | E2E tests |
| Drizzle Kit | DB migrations |

---

## SEO

- Next.js Metadata API — per-page title/description
- Open Graph tags — for Facebook/WhatsApp sharing
- Structured data (JSON-LD) — LocalBusiness schema
- Hebrew sitemap.xml
- robots.txt
- Fast load times (Core Web Vitals)

---

## Analytics

- **Google Analytics 4** — traffic, conversions
- **Meta Pixel** — Facebook/Instagram ads retargeting

---

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatible (Hebrew)
- Skip to content link
- ALT text on all images
- High contrast support
- Accessible modals and accordions

---

## Environment Variables Needed

```env
# Database
DATABASE_URL=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payment Gateway (Cardcom / Tranzila)
PAYMENT_TERMINAL_ID=
PAYMENT_API_KEY=

# Email
RESEND_API_KEY=

# Admin
ADMIN_JWT_SECRET=

# App
NEXT_PUBLIC_SITE_URL=https://www.50instyle.co.il
```

---

## Project Phases

### Phase 1: Foundation
- [ ] Next.js + Tailwind setup with RTL
- [ ] Database schema + migrations
- [ ] Hono API server
- [ ] Products + categories data seeded
- [ ] Product listing pages
- [ ] Product detail pages

### Phase 2: E-Commerce Core
- [ ] Cart (context + API)
- [ ] Checkout form
- [ ] Payment gateway integration (credit card)
- [ ] Bit payment option
- [ ] Installments selection
- [ ] Order confirmation email

### Phase 3: Content Pages
- [ ] Homepage
- [ ] About page
- [ ] FAQ with accordion
- [ ] Testimonials page
- [ ] Contact form + submission storage
- [ ] Blog (list + post pages)
- [ ] Gallery

### Phase 4: Workshops
- [ ] Workshop sessions (upcoming dates)
- [ ] Workshop registration flow
- [ ] Coupon system

### Phase 5: Admin
- [ ] Admin auth
- [ ] Products CRUD
- [ ] Blog CRUD
- [ ] Orders list
- [ ] Workshop sessions management
- [ ] Testimonials management
- [ ] Contact submissions inbox

### Phase 6: Polish
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Mobile QA (RTL, all screen sizes)
- [ ] Hebrew email templates
