import fs from 'fs';
fs.appendFileSync('src/index.css', '\n@layer base {\n  img[src*="/projects/"] {\n    filter: brightness(1.15) contrast(1.1) saturate(1.2);\n  }\n}\n', 'utf8');
