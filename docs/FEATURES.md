# Features & Functionality

## Core Features

---

## 1. E-Commerce / Shopping Cart

### Cart
- Persistent cart across pages (session-based)
- Cart icon in header with live item count
- Slide-out cart panel (click cart icon):
  - Shows "Empty cart" message when nothing is added
  - Lists items with name, quantity controls (−/+), and price
  - Total price
  - "Continue Shopping" link (closes panel)
  - "Proceed to Purchase" link → /checkout/

### Checkout Flow
1. **Cart** (slide-out panel or dedicated page)
2. **Checkout Page** (/checkout/)
   - Coupon code field (expandable link)
   - Billing details form (see below)
   - Order summary table
   - Payment selection
   - Terms acceptance
   - Secure payment button

### Checkout Form Fields
| Field | Hebrew | Required |
|---|---|---|
| First Name | שם פרטי | ✅ |
| Last Name | שם משפחה | ✅ |
| Street Address | כתובת רחוב | ✅ |
| City | עיר | ✅ |
| Phone | טלפון | ✅ |
| Email | כתובת אימייל | ✅ |
| Order Notes | הערות להזמנה | Optional |

### Payment Methods
- **Credit card** (default selected)
- **Bit** (Israeli mobile payment app)
- **Installments selector:** 1 / 2 / 3 payments (dropdown)

### Coupon System
- Coupon code field (hidden, revealed on link click)
- Discounts applied to order total

### Order Confirmation
- Email sent immediately on successful order
- Tax invoice within 2 business days (per Terms)

---

## 2. Product Pages

Each product page has:
- H1 title (product name)
- Breadcrumb navigation
- Product description (rich text, multiple paragraphs)
- Price display (₪)
- **"לרכישה" (Purchase) button** — adds to cart
- **"יש לכם שאלה?" (Have a question?) button** — opens contact/WhatsApp
- Social sharing: Facebook + WhatsApp share links
- Stylist bio photo + image

---

## 3. Contact Form (Multiple Variants)

### Main Contact Form (/יצירת-קשר/)
| Field | Hebrew | Type | Required |
|---|---|---|---|
| First Name | שם פרטי | text | ✅ |
| Last Name | שם משפחה | text | ✅ |
| Email | דואר אלקטרוני | email | ✅ |
| Phone | טלפון | text | ✅ |
| Date of Birth | תאריך לידה | text | Optional |
| Interested In | מתעניינת בשירות | select | ✅ |
| Message | תוכן ההודעה | textarea | Optional |
| Submit | שליחה | button | — |

**"Interested In" dropdown options:**
- מתעניינת בשירות.. (default)
- רכישת מוצר — Product purchase
- סדנת סטיילינג חוויתית — Experiential styling workshop
- סטיילינג בארון — Wardrobe styling
- סטיילינג בקניות — Shopping styling
- סטיילינג משולב — Combined styling
- סטיילינג לכלות — Bridal styling
- סטיילינג לעסקים — Business styling
- סדנה למסיבת רווקות — Bachelorette workshop
- סדנת סטיילינג לעסקים — Business styling workshop
- שירות אחר... — Other service

### FAQ Contact Form (/שאלות-תשובות/)
| Field | Type |
|---|---|
| שם מלא (Full Name) | text |
| דואר אלקטרוני (Email) | text |
| טלפון (Phone) | text |
| תוכן ההודעה (Message) | textarea |
| שליחה (Send) | button |

---

## 4. FAQ / Accordion System

