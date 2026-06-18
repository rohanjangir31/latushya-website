# Latushya — Deployment & Content Guide

> **For beginners.** Follow each section step by step.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Running Locally](#2-running-locally)
3. [Deploying on Vercel](#3-deploying-on-vercel)
4. [How to Update Contact Information](#4-how-to-update-contact-information)
5. [How to Update Services](#5-how-to-update-services)
6. [How to Add Real Project Photos](#6-how-to-add-real-project-photos)
7. [How to Add Customer Reviews](#7-how-to-add-customer-reviews)
8. [How to Update Business Statistics](#8-how-to-update-business-statistics)
9. [How to Update the Gallery](#9-how-to-update-the-gallery)
10. [File Structure Reference](#10-file-structure-reference)
11. [After Deployment Checklist](#11-after-deployment-checklist)

---

## 1. Project Overview

| Detail | Value |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Hosting | Vercel (recommended) |
| Node version | 18+ |

**All business content** lives inside `src/data/`. You never need to edit component files to update text, photos, or reviews.

```
src/data/
├── companyInfo.js   ← Phone, email, address, social links
├── services.js      ← Wardrobe service types
├── projects.js      ← Portfolio + recent projects
├── reviews.js       ← Customer testimonials
└── content.js       ← Imports everything above (don't edit this)
```

---

## 2. Running Locally

### Requirements
- [Node.js 18+](https://nodejs.org/) installed on your computer
- A terminal (Command Prompt, PowerShell, or Terminal on Mac)

### Steps

```bash
# 1. Go into the project folder
cd C:\Users\jangi\.gemini\antigravity\scratch\latushya

# 2. Install dependencies (only needed once)
npm install

# 3. Start the local preview server
npm run dev
```

Open your browser at **http://localhost:5173** — the site is live locally.

> **Hot reload:** Any file you save will instantly update in the browser. No need to restart.

### Stop the server
Press `Ctrl + C` in the terminal.

---

## 3. Deploying on Vercel

### First-time deployment

**Step 1 — Push your code to GitHub**

If you haven't already:
```bash
# Inside the project folder:
git init
git add .
git commit -m "Initial commit — Latushya website"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/latushya-website.git
git push -u origin main
```

**Step 2 — Connect to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign up / log in with GitHub
2. Click **"Add New Project"**
3. Select your `latushya-website` repository
4. Vercel auto-detects Vite — **no settings to change**
5. Click **"Deploy"**

Your site will be live in ~60 seconds at a URL like `https://latushya-website.vercel.app`.

**Step 3 — Add your custom domain** *(optional)*

1. In Vercel Dashboard → your project → **Domains**
2. Add `latushya.com`
3. Follow the DNS instructions Vercel provides
4. SSL certificate is automatic

---

### Updating the site after deployment

Every time you push to GitHub, Vercel rebuilds and redeploys automatically.

```bash
# After making any change to the code:
git add .
git commit -m "Updated contact information"
git push
```

Vercel will deploy the new version in ~60 seconds.

---

## 4. How to Update Contact Information

**File to edit:** `src/data/companyInfo.js`

Open the file and replace `null` values with real information:

```js
// BEFORE (placeholder)
phone:     null,
whatsapp:  null,
email:     null,
address:   null,

// AFTER (your real details)
phone:     '+91 98765 43210',
whatsapp:  '919876543210',       // no + or spaces
email:     'hello@latushya.com',
address:   'No. 42, 2nd Floor, HSR Layout, Bangalore - 560102',
```

> **WhatsApp number format:** Country code + number, no `+`, no spaces.
> Example: India `91` + `9876543210` = `'919876543210'`

**Save the file → push to GitHub → Vercel redeploys.**

The phone, WhatsApp button, email, and address will automatically appear across the website (Navbar, Contact section, Footer, floating button).

---

## 5. How to Update Services

**File to edit:** `src/data/services.js`

Each service is an object in the array. To add, remove, or edit a service:

```js
// Example: Edit an existing service
{
  id: 1,
  icon: 'Layers',         // Icon name from lucide.dev
  title: 'Modular Wardrobes',
  description: 'Your updated description here.',
  image: 'https://your-image-url.com/photo.jpg',
},
```

**To remove a service:** Delete its `{ ... }` block entirely.

**To add a new service:** Copy an existing block, change the `id`, and fill in your details.

Available icons: Visit [lucide.dev](https://lucide.dev) to browse icon names.

---

## 6. How to Add Real Project Photos

**File to edit:** `src/data/projects.js`

### Option A — Use a hosted image URL
Best for images hosted on Google Drive, Dropbox, or any image host.

```js
// Replace placeholder with real project:
{
  id: 1,
  category: 'Sliding Wardrobes',
  title: 'Luxury Sliding Wardrobe',           // Real project name
  location: 'Whitefield, Bangalore',           // Real location
  wardrobeType: 'Sliding Wardrobe',
  materials: 'Häfele Hardware + Century Ply',  // Real materials
  duration: '12 Days',                         // Real duration
  description: 'A 10-foot floor-to-ceiling sliding wardrobe with frosted glass shutters.',
  image: 'https://your-image-host.com/project1.jpg',
  isPlaceholder: false,    // ← Change this to false
  size: 'large',           // 'large' = full width, 'medium' = half width
},
```

### Option B — Use a local image file
1. Copy your photo into `public/images/projects/` (create this folder)
2. Name it something descriptive: `whitefield-sliding-wardrobe.jpg`
3. Set the image path to: `'/images/projects/whitefield-sliding-wardrobe.jpg'`

```js
image: '/images/projects/whitefield-sliding-wardrobe.jpg',
```

### Photo guidelines
- Minimum width: **800px**
- Format: **JPG** (recommended) or WebP
- File size: Keep under **500KB** per photo for fast loading
- Compress photos at [squoosh.app](https://squoosh.app) before uploading

---

## 7. How to Add Customer Reviews

**File to edit:** `src/data/reviews.js`

When you have a real customer review, add it to the array:

```js
const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',                  // Customer's real name
    location: 'Whitefield, Bangalore',      // Where they live
    rating: 5,                             // Star rating (1–5)
    text: 'Latushya transformed my bedroom wardrobe completely. The sliding doors are butter smooth and the internal layout is exactly what I needed.',
    avatar: null,                          // Leave null, or add photo URL
    project: 'Sliding Wardrobe',           // Type of wardrobe they got
    isPlaceholder: false,
  },
];
```

> **Customer photo (avatar):** You can leave this as `null` — the website will show the customer's initial in a gold circle instead.
>
> If you have a real photo, upload it to your website or use a direct image URL.

**Save → push → deploy.** The testimonials section will automatically switch from the "Coming Soon" placeholder to the real review carousel.

---

## 8. How to Update Business Statistics

Currently, the website shows a **"Credibility Band"** with honest claims (Custom Designed, Pan Bangalore, Free Consultation) instead of fabricated numbers.

When you have real, verified statistics, update them in `src/components/Statistics.jsx`:

```js
// Find this array in Statistics.jsx and update values:
const CREDIBILITY_ITEMS = [
  { Icon: Shield, value: '150+',        label: 'Wardrobes Delivered', sub: 'And counting' },
  { Icon: Wrench, value: 'Häfele · Hettich', label: 'Hardware Brands', sub: 'German engineering' },
  { Icon: MapPin, value: 'Pan Bangalore', label: 'Service Area', sub: 'All neighbourhoods' },
  { Icon: Clock,  value: 'Free',         label: 'First Consultation', sub: 'No obligations' },
];
```

> **Only publish numbers you can verify.** Don't invent statistics.

---

## 9. How to Update the Gallery

**File to edit:** `src/data/content.js` — find the `GALLERY_IMAGES` array.

Replace placeholder entries with real wardrobe photos:

```js
export const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/images/gallery/project-1.jpg',       // Your real photo path
    alt: 'Sliding wardrobe Whitefield Bangalore', // Descriptive alt text (good for SEO)
    category: 'Sliding Wardrobes',
    isPlaceholder: false,                        // ← Change to false
  },
  // ... more images
];
```

**Gallery categories** (use exactly these strings):
- `'Modular Wardrobes'`
- `'Walk-In Wardrobes'`
- `'Sliding Wardrobes'`
- `'Hinged Wardrobes'`
- `'Luxury Wardrobes'`
- `'Custom Storage'`

---

## 10. File Structure Reference

```
latushya/
│
├── public/                   ← Static files (served as-is)
│   ├── favicon.svg           ← Browser tab icon
│   ├── robots.txt            ← Search engine instructions
│   ├── sitemap.xml           ← Search engine sitemap
│   └── images/               ← Create this for your photos
│       ├── projects/         ← Project photos
│       └── gallery/          ← Gallery photos
│
├── src/
│   ├── data/                 ← ★ ALL EDITABLE CONTENT LIVES HERE
│   │   ├── companyInfo.js    ← Phone, email, address, social
│   │   ├── services.js       ← Service types
│   │   ├── projects.js       ← Portfolio + recent projects
│   │   ├── reviews.js        ← Customer testimonials
│   │   └── content.js        ← Master index (don't edit)
│   │
│   ├── components/           ← Website sections (rarely need editing)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── WhyChoose.jsx
│   │   ├── Projects.jsx
│   │   ├── RecentProjects.jsx
│   │   ├── BeforeAfter.jsx
│   │   ├── Materials.jsx
│   │   ├── Process.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Gallery.jsx
│   │   ├── FAQ.jsx
│   │   ├── Contact.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── utils/
│   │   └── animations.jsx    ← Reusable animation components
│   │
│   ├── App.jsx               ← Page structure
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles
│
├── index.html                ← SEO tags, meta, page title
├── vite.config.js            ← Build configuration
├── tailwind.config.js        ← Design tokens (colors, fonts)
├── vercel.json               ← Vercel deployment settings
└── package.json              ← Dependencies
```

---

## 11. After Deployment Checklist

Once your site is live, go through this list:

### Contact & Content
- [ ] Updated `companyInfo.js` with real phone number
- [ ] Updated `companyInfo.js` with real WhatsApp number
- [ ] Updated `companyInfo.js` with real email address
- [ ] Updated `companyInfo.js` with real office address
- [ ] Updated social media URLs (Instagram, Facebook, YouTube)

### Photos
- [ ] Replaced placeholder project photos with real wardrobe photos
- [ ] Updated gallery with real project images
- [ ] Added Before & After photos for at least 2 projects

### Reviews
- [ ] Added at least 3 real customer testimonials to `reviews.js`

### SEO
- [ ] Updated `sitemap.xml` with your real domain (`latushya.com`)
- [ ] Updated canonical URL in `index.html` with real domain
- [ ] Verified Google Search Console ownership (add via Vercel)
- [ ] Tested on [PageSpeed Insights](https://pagespeed.web.dev/) — aim for 85+ on mobile

### Testing
- [ ] Tested on iPhone (Safari)
- [ ] Tested on Android (Chrome)
- [ ] Tested on desktop Chrome, Firefox, Safari
- [ ] Confirmed all WhatsApp/Call buttons open correctly
- [ ] Confirmed contact form submits correctly
- [ ] Tested all gallery images load correctly

### Business
- [ ] Google My Business listing created and linked
- [ ] Instagram bio updated with website URL
- [ ] WhatsApp Business profile updated

---

*Built with React + Vite + Tailwind CSS + Framer Motion.*
*Deployed on Vercel. Last updated: June 2026.*
