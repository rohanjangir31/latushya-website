// ============================================================
// LATUSHYA Central Data Index
//
// This file re-exports from individual data modules.
// Edit the specific file for the data you want to change:
//
//   src/data/companyInfo.js  → Brand name, phone, email, address, social
//   src/data/services.js     → Wardrobe service types
//   src/data/projects.js     → Portfolio & recent projects
//   src/data/reviews.js      → Customer testimonials
// ============================================================

import companyInfo from './companyInfo.js';
import services from './services.js';
import { WARDROBE_PROJECTS, INTERIOR_PROJECTS, recentProjects } from './projects.js';
import reviews from './reviews.js';

// ─── Re-exports using legacy named exports ─────────────────
// Existing components import from '../data/content' this keeps them working
export const COMPANY         = companyInfo;
export const SERVICES        = services;
export const WARDROBE_PROJECTS_DATA = WARDROBE_PROJECTS;
export const INTERIOR_PROJECTS_DATA = INTERIOR_PROJECTS;
export const RECENT_PROJECTS = recentProjects;
export const TESTIMONIALS    = reviews;

// ─── Why Choose (static, rarely changes) ──────────────────
export const WHY_CHOOSE = [
  {
    id: 1,
    title: 'Built for Your Home',
    description: 'We measure your actual space and design around it. Nothing is copied from a catalogue. Your kitchen or wardrobe is designed once, for you.',
  },
  {
    id: 2,
    title: 'German Hardware',
    description: 'We use Häfele, Hettich, and Blum. These brands are trusted by serious furniture makers worldwide because they hold up for years without needing any adjustment.',
  },
  {
    id: 3,
    title: 'Solid Core Materials',
    description: 'Century Ply and Greenply grade boards form the base of all our work. They do not warp, they hold screws well, and they last.',
  },
  {
    id: 4,
    title: 'Careful Installation',
    description: 'Our carpenters have done this hundreds of times. Panels are fitted to the millimetre and checked before we leave the site.',
  },
  {
    id: 5,
    title: 'Storage That Makes Sense',
    description: 'We ask how you use your space before designing it. The layout is built around your actual habits, not what looks good in a render.',
  },
  {
    id: 6,
    title: 'One-on-One from Day One',
    description: 'You speak to the same person throughout your project. We take the first consultation seriously because that is where the real work begins.',
  },
];

