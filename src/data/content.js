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
    title: 'Custom Interior Designs',
    description: 'Every space is designed from scratch around your specific dimensions, lifestyle requirements, and aesthetic preferences. We never use off-the-shelf templates.',
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
    description: 'We map your spatial usage patterns — daily routines, entertainment needs, storage — and engineer a layout that makes every square foot count.',
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
      "India's most trusted plywood brand — used as the core substrate in all our woodwork for superior strength, moisture resistance, and longevity.",
    qualities: ['BWP grade available', 'Termite resistant', 'Consistent thickness'],
    logo: null,
  },
  {
    id: 5,
    name: 'Greenply',
    category: 'Substrate',
    origin: 'India',
    description:
      'A premium alternative substrate offering high-density core options and excellent screw-holding capacity, ideal for kitchen and wardrobe carcasses.',
    qualities: ['High density core', 'ISI certified', 'Superior screw hold'],
    logo: null,
  },
];

// ─── Process Steps ────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Free Consultation',
    description: 'We visit your home, assess your space, and listen carefully to your requirements — room dimensions, lifestyle habits, and style preferences.',
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'Our designer creates a 3D spatial layout tailored to your home — showing interior zones, material finishes, and lighting plans.',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'Choose your laminate finish, hardware brand, shutter type, and internal fittings from our curated material library.',
  },
  {
    step: '04',
    title: 'Production',
    description: 'Your woodwork panels are precision-cut and pre-assembled in our workshop — ensuring accuracy before it reaches your home.',
  },
  {
    step: '05',
    title: 'Installation',
    description: 'Our trained carpentry team installs your interiors on-site with minimal mess and disruption, working strictly to the approved timelines.',
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
  { id: 1, src: '/projects/media__1784490387524.jpg', alt: 'Luxury Living Room Interior — Bangalore', category: 'Living Room Design', isPlaceholder: false },
  { id: 2, src: '/projects/media__1784490387507.jpg', alt: 'Acrylic Modular Kitchen — Bangalore', category: 'Modular Kitchens', isPlaceholder: false },
  { id: 3, src: '/projects/media__1784490387502.jpg', alt: 'Modern Bedroom Interior — Bangalore', category: 'Turnkey Interiors', isPlaceholder: false },
  { id: 4, src: '/projects/media__1784490387517.jpg', alt: 'Geometric Sliding Wardrobe — Bangalore', category: 'Bespoke Wardrobes', isPlaceholder: false },
  { id: 5, src: '/projects/media__1784490387392.jpg', alt: 'Traditional Wooden Console — Bangalore', category: 'Bespoke Furniture', isPlaceholder: false },
  { id: 6, src: '/projects/media__1784490387524.jpg', alt: 'Classic Living & Dining — Bangalore', category: 'Living Room Design', isPlaceholder: false },
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
