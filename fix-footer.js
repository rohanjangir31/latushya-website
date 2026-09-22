import fs from 'fs';
let content = fs.readFileSync('src/components/Footer.jsx', 'utf-8');
content = content.replace('Book an in-home consultation — no obligations, ever.', 'Book an in-home consultation with no obligations, ever.');
content = content.replace("Bangalore's premium interior design and execution studio. We create custom living spaces — turnkey interiors, modular kitchens, and bespoke furniture — tailored precisely to your lifestyle.", "Bangalore's premium interior design and execution studio. We create custom living spaces including turnkey interiors, modular kitchens, and custom furniture tailored precisely to your lifestyle.");
content = content.replace('© {new Date().getFullYear()} {COMPANY.name} — Premium Wardrobes, {COMPANY.city}', '© {new Date().getFullYear()} {COMPANY.name}. Premium Wardrobes, {COMPANY.city}');
fs.writeFileSync('src/components/Footer.jsx', content);
