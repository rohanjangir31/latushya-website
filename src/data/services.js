// ============================================================
// LATUSHYA Services Data
// Each service has a UNIQUE image no repeated photography.
// Replace these URLs with real project photos when available.
// ============================================================

const services = [
  {
    id: 'turnkey-interiors',
    icon: 'Layout',
    title: 'Turnkey Interiors',
    tagline: 'From concept to handover',
    description:
      'Complete home design and execution. We manage everything from bare-shell civil work to the final styling, ensuring a seamless, stress-free transformation of your space.',
    image: '/projects/interior-open-kitchen-living.jpg',
  },
  {
    id: 'modular-kitchens',
    icon: 'UtensilsCrossed',
    title: 'Modular Kitchens',
    tagline: 'The heart of the home',
    description:
      'Ergonomically designed, premium modular kitchens featuring state-of-the-art German hardware, moisture-resistant cores, and flawless, easy-to-maintain finishes.',
    image: '/projects/media__1784490387507.jpg',
  },
  {
    id: 'living-room-design',
    icon: 'Sofa',
    title: 'Living Room Design',
    tagline: 'Curated entertainment spaces',
    description:
      'Custom TV units, sophisticated wall panelling, and exclusive furniture layouts meticulously designed to make your living area the ultimate setting for hosting and relaxing.',
    image: '/projects/indian-living-room-landscape.jpg',
  },
  {
    id: 'ftc-wardrobes',
    icon: 'DoorOpen',
    title: 'FTC Wardrobes',
    tagline: 'Precision meets flexibility',
    description:
      'From floor-to-ceiling sliding systems to opulent walk-in closets. We engineer custom storage that perfectly balances aesthetic luxury with everyday functionality.',
    image: '/projects/real-ftc-wardrobe.jpg',
    slidingSubTypes: [
      {
        id: 'transparent',
        name: 'Transparent',
        description: 'Crystal-clear panels that let your curated wardrobe interior become part of the room — a bold, open statement.',
      },
      {
        id: 'semi-transparent',
        name: 'Semi-Transparent',
        description: 'Frosted or obscured glass that softens visibility while keeping the space feeling light and airy.',
      },
      {
        id: 'glass-mirror',
        name: 'Glass / Mirror',
        description: 'Full-length mirrored panels that visually expand your room and add a layer of refined, functional elegance.',
      },
      {
        id: 'laminate',
        name: 'Laminate',
        description: 'High-pressure laminate in any colour or texture — scratch-resistant, durable, and available in hundreds of finishes.',
      },
      {
        id: 'frosted',
        name: 'Frosted',
        description: 'A signature acid-etched frost finish that diffuses light with a soft, luminous glow and total privacy.',
      },
      {
        id: 'crystal-glass',
        name: 'Crystal / Trivial Glass',
        description: 'Premium crystal-clear glass with brilliant optical clarity — a jewel-like finish that elevates any bedroom.',
      },
      {
        id: 'membrane',
        name: 'Membrane',
        description: 'PVC membrane-wrapped doors in a seamless, skin-like finish — high-gloss, matte, or soft-touch texture.',
      },
    ],
  },
  {
    id: 'decor-sourcing',
    icon: 'ShoppingBag',
    title: 'Curated Decor Sourcing',
    tagline: 'Exclusive styling accompaniment',
    description:
      'A dedicated add-on service where our lead designers personally accompany you to source premium furniture, art, and decor ensuring flawless coordination with your new space.',
    image: '/projects/decor-sourcing-landscape.jpg',
  },
];

export default services;
