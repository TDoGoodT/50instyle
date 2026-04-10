# 50inStyle

Full-stack rewrite of [50instyle.co.il](https://50instyle.co.il) — a personal styling platform for Limor Bachar, an Israeli personal stylist based in Bat Hefer.

The original site runs on WordPress. This project replaces it with a modern, maintainable stack: Next.js frontend, Hono/Bun API, PostgreSQL — Hebrew/RTL first, Israeli payment methods, and a simple admin for Limor to manage her own content.

---

## What the platform covers

- **E-commerce** — personal styling services, workshops, and gift vouchers purchasable online (₪750–₪3,600)
- **Checkout** — credit card, Bit, installments (1/2/3), coupon codes, order confirmation emails
- **Blog** — content managed by Limor
- **Workshops** — upcoming sessions with seat availability
- **Testimonials, FAQ, Contact** — standard business pages
- **Admin panel** — for Limor to manage products, blog posts, and workshop sessions

See [docs/FEATURES.md](docs/FEATURES.md) for the full feature breakdown and [docs/PAGES.md](docs/PAGES.md) for page-by-page content specs.

---

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14+ (App Router), Tailwind CSS v4, shadcn/ui, Framer Motion |
| Backend | Hono on Bun, RESTful API, JWT auth |
| Database | PostgreSQL via Supabase, Drizzle ORM |
| Payments | Tranzila / Cardcom (Israeli gateways), Bit |
| Forms | React Hook Form + Zod |
| State | React Context (cart), TanStack Query (server state) |

Full details in [docs/TECH_STACK.md](docs/TECH_STACK.md).

---

## Project structure

```
apps/
  web/      # Next.js frontend
  api/      # Hono/Bun backend
docs/       # Product, feature, and architecture documentation
```

---

## Documentation

| Doc | Description |
|---|---|
| [OVERVIEW](docs/OVERVIEW.md) | Business background, site map, target audience |
| [FEATURES](docs/FEATURES.md) | Full feature list — e-commerce, forms, admin |
| [PAGES](docs/PAGES.md) | Page-by-page content and layout specs |
| [PRODUCTS](docs/PRODUCTS.md) | All services, workshops, and gift vouchers with pricing |
| [DATA_MODELS](docs/DATA_MODELS.md) | Database schema |
| [TECH_STACK](docs/TECH_STACK.md) | Architecture decisions and stack rationale |

---

## Getting started

```bash
# Install dependencies
bun install

# Start the API
cd apps/api && bun dev

# Start the frontend
cd apps/web && bun dev
```

Copy `apps/api/.env.example` to `apps/api/.env` and fill in your database and payment credentials.

---

## Contact

**Limor Bachar** — [info@50instyle.co.il](mailto:info@50instyle.co.il) · [Facebook](https://www.facebook.com/pg/LimorPersonalStylist) · [Instagram](https://www.instagram.com/limorstyling/)
