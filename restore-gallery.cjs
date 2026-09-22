const fs = require('fs');

const p = 'src/data/projects.js';
let content = fs.readFileSync(p, 'utf8');

// The original 20 distinct photos based on perceptual hash
const keep = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const newGallery = keep.map((num, idx) => `      { id: 'ws-${idx+1}', src: '/projects/whatsapp/living-space-${num}.jpg', caption: '' }`).join(',\n');

content = content.replace(/gallery: \[\s*(?:\{\s*id: 'ws-\d+'.*?\},?\s*)+\s*\]/, `gallery: [\n${newGallery}\n    ]`);

fs.writeFileSync(p, content);
console.log('Restored all distinct photos to projects.js');