// ─── Materials & Hardware ─────────────────────────────────
export const MATERIALS = [
  {
    id: 2,
    name: 'Hettich',
    category: 'Hardware',
    origin: 'Germany',
    description:
      'Trusted by premium furniture makers globally, Hettich drawer systems and hinges deliver silent, smooth operation for years on end.',
    qualities: ['Smooth drawer systems', 'Silent operation', 'Load-bearing tested'],
    logo: null,
  },
  {
    id: 1,
    name: 'Häfele',
    category: 'Hardware',
    origin: 'Germany',
    description:
      'World-class German hardware renowned for precision engineering. Häfele fittings are used in our sliding systems, hinges, and soft-close mechanisms.',
    qualities: ['Soft-close mechanisms', 'Lifetime durability', 'German engineering'],
    logo: null,
  },
  {
    id: 3,
    name: 'Blum',
    category: 'Hardware',
    origin: 'Austria',
    description:
      "The pinnacle of Austrian motion technology. We use Blum's Aventos lift systems and Tandem drawer systems for an unparalleled, weightless opening experience.",
    qualities: ['Austrian engineering', 'Aventos lift systems', 'Tandem runner glide'],
    logo: null,
  },
  {
    id: 4,
    name: 'Century Ply',
    category: 'Substrate',
    origin: 'India',
    description:
      "India's most trusted plywood brand used as the core substrate in all our woodwork for superior strength, moisture resistance, and longevity.",
    qualities: ['BWP grade available', 'Termite resistant', 'Consistent thickness'],
    logo: null,
  },
  {
    id: 5,
    name: 'Greenply',
    category: 'Substrate',
    origin: 'India',
    description: 'A premium alternative substrate offering high-density core options and excellent screw-holding capacity, ideal for kitchen and wardrobe carcasses.',
    qualities: ['High density core', 'ISI certified', 'Superior screw hold'],
    logo: null,
  },
  {
    id: 6,
    name: 'Acrylic',
    category: 'Finishes',
    origin: 'Ultra-Gloss',
    brands: ['Rehau', 'Advance'],
    description:
      'Offers a flawless, mirror-like high-gloss finish that brings a luxurious, modern aesthetic to any space. Highly scratch-resistant and exceptionally easy to maintain for longevity.',
    qualities: ['Mirror-like gloss', 'Scratch-resistant', 'Vibrant color retention'],
    logo: null,
  },
  {
    id: 7,
    name: 'Laminate',
    category: 'Finishes',
    origin: 'High-Pressure',
    brands: ['Merino', 'Greenlam'],
    description:
      'Engineered for robust durability, offering an extensive range of striking textures from natural wood grains to solid mattes. Perfect for stunning, low-maintenance areas.',
    qualities: ['Heat & impact resistant', 'Extensive textures', 'Low maintenance'],
    logo: null,
  },
  {
    id: 8,
    name: 'Membrane',
    category: 'Finishes',
    origin: 'Seamless Foil',
    description:
      'A seamless PVC foil vacuum-pressed over routed panels, providing a smooth, continuous finish without visible edge banding. Ideal for classic, neo-classical, or intricate designs.',
    qualities: ['No edge bands', 'Moisture resistant', 'Perfect for grooving'],
    logo: null,
  },
  {
    id: 9,
    name: 'Duco / PU',
    category: 'Finishes',
    origin: 'Automotive Grade',
    description:
      'Polyurethane (PU) and Duco paints offer an ultra-premium painted finish. Available in endless custom shades in both highly reflective gloss and sophisticated velvet matte.',
    qualities: ['Endless color matching', 'Luxurious matte or gloss', 'Seamless finish'],
    logo: null,
  },
  {
    id: 10,
    name: 'Lacquered Glass',
    category: 'Finishes',
    origin: 'Architectural',
    brands: ['Saint-Gobain'],
    description:
      'Provides unmatched clarity and a sleek, contemporary vibe. We incorporate architectural-grade lacquered glass into our sliding profiles for a truly sophisticated, reflective aesthetic.',
    qualities: ['Unmatched clarity', 'Highly reflective', 'Contemporary appeal'],
    logo: null,
  },
];

// ─── Process Steps ────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'First Visit',
    description: 'We come to your home. We look at the space, take measurements, and talk through what you want. No forms, no presentations — just a straightforward conversation about your home.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Based on what we heard, we put together a 3D layout of your space. We go back and forth with you until it feels right — usually over a few sessions — before anything gets finalised.',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'You pick your finishes — laminates, acrylics, colours, handles — from our material samples. We guide you through what works well together and what holds up over time.',
  },
  {
    step: '04',
    title: 'Production',
    description: 'Your panels are cut and assembled at our workshop before they come to your home. This way everything fits correctly the first time and there is no wasted time on-site.',
  },
  {
    step: '05',
    title: 'Installation',
    description: 'Our team comes in, installs everything, and keeps the site clean while they work. We stick to the agreed schedule and keep you updated if anything changes.',
  },
  {
    step: '06',
    title: 'Handover',
    description: 'We walk through the finished space with you. If anything is not right, we fix it before we ask for final payment. Simple as that.',
  },
];

