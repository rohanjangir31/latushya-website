// ============================================================
// LATUSHYA — Central Data Index
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
import projects, { recentProjects } from './projects.js';
import reviews from './reviews.js';

// ─── Re-exports using legacy named exports ─────────────────
// Existing components import from '../data/content' — this keeps them working
export const COMPANY        = companyInfo;
export const SERVICES       = services;
export const PROJECTS       = projects;
export const RECENT_PROJECTS = recentProjects;
export const TESTIMONIALS   = reviews;

// ─── Why Choose (static, rarely changes) ──────────────────
export const WHY_CHOOSE = [
  {
    id: 1,
    title: 'Custom Wardrobe Designs',
    description: 'Every wardrobe is designed from scratch around your specific dimensions, storage requirements, and aesthetic preferences. We never use off-the-shelf templates.',
  },
  {
    id: 2,
    title: 'Premium Hardware',
    description: 'We install only trusted brands — Häfele, Hettich, and Ebco — known for their durability, smooth operation, and long-lasting performance.',
  },
  {
    id: 3,
    title: 'Quality Materials',
    description: 'Century Ply and Greenply grade plywood, premium laminates, and solid wood options — materials selected for their structural integrity and beautiful finish.',
  },
  {
    id: 4,
    title: 'Precision Installation',
    description: 'Our experienced carpentry team ensures millimetre-accurate installation. Every panel, rail, and fitting is checked before handover.',
  },
  {
    id: 5,
    title: 'Space Optimisation',
    description: 'We map your wardrobe usage patterns — clothing types, accessories, footwear — and engineer a layout that makes every cubic inch count.',
  },
  {
    id: 6,
    title: 'Personalised Consultation',
    description: 'Your project starts with a one-on-one consultation. We listen first, measure carefully, and only then present a design concept.',
  },
];

// ─── Materials & Hardware ─────────────────────────────────
export const MATERIALS = [
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
    id: 3,
    name: 'Ebco',
    category: 'Hardware',
    origin: 'India',
    description:
      "India's leading furniture hardware brand — offering reliable, cost-effective fittings without compromising on quality or finish.",
    qualities: ['Made in India', 'Wide range', 'Reliable quality'],
    logo: null,
  },
  {
    id: 4,
    name: 'Century Ply',
    category: 'Substrate',
    origin: 'India',
    description:
      "India's most trusted plywood brand — used as the core substrate in all our wardrobes for superior strength, moisture resistance, and longevity.",
    qualities: ['BWP grade available', 'Termite resistant', 'Consistent thickness'],
    logo: null,
  },
  {
    id: 5,
    name: 'Greenply',
    category: 'Substrate',
    origin: 'India',
    description:
      'A premium alternative substrate offering high-density core options and excellent screw-holding capacity, ideal for wardrobe carcasses.',
    qualities: ['High density core', 'ISI certified', 'Superior screw hold'],
    logo: null,
  },
];

// ─── Process Steps ────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Free Consultation',
    description: 'We visit your home, assess your space, and listen carefully to your requirements — wardrobe size, usage habits, style preferences.',
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'Our designer creates a 3D wardrobe layout tailored to your space — showing interior zones, shutter styles, and finish options.',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'Choose your laminate finish, hardware brand, shutter type, and internal fittings from our curated material library.',
  },
  {
    step: '04',
    title: 'Production',
    description: 'Your wardrobe panels are precision-cut and pre-assembled in our workshop — ensuring accuracy before it reaches your home.',
  },
  {
    step: '05',
    title: 'Installation',
    description: 'Our trained carpentry team installs your wardrobe on-site with minimal mess and disruption, typically within 1–3 days.',
  },
  {
    step: '06',
    title: 'Quality Handover',
    description: 'A thorough quality check of every drawer, shutter, and fitting — followed by a walkthrough and satisfaction sign-off.',
  },
];

// ─── Gallery Images ───────────────────────────────────────
// Replace src values with real project photography when available
export const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', alt: 'Modular wardrobe — Bangalore', category: 'Modular Wardrobes', isPlaceholder: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85', alt: 'Walk-in wardrobe — Bangalore', category: 'Walk-In Wardrobes', isPlaceholder: true },
  { id: 3, src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=85', alt: 'Sliding wardrobe — Bangalore', category: 'Sliding Wardrobes', isPlaceholder: true },
  { id: 4, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85', alt: 'Custom storage — Bangalore', category: 'Custom Storage', isPlaceholder: true },
  { id: 5, src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85', alt: 'Luxury wardrobe — Bangalore', category: 'Luxury Wardrobes', isPlaceholder: true },
  { id: 6, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', alt: 'Hinged wardrobe — Bangalore', category: 'Hinged Wardrobes', isPlaceholder: true },
];

// ─── FAQ ─────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'What is the typical timeline for a wardrobe project?',
    answer: 'Most wardrobe projects are completed within 2–4 weeks from design approval — including production and installation. We provide a clear schedule upfront before any work begins.',
  },
  {
    id: 2,
    question: 'Are your wardrobes fully customised or catalogue-based?',
    answer: 'Every wardrobe is designed and built specifically for your space. We take precise measurements, understand your storage habits, and create a layout unique to you. We do not sell catalogue or off-the-shelf wardrobes.',
  },
  {
    id: 3,
    question: 'Which hardware and materials do you use?',
    answer: 'We use Häfele and Hettich hardware for sliding and hinge systems, Ebco for fittings, and Century Ply or Greenply as substrate. Laminates are sourced from premium brands for a durable, clean finish.',
  },
  {
    id: 4,
    question: 'Do you serve all areas across Bangalore?',
    answer: "Yes — we serve clients across Bangalore. Whether you're in Whitefield, Koramangala, Indiranagar, Yelahanka, or Jayanagar, our team can visit your home for a consultation.",
  },
  {
    id: 5,
    question: 'Is the initial consultation free?',
    answer: 'Yes. The first consultation — including a home visit, space measurement, and preliminary design discussion — is completely free with no obligations whatsoever.',
  },
  {
    id: 6,
    question: 'What types of wardrobes do you make?',
    answer: 'We specialise in modular wardrobes, sliding wardrobes, walk-in wardrobes, hinged wardrobes, luxury wardrobes, and fully custom storage solutions. We do not do general interior design — wardrobes are our core expertise.',
  },
];
