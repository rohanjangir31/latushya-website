// ============================================================
// LATUSHYA — Portfolio Projects
//
// HOW TO ADD A REAL PROJECT:
// 1. Copy a placeholder entry below
// 2. Fill in all fields with real project data
// 3. Set isPlaceholder: false
// 4. Replace the image URL with a real project photo
// 5. Save — the website updates automatically
// ============================================================

const projects = [
  {
    id: 1,
    category: 'Turnkey Interiors',
    title: 'The Prestige Villa',
    location: 'Whitefield, Bangalore',
    projectType: 'Full Home Interior',
    materials: 'Italian Marble, Teak Wood, German Hardware',
    duration: '45 Days',
    description: 'A complete end-to-end luxury transformation of a 4BHK villa, featuring custom wood panelling and bespoke furniture.',
    image: '/projects/media__1784490387524.jpg',
    isPlaceholder: false,
    size: 'large',
  },
  {
    id: 2,
    category: 'Modular Kitchens',
    title: 'Minimalist Chef Kitchen',
    location: 'Indiranagar, Bangalore',
    projectType: 'Premium Kitchen',
    materials: 'Acrylic Finish, Quartz Countertop',
    duration: '21 Days',
    description: 'Sleek, handle-less acrylic modular kitchen with built-in appliances and a striking quartz island.',
    image: '/projects/media__1784490387507.jpg',
    isPlaceholder: false,
    size: 'medium',
  },
  {
    id: 3,
    category: 'Turnkey Interiors',
    title: 'Modern Bedroom Suite',
    location: 'Koramangala, Bangalore',
    projectType: 'Bedroom Interior',
    materials: 'White Finish, Teak Wood Details',
    duration: '14 Days',
    description: 'A serene bedroom interior with built-in wardrobes and an elegant circular mirror vanity.',
    image: '/projects/media__1784490387502.jpg',
    isPlaceholder: false,
    size: 'medium',
  },
  {
    id: 4,
    category: 'Bespoke Wardrobes',
    title: 'Geometric Sliding Wardrobe',
    location: 'Jayanagar, Bangalore',
    projectType: 'Sliding Wardrobe',
    materials: 'Cream and Black Lacquered Glass',
    duration: '18 Days',
    description: 'A luxurious sliding wardrobe featuring a striking geometric cream and black glass design.',
    image: '/projects/media__1784490387517.jpg',
    isPlaceholder: false,
    size: 'large',
  },
  {
    id: 5,
    category: 'Bespoke Furniture',
    title: 'Traditional Wooden Console',
    location: 'HSR Layout, Bangalore',
    projectType: 'Custom Furniture',
    materials: 'Solid Wood, Traditional Carvings',
    duration: '35 Days',
    description: 'A beautiful handcrafted traditional wooden mirror console with intricate Indian carvings.',
    image: '/projects/media__1784490387392.jpg',
    isPlaceholder: false,
    size: 'medium',
  },
  {
    id: 6,
    category: 'Living Room Design',
    title: 'Classic Modern Living',
    location: 'Sadashivanagar, Bangalore',
    projectType: 'Living & Dining',
    materials: 'Solid Wood, Brass Accents',
    duration: '20 Days',
    description: 'A warm, inviting living and dining space blending classic wooden elements with modern brass accents.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    isPlaceholder: true,
    size: 'medium',
  },
];

// ── RECENT PROJECTS ──────────────────────────────────────────
export const recentProjects = [
  {
    id: 1,
    name: 'The Prestige Villa',
    location: 'Whitefield, Bangalore',
    projectType: 'Full Home Interior',
    duration: '45 Days',
    materials: 'Italian Marble, Teak Wood',
    description: 'A complete luxury transformation of a 4BHK villa.',
    image: '/projects/media__1784490387524.jpg',
    isPlaceholder: false,
  },
  {
    id: 2,
    name: 'Minimalist Chef Kitchen',
    location: 'Indiranagar, Bangalore',
    projectType: 'Premium Kitchen',
    duration: '21 Days',
    materials: 'Acrylic Finish, Quartz',
    description: 'Sleek, handle-less acrylic modular kitchen.',
    image: '/projects/media__1784490387507.jpg',
    isPlaceholder: false,
  },
  {
    id: 3,
    name: 'Geometric Sliding Wardrobe',
    location: 'Jayanagar, Bangalore',
    projectType: 'Sliding Wardrobe',
    duration: '18 Days',
    materials: 'Cream and Black Lacquered Glass',
    description: 'A luxurious sliding wardrobe featuring a striking geometric cream and black glass design.',
    image: '/projects/media__1784490387517.jpg',
    isPlaceholder: false,
  },
];

export default projects;
