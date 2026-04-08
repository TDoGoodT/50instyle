# 50inStyle — Personal Styling Platform

A full-stack rewrite of [50instyle.co.il](https://www.50instyle.co.il/) — the personal and business styling website of Limor Bachar.

## Project Overview

50inStyle is a personal stylist service platform for women. The stylist (Limor Bachar) offers a range of hands-on and online styling services, workshops, and gift vouchers. The site combines a **content/marketing site** with a **WooCommerce-style e-commerce system** for purchasing services.

---

## Tech Stack (Rewrite Target)

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React + Tailwind CSS   |
| Backend    | Bun + Hono             |
| Database   | SQLite (via Drizzle ORM) |
| Auth       | JWT / session-based    |
| Payments   | Stripe / iCredit       |
| Language   | TypeScript             |
| RTL        | Full Hebrew RTL support |

---

## Site Structure & Pages

### Public Pages

| Route             | Hebrew Name        | Description                                      |
|-------------------|--------------------|--------------------------------------------------|
| `/`               | דף הבית             | Homepage — hero, service cards, about teaser, lead form |
| `/about`          | מי אני              | About the stylist — personal story, philosophy   |
| `/services`       | שירותי סטיילינג      | All services listing page                        |
| `/workshops`      | סדנאות סטיילינג      | Workshops listing                                |
| `/gift-vouchers`  | שוברי מתנה           | Gift voucher products                            |
| `/blog`           | בלוג                | Blog with category filtering                     |
| `/faq`            | שאלות תשובות         | FAQ page                                         |
| `/testimonials`   | המלצות              | Client testimonials / reviews carousel           |
| `/contact`        | דברי איתי           | Contact form                                     |
| `/product/:slug`  | מוצר                | Individual product/service page with purchase CTA |
| `/terms`          | תקנון               | Terms of service                                 |
| `/privacy`        | מדיניות פרטיות       | Privacy policy                                   |
| `/sitemap`        | מפת אתר             | Sitemap                                          |

### E-Commerce Pages

| Route              | Description                        |
|--------------------|------------------------------------|
| `/cart`            | Shopping cart (slide-out drawer)   |
| `/checkout`        | Checkout flow                      |
| `/order-complete`  | Order confirmation                 |

---

## Data Models

### Product / Service

```ts
type Product = {
  id: string;
  slug: string;
  name: string;           // Hebrew
  category: ProductCategory;
  description: string;    // Rich text, Hebrew
  price: number;          // ILS (₪)
  duration?: string;      // e.g. "3 sessions, up to 45 min"
  validity?: string;      // e.g. "3 months from purchase"
  image: string;
  shareEnabled: boolean;
  relatedProducts: string[]; // product IDs
};

type ProductCategory =
  | "personal-styling"     // סטיילינג אישי
  | "online-styling"       // סטיילינג מקוון
  | "business-styling"     // סטיילינג עסקי
  | "workshop"             // סדנאות
  | "gift-voucher";        // שוברי מתנה
```

### Services Catalog (from site)

#### Personal Styling Services (שירותי סטיילינג)

| Slug                  | Name (Hebrew)           | Price   |
|-----------------------|-------------------------|---------|
| `online-styling`      | סטיילינג מקוון (On Line) | ₪450    |
| `style-profile`       | פרופיל סטיילינג          | —       |
| `combined-styling`    | סטיילינג משולב           | —       |
| `shopping-styling`    | סטיילינג בקניות          | —       |
| `wardrobe-styling`    | סטיילינג בארון           | —       |
| `styling-with-friend` | סטיילינג עם חברה         | —       |
| `im-perfect`          | אני מושלמת!              | —       |
| `business-styling`    | סטיילינג עסקי            | —       |
| `bridal-styling`      | סטיילינג לכלות           | —       |

#### Workshops (סדנאות סטיילינג)

| Slug                  | Name (Hebrew)              |
|-----------------------|----------------------------|
| `self-love-workshop`  | להתלבש על החיים            |
| `bachelorette-workshop` | סדנה למסיבת רווקות        |
| `business-workshop`   | סדנה לעסקים                |
| `custom-workshop`     | סדנה בהתאמה אישית          |

#### Gift Vouchers (שוברי מתנה)

| Slug                      | Name (Hebrew)                 | Price   |
|---------------------------|-------------------------------|---------|
| `birthday-voucher`        | שובר יום הולדת                | ₪850    |
| `anniversary-voucher`     | שובר יום נישואין              | —       |
| `partner-voucher`         | שובר לבת הזוג                 | —       |
| `shopping-voucher`        | שובר סטיילינג בקניות           | —       |
| `perfect-styling-voucher` | סטיילינג מושלם                | —       |
| `wardrobe-voucher`        | שובר סטיילנג בארון             | —       |
| `friend-styling-voucher`  | סטיילינג עם חברה               | —       |
| `perfect-day-voucher`     | יום מושלם!                    | —       |

---

### Lead / Contact Submission

```ts
type LeadForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  birthDate?: string;
  interestedIn: ServiceInterest;
  message?: string;
};

type ServiceInterest =
  | "product-purchase"
  | "experiential-workshop"
  | "wardrobe-styling"
  | "shopping-styling"
  | "combined-styling"
  | "bridal-styling"
  | "business-styling"
  | "bachelorette-workshop"
  | "business-workshop"
  | "other";
```

---

### Blog Post

```ts
type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;       // Rich text / HTML
  excerpt: string;
  category: BlogCategory;
  publishedAt: Date;
  image?: string;
  author: string;        // "לימור בכר"
};

type BlogCategory =
  | "tips"               // טיפים
  | "services"           // שירותים
  | "holidays"           // חגים
  | "press"              // בתקשורת
  | "trends";            // טרנדים
```

---

### Testimonial

```ts
type Testimonial = {
  id: string;
  authorName: string;
  authorImage?: string;
  quote: string;
  highlight?: string;    // Pull-quote / bolded excerpt
};
```

---

### Order / Cart

```ts
type CartItem = {
  productId: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: "pending" | "paid" | "cancelled";
  createdAt: Date;
  paymentRef?: string;   // Payment gateway reference
};
```

---

## Key Features

### 1. Product / Service Catalog
- Listing pages per category (personal styling, workshops, gift vouchers)
- Individual product pages with:
  - Description, price, session count, duration, validity
  - "Add to cart" / "Purchase" CTA
  - "Ask a question" CTA (contact)
  - Social share (Facebook, WhatsApp)
  - Cross-sell links to related products

### 2. Shopping Cart
- Slide-out cart drawer (visible at top of every page, shows item count)
- Add/remove items
- Proceed to checkout

### 3. Checkout & Payment
- Collect customer details
- Payment gateway integration (Israeli market — iCredit or Cardcom)
- Order confirmation page

### 4. Lead Capture Forms
- **Homepage lead form**: name, last name, email, phone, city → receive tips and promotions
- **Contact page form**: full form with service interest dropdown + message

### 5. Blog
- List view with category filter tabs (Tips / Services / Holidays / Press / Trends)
- Individual article pages
- "Video tips" sub-section

### 6. Testimonials / Reviews
- Carousel/slider of client reviews with name, photo, quote, highlighted pull-quote
- Pagination dots

### 7. FAQ Page
- Static Q&A content

### 8. Navigation
- Main nav: מי אני | שירותי סטיילינג | סדנאות סטיילינג | שוברי מתנה | בלוג | שאלות תשובות | המלצות | דברי איתי
- Footer nav: סטיילינג | סטיילינג אישי | סדנאות סטיילינג | סטייליסטית אישית
- Cart icon with item count badge

### 9. Contact & Social
- Phone: 054-5458278
- Email: info@50instyle.co.il
- WhatsApp: direct link
- Facebook, Instagram, YouTube

### 10. Accessibility
- Accessibility menu (ALT+A toggle)
- RTL (right-to-left) layout throughout
- Hebrew language

---

## Admin / CMS Requirements

The original site uses WordPress + WooCommerce. The rewrite should have an admin panel for:

- [ ] Product / service CRUD (name, description, price, images, category)
- [ ] Blog post editor (rich text, categories, publish/draft)
- [ ] Testimonials management (add/edit/delete/reorder)
- [ ] FAQ management (add/edit/delete/reorder)
- [ ] View and export leads / contact submissions
- [ ] View orders and payment status
- [ ] Newsletter/lead list export

---

## E-Commerce Flow

```
Product Page → [Purchase Button]
    → Add to Cart (slide-out drawer updates)
    → Cart Page → [Checkout]
    → Checkout Form (name, email, phone, billing)
    → Payment Gateway (iCredit / Cardcom)
    → Order Confirmation Page
    → Email confirmation to customer
```

---

## Newsletter / Lead Flow

```
Lead Form (homepage or contact page)
    → POST /api/leads
    → Saved to DB
    → Admin notification email
    → Auto-reply or welcome email to user
```

---

## Localization

- **Language**: Hebrew (he-IL)
- **Direction**: RTL
- **Currency**: ILS (₪ symbol, no cents)
- **Date format**: DD/MM/YYYY

---

## SEO Notes

- Each product page has unique title, description
- Blog posts are individually indexed
- Sitemap page exists
- Image alt texts in Hebrew

---

## Directory Structure (Planned)

```
50instyle/
├── apps/
│   ├── web/               # React frontend
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── package.json
│   └── admin/             # Admin dashboard
├── packages/
│   └── api/               # Hono backend
│       ├── src/
│       │   ├── routes/
│       │   ├── models/
│       │   └── db/
│       └── package.json
├── docs/                  # Additional documentation
└── README.md
```

---

## Milestones

- [ ] Phase 1: Documentation & design system
- [ ] Phase 2: Backend API (products, leads, orders, blog, testimonials)
- [ ] Phase 3: Frontend — public pages (homepage, services, workshops, gift vouchers)
- [ ] Phase 4: Frontend — e-commerce (cart, checkout, confirmation)
- [ ] Phase 5: Frontend — blog, FAQ, testimonials, contact
- [ ] Phase 6: Admin panel
- [ ] Phase 7: Payment gateway integration
- [ ] Phase 8: Email notifications
- [ ] Phase 9: SEO, accessibility, performance
- [ ] Phase 10: Deploy & go live
