# Database Schema Design

## Overview

The platform needs to support:
- Products (services + gift vouchers)
- Orders / purchases
- Customers
- Blog posts
- Testimonials
- Workshop sessions (group events with dates/seats)
- FAQ content
- Coupon codes
- Contact form submissions

---

## Entities & Tables

---

### users
Customers who have purchased or registered.

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  phone         TEXT,
  date_of_birth DATE,
  city          TEXT,
  street        TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

### product_categories
Groups of products (Styling Services, Workshops, Gift Vouchers, etc.)

```sql
CREATE TABLE product_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE,       -- e.g. 'styling-services'
  name_he     TEXT NOT NULL,              -- e.g. 'שירותי סטיילינג'
  name_en     TEXT,
  description TEXT,
  sort_order  INT DEFAULT 0,
  parent_id   UUID REFERENCES product_categories(id)
);
```

---

### products
All purchasable services and vouchers.

```sql
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT NOT NULL UNIQUE,        -- URL slug
  category_id       UUID REFERENCES product_categories(id),
  name_he           TEXT NOT NULL,               -- Hebrew name
  name_en           TEXT,                        -- English name (optional)
  description_he    TEXT,                        -- Full rich-text description
  price             DECIMAL(10,2) NOT NULL,
  
  -- Session details
  duration_hours    DECIMAL(4,1),               -- e.g. 4.0 hours
  num_sessions      INT,                         -- e.g. 3 sessions
  session_validity_days INT,                     -- e.g. 90 days (online)
  
  -- Location type
  location_type     TEXT CHECK (location_type IN (
                      'client_home', 'mall', 'remote', 'salon',
                      'workplace', 'venue', 'group'
                    )),
  location_note_he  TEXT,                        -- e.g. "בית הלקוחה"
  
  -- Installments
  max_installments  INT DEFAULT 3,
  
  -- Flags
  is_gift_voucher   BOOLEAN DEFAULT FALSE,
  is_workshop       BOOLEAN DEFAULT FALSE,       -- group session product
  is_active         BOOLEAN DEFAULT TRUE,
  
  -- SEO
  meta_title_he     TEXT,
  meta_desc_he      TEXT,
  
  sort_order        INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
```

---

### product_features
Bullet-list items included in each service (the "what's included" list).

```sql
CREATE TABLE product_features (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  feature_he  TEXT NOT NULL,          -- e.g. "אבחון מבנה גוף"
  feature_en  TEXT,
  sort_order  INT DEFAULT 0
);
```

---

### workshop_sessions
Scheduled group workshop instances (for "upcoming workshops").

```sql
CREATE TABLE workshop_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id),
  session_date    DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME,
  location_name   TEXT,               -- venue name
  location_address TEXT,
  max_seats       INT DEFAULT 15,
  seats_taken     INT DEFAULT 0,
  price           DECIMAL(10,2),      -- can override product price
  notes_he        TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### orders
A customer purchase (one or more products).

```sql
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      SERIAL UNIQUE,              -- human-readable #
  user_id           UUID REFERENCES users(id),  -- null = guest checkout
  
  -- Billing snapshot (denormalized for audit trail)
  billing_first_name TEXT NOT NULL,
  billing_last_name  TEXT NOT NULL,
  billing_email      TEXT NOT NULL,
  billing_phone      TEXT NOT NULL,
  billing_city       TEXT,
  billing_street     TEXT,
  
  -- Financials
  subtotal          DECIMAL(10,2) NOT NULL,
  discount_amount   DECIMAL(10,2) DEFAULT 0,
  total             DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_method    TEXT CHECK (payment_method IN ('credit_card', 'bit')),
  num_installments  INT DEFAULT 1,
  coupon_code       TEXT REFERENCES coupons(code),
  
  -- Status
  status            TEXT DEFAULT 'pending' CHECK (status IN (
                      'pending', 'processing', 'paid', 'cancelled', 'refunded'
                    )),
  
  -- Notes
  order_notes       TEXT,
  
  -- Payment provider reference
  payment_ref       TEXT,
  
  -- Timestamps
  terms_accepted    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
```

---

### order_items
Individual line items within an order.

```sql
CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id),
  product_name_he TEXT NOT NULL,      -- snapshot at time of purchase
  quantity        INT NOT NULL DEFAULT 1,
  unit_price      DECIMAL(10,2) NOT NULL,
  total_price     DECIMAL(10,2) NOT NULL,
  
  -- If booking a specific workshop session
  workshop_session_id UUID REFERENCES workshop_sessions(id)
);
```

---

### coupons
Discount coupon codes.

```sql
CREATE TABLE coupons (
  code              TEXT PRIMARY KEY,            -- the coupon code itself
  discount_type     TEXT CHECK (discount_type IN ('fixed', 'percent')),
  discount_value    DECIMAL(10,2) NOT NULL,      -- amount or percent
  max_uses          INT,                         -- null = unlimited
  uses_count        INT DEFAULT 0,
  valid_from        DATE,
  valid_until       DATE,
  min_order_amount  DECIMAL(10,2),
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
```

---

### contact_submissions
All contact form submissions.

```sql
CREATE TABLE contact_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      TEXT NOT NULL,
  last_name       TEXT,
  email           TEXT NOT NULL,
  phone           TEXT,
  date_of_birth   DATE,
  interested_in   TEXT,               -- dropdown value
  message         TEXT,
  source_page     TEXT,               -- which form/page submitted from
  status          TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### blog_posts

```sql
CREATE TABLE blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  title_he      TEXT NOT NULL,
  content_he    TEXT NOT NULL,          -- rich text / markdown
  excerpt_he    TEXT,
  cover_image   TEXT,                   -- URL or storage key
  tags          TEXT[],
  is_published  BOOLEAN DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

### testimonials

```sql
CREATE TABLE testimonials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name     TEXT NOT NULL,
  service_type    TEXT,                 -- which service they used
  quote_he        TEXT NOT NULL,
  photo_url       TEXT,
  rating          INT CHECK (rating BETWEEN 1 AND 5),
  is_published    BOOLEAN DEFAULT TRUE,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### faq_items

```sql
CREATE TABLE faq_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_he   TEXT NOT NULL,
  answer_he     TEXT NOT NULL,          -- rich text
  category      TEXT,                   -- for grouping if needed
  sort_order    INT DEFAULT 0,
  is_published  BOOLEAN DEFAULT TRUE
);
```

---

### gallery_items

```sql
CREATE TABLE gallery_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT NOT NULL,
  caption_he  TEXT,
  alt_he      TEXT,
  sort_order  INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Relationships Diagram

```
users ──────────── orders ──────── order_items ──── products ──── product_categories
                     │                                  │
                  coupons                    workshop_sessions
                                                product_features

contact_submissions (standalone)
blog_posts (standalone)
testimonials (standalone)
faq_items (standalone)
gallery_items (standalone)
```

---

## Key Business Rules (encoded in schema)

1. **Orders require terms acceptance** — `terms_accepted BOOLEAN NOT NULL`
2. **Max 3 installments** — validated at app level; stored in order
3. **Workshop seats** — `workshop_sessions.seats_taken` must not exceed `max_seats`
4. **Coupon usage tracking** — `coupons.uses_count` incremented on order completion
5. **Guest checkout** — `orders.user_id` is nullable
6. **Price snapshot** — `order_items.unit_price` captures price at purchase time (not product current price)
7. **Cancellation window** — calculated at app level: 14-day window + 72h before session