- 13-14 clickable accordion tabs
- One tab open at a time (or multiple?)
- Questions:
  1. האם אופנה זה סטיילינג? (Is fashion the same as styling?)
  2. למה אני צריכה סטייליסטית אישית (Why do I need a personal stylist?)
  3. יש לי מבנה גוף מיוחד... (I have a special body shape...)
  4. מהו בעצם ייעוץ סטיילינג? (What is styling consultation?)
  5. האם ייעוץ סטיילינג אישי הוא לכל החיים? (Is personal styling for life?)
  6. האם יש קשר בין סגנון לבוש ולרגשות? (Connection between style and emotions?)
  7. כיצד מתבצע ייעוץ הסטילינג? (How is styling conducted?)
  8. מי מגיע לשירותי הסטיילינג? (Who uses styling services?)
  9. למה אני צריכה סטייליסטית בקניית בגדים? (Why need a stylist when shopping?)
  10. איך בוחרים סטייליסטית? (How to choose a stylist?)
  11. מה לשאול את הסטייליסטית? (What to ask the stylist?)
  12. מהו פרק הזמן לייעוץ סטיילינג? (What is the time period?)
  13. עלויות שירותי סטיילינג אישי (Costs of personal styling services)
  14. מה קורה לאחר שירות הסטיילינג? (What happens after?)

---

## 5. Blog

- Content blog at /בלוג/
- Topics: styling tips, color psychology, body types, etc.
- WordPress-style posts (to be rebuilt as CMS)

---

## 6. Testimonials Page (/המלצות/)

- Display of client reviews/testimonials
- Slider/carousel testimonials also appear on workshop pages

---

## 7. Upcoming Workshops (/סדנאות-סטיילינג/סדנאות-קרובות/)

- Displays scheduled group workshop dates
- Currently shows empty (no upcoming workshops at time of audit)
- Registration for workshops via phone/WhatsApp (not online booking)

---

## 8. Gallery (/לימור-בכר-סטייליסטית-אישית-סטיילינג-ז/)

- Photo gallery of stylist and client work

---

## 9. Gift Vouchers (/שוברי-מתנה/)

- Gift voucher products for different service types
- Purchasable via same cart/checkout flow
- Types: Birthday, Anniversary, Partner, Shopping, Perfect, Wardrobe, Friend, Perfect Day

---

## 10. Workshop Host Home Program

- **Host Home** (/סדנאות-סטיילינג/סדנת-סטיילינג-בית-מארח-...)
  - Special program where a client hosts a workshop at their home
  - Sub-page with host details
  - Registration via contact/phone

---

## 11. Social Sharing

On every product page:
- Facebook share link
- WhatsApp share link
(Section labeled "שיתוף:" / Sharing:)

---

## 12. Accessibility

- Dedicated accessibility menu (ALT+A keyboard shortcut)
- Skip to content link at page top
- Accessibility statement page (/הצהרת-נגישות/)
- RTL (right-to-left) layout for Hebrew

---

## 13. Header Persistent Elements

- Logo (links to homepage)
- Cart icon with live count
- Main navigation (8 items)
- Mobile hamburger menu (implied by "widescreen" text in snapshots)

---

## 14. Footer Persistent Elements

- Footer navigation (4 links)
- Phone: 054-5458278 (clickable)
- Email: info@50instyle.co.il (clickable)
- Social icons: Facebook, WhatsApp, Instagram, YouTube
- Copyright: © 2019 לימור בכר – 50instyle
- Legal links: Terms | Privacy Policy | Sitemap
- Build credit: Design4Site + Studio Giotto

---

## 15. Business Logic / Rules

### Cancellation Policy (from Terms)
- **Company-initiated cancellation:** Customer gets alternative date or full refund
- **Customer-initiated — Group Workshops:**
  - Written notice required (contact form, phone, or email)
  - Within 14 days of booking AND >72 hours before workshop: full refund or alternative
  - After 14 days OR <72 hours before: full charge (no refund)
- **Customer-initiated — Product cancellation:** Per supplier's terms

### Service Eligibility
- Credit card must be from an Israeli issuer
- Credit card company approval required
- User must be 18+ to purchase
- All mandatory fields must be filled at registration/checkout

### Order Confirmation
- Immediate email on order
- Tax invoice within 2 business days
