# Latushya Interiors

<div align="center">
  <h3>Luxury Bespoke Wardrobe & Interior Design Portfolio</h3>
  <p>A premium, high-performance portfolio website featuring cinematic scroll animations, micro-interactions, and a custom data-driven architecture.</p>
  <p>
    <a href="https://latushya-website.vercel.app/" target="_blank"><strong>View Live Demo »</strong></a>
  </p>
</div>

---

## ✦ Overview

**Latushya Interiors** is a modern, editorial-style web application built to showcase bespoke interior design and luxury wardrobe installations. Designed with a deep, award-winning dark mode aesthetic, the platform focuses on striking typography, fluid animations, and high-resolution imagery to instantly communicate quality and precision.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite (for lightning-fast HMR and optimized builds)
- **Styling:** Tailwind CSS (utility-first, responsive by design)
- **Animations:** Framer Motion (complex viewport-driven scroll animations and layout transitions)
- **Icons:** Lucide React
- **Deployment:** Vercel (CI/CD integration)

## ✨ Key Features

- **Cinematic Interactivity:** Built using Framer Motion, the site features scroll-triggered reveal animations, parallax image effects, and smooth page transitions.
- **Data-Driven Architecture:** The portfolio and services are populated entirely via centralized data files (`src/data/projects.js` and `src/data/services.js`). This allows for seamless content management without needing to alter core UI code.
- **Responsive Editorial Layouts:** Implements complex, asymmetric grid layouts (like the Split Project views) that fluidly adapt across mobile, tablet, and desktop devices.
- **Performance Optimized:** Built on Vite, utilizing optimized assets, lazy loading attributes, and minimal external dependencies to ensure rapid rendering and high Lighthouse scores.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Hero, Philosophy, WardrobeShowcase)
├── data/                # Centralized content and project data
│   ├── content.js       # Global text and generic data
│   ├── projects.js      # Portfolio gallery and project case studies
│   └── services.js      # Core services data
├── pages/               # Top-level route components (Home, About, Services)
├── utils/               # Helper functions and shared animation variants
├── App.jsx              # Main application router
├── index.css            # Global CSS, font definitions, and Tailwind directives
└── main.jsx             # React entry point
```

## 🛠️ Running Locally

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohanjangir31/latushya-website.git
   cd latushya-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your web browser.

## 🤝 Contribution & License

This project was developed exclusively as a portfolio and client showcase. 
All design assets, photographs, and branding belong to Latushya Interiors. Codebase authored by [Rohan Jangir](https://github.com/rohanjangir31).
