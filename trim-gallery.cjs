const fs = require('fs');

const p = 'src/data/projects.js';
let content = fs.readFileSync(p, 'utf8');

// We'll keep 10 diverse photos from the list to make the gallery concise and professional
const keep = [1, 2, 5, 8, 10, 12, 14, 16, 18, 20];
const newGallery = keep.map((num, idx) => `      { id: 'ws-${idx+1}', src: '/projects/whatsapp/living-space-${num}.jpg', caption: '' }`).join(',\n');

content = content.replace(/gallery: \[\s*(?:\{\s*id: 'ws-\d+'.*?\},?\s*)+\s*\]/, `gallery: [\n${newGallery}\n    ]`);

fs.writeFileSync(p, content);
console.log('Fixed gallery duplicates in projects.js');
