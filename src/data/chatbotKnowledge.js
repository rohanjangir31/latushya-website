// ============================================================
// LATUSHYA AI Concierge Knowledge Base
// All answers sourced directly from real website content.
// ============================================================

export const CATEGORIES = [
  { id: 'services',   label: 'Our Services',     icon: '✦' },
  { id: 'pricing',    label: 'Pricing',           icon: '₹' },
  { id: 'process',    label: 'How It Works',      icon: '⊕' },
  { id: 'materials',  label: 'Materials',         icon: '◈' },
  { id: 'warranty',   label: 'Warranty & Support', icon: '◉' },
  { id: 'location',   label: 'Location & Areas',  icon: '⊛' },
];

export const KNOWLEDGE = [

  // ═══════════════════════════════════════════════
  // SERVICES
  // ═══════════════════════════════════════════════
  {
    id: 'services-overview',
    category: 'services',
    question: 'What services does Latushya offer?',
    answer: 'We offer five core services: FTC Wardrobes, Modular Kitchens, Turnkey Home Interiors, Living Room Design, and a premium Curated Decor Sourcing service (accompanied shopping & styling). Every project is 100% custom we never use off-the-shelf templates.',
    keywords: ['services', 'offer', 'what do you do', 'work', 'provide'],
  },
  {
    id: 'wardrobes',
    category: 'services',
    question: 'What types of wardrobes do you design?',
    answer: 'Wardrobes are our core expertise. We specialise in modular wardrobes, sliding wardrobes, walk-in wardrobes, hinged wardrobes, luxury wardrobes, and fully custom storage solutions.',
    keywords: ['wardrobe', 'sliding', 'hinged', 'walk-in', 'closet', 'types', 'kind', 'storage', 'luxury', 'modular'],
  },
  {
    id: 'modular-kitchen',
    category: 'services',
    question: 'Do you design modular kitchens?',
    answer: 'Yes! We design fully custom modular kitchens featuring moisture-resistant CenturyPly/Greenply cores, premium laminate and acrylic finishes, and world-class German hardware (Häfele, Hettich, Blum) the same quality standard we apply to our wardrobes.',
    keywords: ['kitchen', 'modular kitchen', 'cooking', 'cabinets', 'kitchen design'],
  },
  {
    id: 'turnkey',
    category: 'services',
    question: 'Do you do complete home interiors?',
    answer: 'Yes we offer Turnkey Interior solutions covering everything from bare-shell civil work to final styling and handover. This includes living rooms, bedrooms, kitchens, wardrobes, TV units, wall panelling, and study furniture all under one roof.',
    keywords: ['turnkey', 'full home', 'complete interior', 'home interior', 'whole house', 'living room', 'bedroom', 'tv unit'],
  },
  {
    id: 'living-room',
    category: 'services',
    question: 'Can you design my living room?',
    answer: 'Absolutely. We design custom TV units, sophisticated wall panelling, tailored furniture layouts, and full living room designs meticulously crafted to make your space perfect for both hosting and relaxing.',
    keywords: ['living room', 'tv unit', 'wall panel', 'sofa', 'hall', 'drawing room'],
  },
  {
    id: 'decor-sourcing',
    category: 'services',
    question: 'Can you come with us to buy furniture or home decor?',
    answer: 'Yes! We offer a dedicated add-on service where our lead designers personally accompany you to source premium furniture, art, and decor ensuring flawless coordination with your new space.',
    keywords: ['shopping', 'buy furniture', 'decor', 'accompaniment', 'sourcing', 'styling', 'come with us', 'decor sourcing'],
  },

  // ═══════════════════════════════════════════════
  // PRICING
  // ═══════════════════════════════════════════════
  {
    id: 'pricing-general',
    category: 'pricing',
    question: 'How much does it cost?',
    answer: "Our pricing is always custom it depends on your room dimensions, chosen design, material finish, hardware tier, and internal fittings. We don't publish fixed rates because every project is unique. The best way to get an accurate number is through our free home consultation, where we measure your space and give you a fully detailed, transparent quote with no obligations.",
    keywords: ['price', 'cost', 'pricing', 'budget', 'expensive', 'rate', 'charges', 'fees', 'rupees', 'how much', 'quote', 'estimate'],
  },
  {
    id: 'free-quote',
    category: 'pricing',
    question: 'Can I get a quote without commitment?',
    answer: 'Yes, absolutely. After our free home visit, we prepare a complete, itemised quote covering materials, hardware, production, and installation with zero obligation to proceed. You are under no pressure at any stage.',
    keywords: ['free quote', 'no commitment', 'estimate', 'proposal', 'quotation'],
  },
  {
    id: 'payment',
    category: 'pricing',
    question: 'How does payment work?',
    answer: 'We follow a milestone-based payment schedule: a booking advance to confirm the project, a production payment when manufacturing begins, and the final balance due on installation day. This keeps things transparent and fair for both parties.',
    keywords: ['payment', 'advance', 'installment', 'emi', 'pay', 'deposit', 'how to pay'],
  },

  // ═══════════════════════════════════════════════
  // PROCESS
  // ═══════════════════════════════════════════════
  // ═══════════════════════════════════════════════
  {
    id: 'consultation-free',
    category: 'process',
    question: 'Is the first consultation free?',
    answer: 'Yes. The first on call consultation is completely free with no obligations whatsoever. We discuss your requirements, lifestyle, and style preferences. There is absolutely no pressure to proceed afterwards.',
    keywords: ['consultation', 'free', 'home visit', 'site visit', 'appointment', 'visit', 'meeting', 'book', 'schedule'],
  },
  {
    id: 'timeline',
    category: 'process',
    question: 'How long does a project take?',
    answer: 'Most wardrobe and kitchen projects are completed within 2 to 3 weeks from design approval. This covers precision production in our workshop and a 2 to 4 day on-site installation by our trained carpentry team with minimal disruption to your home.',
    keywords: ['timeline', 'how long', 'time', 'days', 'weeks', 'duration', 'when ready', 'delivery'],
  },
  {
    id: 'process-steps',
    category: 'process',
    question: 'What is your step-by-step process?',
    answer: "We follow a clear 6-step process:\n\n1. Free On-Call Consultation we listen and understand your space.\n2. 3D Design Concept a personalised layout you can visualise.\n3. Material Selection choose your finishes and hardware from our curated library.\n4. Workshop Production precision-cut and pre-assembled in our facility.\n5. On-site Installation clean, efficient, on-time.\n6. Quality Handover thorough check of every drawer, shutter, and fitting before sign-off.",
    keywords: ['process', 'steps', 'how do you work', 'procedure', 'workflow', 'how it works'],
  },
  {
    id: 'design',
    category: 'process',
    question: 'Do you provide a 3D design before starting?',
    answer: 'Yes. After the consultation, our designer creates a detailed 3D spatial layout showing your interior including zones, material finishes, and the overall look so you can visualise and approve it before any production begins.',
    keywords: ['3d', 'design', 'visualise', 'render', 'preview', 'sketch', 'drawing'],
  },

  // ═══════════════════════════════════════════════
  // MATERIALS & HARDWARE
  // ═══════════════════════════════════════════════
  {
    id: 'hardware-brands',
    category: 'materials',
    question: 'What hardware brands do you use?',
    answer: 'We exclusively use three world-class brands:\n\n• Häfele (Germany) sliding systems, hinges, and soft-close mechanisms.\n• Hettich (Germany) silent drawer systems and smooth-glide runners.\n• Blum (Austria) Aventos lift systems and Legrabox drawers for a feather-light opening experience.\n\nAll three are industry gold standards that guarantee lifetime performance.',
    keywords: ['hardware', 'hafele', 'hettich', 'blum', 'fittings', 'hinges', 'brand', 'german', 'austrian'],
  },
  {
    id: 'plywood',
    category: 'materials',
    question: 'What plywood and substrate do you use?',
    answer: "We use CenturyPly or Greenply as our structural core substrate both are ISI-certified, termite-resistant, and available in BWP marine-grade for moisture-prone areas like kitchens. The carcasses are then finished with your chosen premium laminate or acrylic.",
    keywords: ['plywood', 'ply', 'substrate', 'wood', 'centuryply', 'greenply', 'board', 'core'],
  },
  {
    id: 'finishes',
    category: 'materials',
    question: 'What finish and colour options are available?',
    answer: 'We offer an extensive, curated library of premium finishes including Acrylic (from brands like Advance and Rehau), Laminate (from Merino), Membrane, Duco/PU, and Lacquered glass (from Saint-Gobain). Our designer brings physical samples so you can see each finish before deciding.',
    keywords: ['finish', 'colour', 'laminate', 'acrylic', 'texture', 'look', 'membrane', 'duco', 'pu', 'lacquered', 'glass', 'material options', 'brands', 'advance', 'merino', 'rehau', 'saint-gobain'],
  },
  {
    id: 'glass-shutters',
    category: 'materials',
    question: 'Can I get glass or mirror shutters on my wardrobe?',
    answer: 'Absolutely. We offer frosted glass, tinted glass, lacquered glass (from Saint-Gobain), clear glass, and full-length mirror shutters typically framed with sleek aluminium profiles. Mirror shutters are a particularly popular choice for bedrooms.',
    keywords: ['glass', 'mirror', 'frosted', 'tinted', 'reflective', 'shutter', 'door', 'saint-gobain'],
  },

  // ═══════════════════════════════════════════════
  // WARRANTY & SUPPORT
  // ═══════════════════════════════════════════════
  {
    id: 'warranty',
    category: 'warranty',
    question: 'What warranty do you provide?',
    answer: "We are finalising our official warranty terms and will share the exact details shortly. What we can confirm: we stand fully behind our craftsmanship, and our German/Austrian hardware (Häfele, Hettich, Blum) carries independent lifetime performance guarantees from the brands themselves. Reach out to us for current warranty specifics.",
    keywords: ['warranty', 'guarantee', 'how long', 'years', 'assurance'],
  },
  {
    id: 'after-sales',
    category: 'warranty',
    question: 'What if something needs fixing after installation?',
    answer: 'Our after-sales support team is fully reachable after handover. If any drawer, shutter, or fitting needs adjustment, our team will visit and resolve it promptly. Customer satisfaction does not end at the handover it is an ongoing commitment.',
    keywords: ['repair', 'fix', 'broken', 'issue', 'problem', 'after', 'service', 'support', 'post-installation'],
  },

  // ═══════════════════════════════════════════════
  // LOCATION
  // ═══════════════════════════════════════════════
  {
    id: 'areas',
    category: 'location',
    question: 'Which areas do you serve?',
    answer: 'We serve clients across all areas of Bangalore, as well as Mysore, Hyderabad, and Kadapa! Whether you need a full home interior or custom wardrobes, we bring our expertise directly to you.',
    keywords: ['area', 'location', 'where', 'serve', 'bangalore', 'mysore', 'hyderabad', 'kadapa', 'indiranagar', 'koramangala', 'whitefield', 'hsr', 'yelahanka', 'jayanagar', 'hebbal'],
  },
  {
    id: 'outside-bangalore',
    category: 'location',
    question: 'Do you work outside Bangalore?',
    answer: 'Our primary operations are focused on Bangalore at the moment. For projects in nearby cities like Mysore or Tumkur, please contact us directly with your project details, and we will assess feasibility based on the scope.',
    keywords: ['outside', 'mysore', 'other city', 'outstation', 'travel', 'different city'],
  },
  {
    id: 'contact',
    category: 'location',
    question: 'How can I contact Latushya?',
    answer: 'You can reach us on WhatsApp or phone at +91 97414 15887, or email us at info@latushya.com. You can also click the "Consultation" button at the top of any page to book a home visit directly.',
    keywords: ['contact', 'call', 'phone', 'whatsapp', 'email', 'reach', 'number', 'how to contact'],
  },
];

export const FALLBACK = {
  text: "That's a great question and one best answered by our design team directly! Every project is unique, and our experts can give you the most accurate, personalised answer.",
  showWhatsApp: true,
};

// ─── Smart keyword matcher ───────────────────────────────
// Returns the best-matching knowledge entry or null
export function findAnswer(userInput) {
  const lower = userInput.toLowerCase().trim();
  if (!lower) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length; // longer keyword = stronger signal
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 3 ? bestMatch : null;
}
