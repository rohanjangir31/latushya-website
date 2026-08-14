// ============================================================
// LATUSHYA — AI Concierge Knowledge Base
// Comprehensive FAQ + keyword triggers for smart matching
// ============================================================

export const CATEGORIES = [
  { id: 'designs',     label: 'Our Designs',      icon: '✦' },
  { id: 'pricing',     label: 'Pricing',           icon: '₹' },
  { id: 'process',     label: 'How It Works',      icon: '⊕' },
  { id: 'materials',   label: 'Materials',         icon: '◈' },
  { id: 'warranty',    label: 'Warranty',          icon: '◉' },
  { id: 'location',    label: 'Location & Areas',  icon: '⊛' },
];

export const KNOWLEDGE = [
  // ── DESIGNS ──
  {
    id: 'wardrobe-types',
    category: 'designs',
    question: 'What types of wardrobes do you design?',
    answer: 'We specialise exclusively in bespoke wardrobes — Sliding, Hinged, Walk-In, and modular systems. Every wardrobe is designed from scratch for your exact space. We do not use catalogue templates.',
    keywords: ['wardrobe', 'types', 'sliding', 'hinged', 'walk-in', 'modular', 'designs', 'kind'],
  },
  {
    id: 'custom-design',
    category: 'designs',
    question: 'Are your designs fully custom?',
    answer: 'Absolutely. From the dimensions to the internal layout, material finish, shutter profile, and hardware — every element is engineered for your unique space and lifestyle. Nothing is off-the-shelf.',
    keywords: ['custom', 'bespoke', 'unique', 'personalised', 'specific', 'tailored'],
  },
  {
    id: 'kitchens',
    category: 'designs',
    question: 'Do you design modular kitchens?',
    answer: 'Yes! We bring the same precision and premium material expertise to modular kitchens — with custom layouts, imported laminates and acrylic finishes, and Blum/Häfele mechanisms throughout.',
    keywords: ['kitchen', 'modular kitchen', 'cooking', 'cabinets'],
  },
  {
    id: 'interiors',
    category: 'designs',
    question: 'Do you do full home interiors?',
    answer: 'While our core expertise is bespoke wardrobes and storage, we do offer turnkey interior solutions including TV units, study furniture, and modular kitchens. Please share your requirements for a tailored proposal.',
    keywords: ['interior', 'full home', 'turnkey', 'furniture', 'tv unit', 'study'],
  },

  // ── PRICING ──
  {
    id: 'pricing-wardrobes',
    category: 'pricing',
    question: 'What does a wardrobe cost?',
    answer: 'Pricing is 100% custom — it depends on your dimensions, shutter type, material finish, and internal fittings. A well-appointed sliding wardrobe typically starts around ₹80,000. We provide a detailed, transparent quote after our free home visit.',
    keywords: ['price', 'cost', 'pricing', 'budget', 'expensive', 'rate', 'quote', 'charges', 'fees', 'rupees', 'how much'],
  },
  {
    id: 'pricing-kitchen',
    category: 'pricing',
    question: 'How much does a kitchen cost?',
    answer: 'Modular kitchen pricing starts from approximately ₹1,20,000 and varies by layout size, finish (acrylic vs. laminate), and hardware tier. We will present a detailed scope and quote after measuring your kitchen.',
    keywords: ['kitchen cost', 'kitchen price', 'kitchen budget', 'kitchen charges'],
  },
  {
    id: 'emi',
    category: 'pricing',
    question: 'Do you offer EMI or payment plans?',
    answer: 'We offer a structured payment schedule tied to project milestones — typically a booking advance, production start payment, and a final balance on installation day. Please ask our team for specific terms.',
    keywords: ['emi', 'payment', 'installment', 'pay later', 'advance'],
  },

  // ── PROCESS ──
  {
    id: 'consultation',
    category: 'process',
    question: 'Is the consultation free?',
    answer: 'Yes — the first consultation, including a home visit, space measurement, and preliminary design discussion, is completely free with absolutely no obligation.',
    keywords: ['free', 'consultation', 'visit', 'meeting', 'appointment', 'book'],
  },
  {
    id: 'timeline',
    category: 'process',
    question: 'How long does a project take?',
    answer: 'Most wardrobe projects are completed within 3–4 weeks from design approval. This covers precision production in our workshop and a 2–4 day on-site installation with minimal disruption.',
    keywords: ['timeline', 'time', 'how long', 'days', 'weeks', 'duration', 'when'],
  },
  {
    id: 'process-steps',
    category: 'process',
    question: 'What is your process like?',
    answer: 'We follow a clear 6-step process: Free Consultation → 3D Design → Material Selection → Workshop Production → On-Site Installation → Quality Handover. At every stage, you are fully informed and in control.',
    keywords: ['process', 'steps', 'how do you', 'procedure', 'workflow'],
  },
  {
    id: 'site-visit',
    category: 'process',
    question: 'Can you come to my home to measure?',
    answer: 'Absolutely — our designer visits your home, takes precise measurements, assesses the space, and only then creates a concept tailored to your room. It\'s a free service with no strings attached.',
    keywords: ['home visit', 'site visit', 'come', 'measure', 'measurement'],
  },

  // ── MATERIALS ──
  {
    id: 'hardware',
    category: 'materials',
    question: 'What hardware brands do you use?',
    answer: 'We exclusively use German and Austrian hardware — Häfele, Hettich, and Blum. These are industry gold standards used in the most premium furniture worldwide, ensuring silent, flawless operation for a lifetime.',
    keywords: ['hardware', 'hafele', 'hettich', 'blum', 'fittings', 'hinges', 'slides', 'brand'],
  },
  {
    id: 'ply',
    category: 'materials',
    question: 'What plywood or substrate do you use?',
    answer: 'We use CenturyPly or Greenply as our core structural substrate — BWP marine-grade options are available for moisture-prone areas. The carcasses are then finished with premium imported laminates or high-gloss acrylics.',
    keywords: ['plywood', 'ply', 'substrate', 'wood', 'century', 'greenply', 'material', 'board'],
  },
  {
    id: 'finish',
    category: 'materials',
    question: 'What finish options are available?',
    answer: 'We offer a wide curated library of finishes — matte laminates, high-gloss acrylics, woodgrain textures, and fabric-textured PVC membranes. Our designer brings physical samples to your home so you can see the exact finish in your lighting.',
    keywords: ['finish', 'laminate', 'acrylic', 'colour', 'texture', 'look', 'style', 'shade'],
  },
  {
    id: 'glass',
    category: 'materials',
    question: 'Can I have glass shutters on my wardrobe?',
    answer: 'Yes — we offer tinted glass, frosted glass, lacquered glass, and clear glass shutter options, typically framed with aluminium profiles for a sleek contemporary look.',
    keywords: ['glass', 'mirror', 'frosted', 'tinted', 'transparent'],
  },

  // ── WARRANTY ──
  {
    id: 'warranty',
    category: 'warranty',
    question: 'What warranty do you offer?',
    answer: 'We provide up to a 10-year warranty on manufacturing and structural integrity. Our German hardware (Blum, Häfele, Hettich) carries an independent lifetime performance guarantee from the brand itself.',
    keywords: ['warranty', 'guarantee', 'after-service', 'support', 'repair', 'defect'],
  },
  {
    id: 'after-sales',
    category: 'warranty',
    question: 'What if something breaks after installation?',
    answer: 'Our after-sales support team is available to assist with any issue post-installation. During the warranty period, structural repairs and hardware adjustments are covered at no cost to you.',
    keywords: ['break', 'fix', 'repair', 'broken', 'not working', 'issue', 'problem', 'damage', 'service'],
  },

  // ── LOCATION ──
  {
    id: 'areas',
    category: 'location',
    question: 'Which areas in Bangalore do you serve?',
    answer: 'We serve clients across the entire Bangalore metropolitan area — including Whitefield, Koramangala, Indiranagar, HSR Layout, Yelahanka, Jayanagar, Hebbal, Electronic City, and beyond.',
    keywords: ['area', 'location', 'serve', 'bangalore', 'koramangala', 'whitefield', 'indiranagar', 'hsr', 'yelahanka'],
  },
  {
    id: 'outside-bangalore',
    category: 'location',
    question: 'Do you work outside Bangalore?',
    answer: 'Currently our core operations are focused on Bangalore. For projects in Mysore or other nearby cities, please contact us directly and we will assess feasibility based on project scope.',
    keywords: ['mysore', 'outside', 'other city', 'chennai', 'hyderabad', 'outstation'],
  },
];

export const FALLBACK = {
  text: "That\'s a great question! For highly specific design or pricing queries, our expert team will give you the most accurate answer.",
  showWhatsApp: true,
};

// Smart keyword matcher — returns best matching entry
export function findAnswer(userInput) {
  const lower = userInput.toLowerCase().trim();
  if (!lower) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    // Check keywords
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += kw.length; // longer keyword = stronger signal
    }
    // Also fuzzy-check against the question itself
    if (lower.includes(entry.question.toLowerCase().slice(0, 10))) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 2 ? bestMatch : null;
}