// ─── Gallery Images ───────────────────────────────────────
// Replace src values with real project photography when available
export const GALLERY_IMAGES = [
  { id: 1, src: '/projects/mr-ish-processed/mr-ish-16.jpg', alt: 'Bespoke Luxury Living Area', category: 'Turnkey Interiors', isPlaceholder: false },
  { id: 2, src: '/assets/wardrobes/sliding-pink-white.jpg', alt: 'Custom Blush & White Sliding Wardrobe', category: 'FTC Wardrobes', isPlaceholder: false },
  { id: 3, src: '/projects/assetz-marq-v2/assetz-v2-7.jpg', alt: 'Elegant Master Bedroom with Textured Walls', category: 'Bedroom Design', isPlaceholder: false },
  { id: 4, src: '/projects/birla-alokya/birla-1.jpg', alt: 'Contemporary Modular Kitchen in Soft Mint', category: 'Modular Kitchens', isPlaceholder: false },
  { id: 5, src: '/assets/wardrobes/sliding-beige-black.jpg', alt: 'Bold Geometric Sliding Wardrobe', category: 'Custom Wardrobes', isPlaceholder: false },
  { id: 6, src: '/projects/mr-ish-processed/mr-ish-5.jpg', alt: 'Modern Dining Space with Glass Partition', category: 'Turnkey Interiors', isPlaceholder: false },
  
  // New Client Uploads (Weakly Deduplicated - 32 Unique Files)
  { id: 7, src: '/gallery-new/photo-1.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 8, src: '/gallery-new/photo-2.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 9, src: '/gallery-new/photo-3.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 10, src: '/gallery-new/photo-4.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 11, src: '/gallery-new/photo-5.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 12, src: '/gallery-new/photo-6.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 13, src: '/gallery-new/photo-7.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 14, src: '/gallery-new/photo-8.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 15, src: '/gallery-new/photo-9.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 16, src: '/gallery-new/photo-10.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 17, src: '/gallery-new/photo-11.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 18, src: '/gallery-new/photo-12.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 19, src: '/gallery-new/photo-13.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 20, src: '/gallery-new/photo-14.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 21, src: '/gallery-new/photo-15.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 22, src: '/gallery-new/photo-16.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 23, src: '/gallery-new/photo-17.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 24, src: '/gallery-new/photo-18.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 25, src: '/gallery-new/photo-19.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 26, src: '/gallery-new/photo-20.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 27, src: '/gallery-new/photo-21.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 28, src: '/gallery-new/photo-22.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 29, src: '/gallery-new/photo-23.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 30, src: '/gallery-new/photo-24.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 31, src: '/gallery-new/photo-25.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 32, src: '/gallery-new/photo-26.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 33, src: '/gallery-new/photo-27.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 34, src: '/gallery-new/photo-28.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 35, src: '/gallery-new/photo-29.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 36, src: '/gallery-new/photo-30.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 37, src: '/gallery-new/photo-31.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
  { id: 38, src: '/gallery-new/photo-32.jpg', alt: 'Client Portfolio Shot', category: 'Recent Projects', isPlaceholder: false },
];

// ─── FAQ ─────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'What is the typical timeline for a wardrobe project?',
    answer: 'Most wardrobe projects production and installation is completed within 2 to 3 weeks post project confirmation and design approval. We provide a clear schedule upfront before any work begins.',
  },
  {
    id: 2,
    question: 'Are your wardrobes fully customised or catalogue-based?',
    answer: 'Every wardrobe is designed and built specifically for your space. We take precise measurements, understand your storage habits, and create a layout unique to you. We do not sell catalogue or off-the-shelf wardrobes.',
  },
  {
    id: 3,
    question: 'Which hardware and materials do you use?',
    answer: 'We use premium Blum, Häfele, and Hettich hardware for sliding, hinge, and lift systems. Century Ply or Greenply is used as the core substrate, wrapped in imported premium laminates or acrylics for a flawless finish.',
  },
  {
    id: 4,
    question: 'Which cities and locations do you serve?',
    answer: "We serve clients across Bangalore, as well as other locations including Mysore, Hyderabad, and Kadapa. Our team can visit your home for a consultation.",
  },
  {
    id: 5,
    question: 'Is the initial consultation free?',
    answer: 'Yes. The first on call consultation is completely free with no obligations whatsoever.',
  },
  {
    id: 6,
    question: 'What types of wardrobes do you make?',
    answer: 'We specialise in modular wardrobes, sliding wardrobes, walk-in wardrobes, hinged wardrobes, luxury wardrobes, and fully custom storage solutions. Wardrobes are our core expertise.',
  },
];
