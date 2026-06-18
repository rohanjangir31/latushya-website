# Latushya — Outstanding Placeholders

This document lists every piece of placeholder content currently live on the website. **None of the data currently on the site is fabricated.** Instead, the website uses elegant "Coming Soon" states. 

The business owner must replace the following items with real data prior to public launch.

---

## 1. Contact Information
**Location:** `src/data/companyInfo.js`
* [ ] **Phone Number** (Currently `null` — Shows "Phone coming soon" in Footer)
* [ ] **WhatsApp Number** (Currently `null` — Floating WhatsApp button is hidden)
* [ ] **Email Address** (Currently `null` — Shows "Email coming soon" in Footer)
* [ ] **Office Address** (Currently `null` — Shows "Full address coming soon" in Footer)

## 2. Customer Reviews
**Location:** `src/data/reviews.js`
* [ ] **Testimonials** (Currently empty — Website displays a gold "Reviews Coming Soon" placeholder card). Provide real customer names, locations, ratings, and review text.

## 3. Project Portfolio
**Location:** `src/data/projects.js`
* [ ] **Portfolio Grid Projects:** 6 placeholder projects exist with `isPlaceholder: true`. Provide real Project Names, Locations, Descriptions, and Photos.
* [ ] **Recent Projects:** 3 placeholder projects exist with `isPlaceholder: true`. Provide real Project Names, Durations, Materials Used, and Photos.

## 4. Photography (Image Audit Needs)
**Location:** Various files (see below)
Currently, high-quality Unsplash stock images are being used as visual placeholders. Because wardrobes are a highly visual product, these **must** be replaced with real Latushya project photos to build trust.

* [ ] **Hero Background:** `src/components/Hero.jsx` (Replace Unsplash image with a flagship Latushya project)
* [ ] **About Images (x2):** `src/components/About.jsx` 
* [ ] **Statistics Background:** `src/components/Statistics.jsx`
* [ ] **Before & After Sliders (x2):** `src/components/BeforeAfter.jsx` (Currently showing a "Before & After Coming Soon" placeholder card because `isPlaceholder` is true). Needs real empty-room vs finished-wardrobe photos.
* [ ] **Services Images (x8):** `src/data/services.js` (Currently reusing 4 Unsplash images across 8 services)
* [ ] **Gallery Grid (x6):** `src/data/content.js` > `GALLERY_IMAGES` (Currently reusing Unsplash images)

## 5. Hardware Logos
**Location:** `src/data/content.js` > `MATERIALS`
* [ ] **Brand Logos:** The `logo` property is currently `null` for Häfele, Hettich, Ebco, Century Ply, and Greenply. Download their official transparent PNG/SVG logos, place them in `public/images/logos/`, and link them in the data file.

---

### Instructions for Replacement
To replace these items, please refer to the `CLIENT_EDITS.md` and `DEPLOYMENT.md` files located in the root of this project. They contain step-by-step instructions on how to safely swap out placeholders for your real business data.
