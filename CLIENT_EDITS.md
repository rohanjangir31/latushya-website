# Latushya — Client Editing Guide

This guide explains how to edit your website's content without knowing how to code. All of your business information is stored in simple files inside the `src/data/` folder.

> **Important:** Never edit files inside the `src/components/` folder. Only edit the files listed below.

---

## 1. How to Change Contact Information
**File to edit:** `src/data/companyInfo.js`

Open the file and find the contact section. Replace the `null` values with your real details:
```javascript
// BEFORE
phone: null,
email: null,
address: null,

// AFTER
phone: '+91 98765 43210',
email: 'hello@latushya.com',
address: 'No. 42, 2nd Floor, 27th Main, HSR Layout, Bangalore - 560102',
```
*Note: As soon as you add these, the website will automatically remove the "Coming soon" text and display your real contact details.*

---

## 2. How to Change the WhatsApp Number
**File to edit:** `src/data/companyInfo.js`

To activate the floating WhatsApp button and the main "Free Consultation" buttons, add your WhatsApp number **without spaces or the plus sign (+)**:
```javascript
whatsapp: '919876543210', // 91 is for India, followed by your 10 digit number
```

---

## 3. How to Change Images
Images on the website fall into two categories:

### A. General Website Images (Hero, About, Statistics)
These are located inside the specific component files if they are static backgrounds.
* **Hero Image:** `src/components/Hero.jsx` (Look for `https://images.unsplash.com...`)
* **About Images:** `src/components/About.jsx`
* **Statistics Background:** `src/components/Statistics.jsx`
* **Before & After Images:** `src/components/BeforeAfter.jsx` (Look for `BEFORE_AFTER_PROJECTS` at the bottom of the file).

### B. Portfolio & Gallery Images
These are managed entirely via the data files. See Sections 5 and 6 below.

**How to use your own photos:**
1. Save your photos as `.jpg` or `.webp` files (keep them under 500KB for fast loading).
2. Create a folder named `images` inside the `public/` folder.
3. Move your photos there (e.g., `public/images/wardrobe1.jpg`).
4. In your data files, change the image link to `'/images/wardrobe1.jpg'`.

---

## 4. How to Change Services
**File to edit:** `src/data/services.js`

You will see a list of services. To edit one, simply change the `title` or `description`:
```javascript
{
  id: 1,
  icon: 'Layers',
  title: 'Modular Wardrobes',
  description: 'Your custom description goes here.',
  image: '/images/services/modular.jpg',
}
```

---

## 5. How to Change Projects (Portfolio)
**File to edit:** `src/data/projects.js`

To add a real project to your portfolio:
1. Find a project block.
2. Change `"PROJECT — Coming Soon"` to the real project name.
3. Add the real location, wardrobe type, and description.
4. **Crucial Step:** Change `isPlaceholder: true` to `isPlaceholder: false`.
5. Update the `image` link to your real project photo.

---

## 6. How to Change Reviews
**File to edit:** `src/data/reviews.js`

The Testimonials section currently shows a "Reviews Coming Soon" card. To add real reviews:
1. Copy the template provided in the file.
2. Fill in the customer's name, review text, and star rating.
3. Change `isPlaceholder: false`.
4. As soon as you save this file with a real review, the "Coming Soon" card will disappear and your real reviews will show.

---

## 7. How to Change the Logo / Favicon
* **Favicon (the small icon in the browser tab):** Replace `public/favicon.svg` with your own SVG logo.
* **Main Website Name:** Open `src/data/companyInfo.js` and edit `name: 'LATUSHYA'`. The website uses a beautiful typography-based text logo. If you want to use an image logo instead, you will need a developer to modify `src/components/Navbar.jsx` and `src/components/Footer.jsx`.

---

## 8. How to Change SEO Content
**Files to edit:** `src/data/companyInfo.js` AND `index.html`

* **In `companyInfo.js`:** Update `metaDescription`.
* **In `index.html`:** Look inside the `<head>` tag. You can update the `<title>`, `<meta name="description">`, `<meta name="keywords">`, and the Open Graph (`og:`) tags used when sharing your website on WhatsApp/Facebook.
