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
    title: 'Custom Interior Designs',
    description: 'Every space is designed from scratch around your specific dimensions, lifestyle requirements, and aesthetic preferences. We never use off-the-shelf templates.',
  },
  {
    id: 2,
    title: 'Premium Hardware',
    description: 'We install only trusted luxury brands Häfele, Hettich, and Blum known for their flawless engineering, silent operation, and lifetime performance.',
  },
  {
    id: 3,
    title: 'Quality Materials',
    description: 'Century Ply and Greenply grade plywood, premium laminates, and solid wood options materials selected for their structural integrity and beautiful finish.',
  },
  {
    id: 4,
    title: 'Precision Installation',
    description: 'Our experienced carpentry team ensures millimetre-accurate installation. Every panel, rail, and fitting is checked before handover.',
  },
  {
    id: 5,
    title: 'Space Optimisation',
    description: 'We map your spatial usage patterns daily routines, entertainment needs, storage and engineer a layout that makes every square foot count.',
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
    brands: ['Rehau'],
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
    title: 'Project Commissioning',
    description: 'Once you choose to work with Latushya, our dedicated team visits your home to assess the space and listen carefully to your requirements including room dimensions, lifestyle habits, and style preferences.',
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'Your house is designed through deep collaboration. Over a dedicated series of five to six in depth design sessions, we iteratively refine a 3D spatial layout tailored exclusively for your space, perfecting every interior zone, material finish, and lighting plan together.',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'You will handpick your primary finishes including premium laminates, luxurious acrylics, and architectural glass alongside your preferred hardware and internal fittings from our exclusively curated material library.',
  },
  {
    step: '04',
    title: 'Production',
    description: 'Your woodwork panels are precision cut and pre assembled in our advanced workshop ensuring absolute accuracy before they ever reach your home.',
  },
  {
    step: '05',
    title: 'Installation',
    description: 'Our trained carpentry team installs your interiors on site with minimal mess and disruption while working strictly to our approved timelines.',
  },
  {
    step: '06',
    title: 'Quality Handover',
    description: 'True luxury lies in flawless execution. We invite you to conduct a meticulous walkthrough and compile a final snag list. Our team thoroughly resolves every detail to your absolute standard before we ever ask for your final sign off.',
  },
];

// ─── Gallery Images ───────────────────────────────────────
// Replace src values with real project photography when available
export const GALLERY_IMAGES = [
  { id: 1, src: '/projects/media__1784490387524.jpg', alt: 'Luxury Living Room Interior Bangalore', category: 'Living Room Design', isPlaceholder: false },
  { id: 2, src: '/projects/media__1784490387507.jpg', alt: 'Acrylic Modular Kitchen Bangalore', category: 'Modular Kitchens', isPlaceholder: false },
  { id: 3, src: '/projects/media__1784490387502.jpg', alt: 'Modern Bedroom Interior Bangalore', category: 'Turnkey Interiors', isPlaceholder: false },
  { id: 4, src: '/projects/media__1784490387517.jpg', alt: 'Geometric Sliding Wardrobe Bangalore', category: 'FTC Wardrobes', isPlaceholder: false },
  { id: 5, src: '/projects/media__1784490387392.jpg', alt: 'Traditional Wooden Console Bangalore', category: 'Custom Furniture', isPlaceholder: false },
  { id: 6, src: '/projects/media__1784490387524.jpg', alt: 'Classic Living & Dining Bangalore', category: 'Living Room Design', isPlaceholder: false },
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
    answer: 'Yes. The first consultation including a home visit, space measurement, and preliminary design discussion is completely free with no obligations whatsoever.',
  },
  {
    id: 6,
    question: 'What types of wardrobes do you make?',
    answer: 'We specialise in modular wardrobes, sliding wardrobes, walk-in wardrobes, hinged wardrobes, luxury wardrobes, and fully custom storage solutions. We do not do general interior design wardrobes are our core expertise.',
  },
];
