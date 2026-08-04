const fs = require('fs');
const path = require('path');

const OLD_PINK = '#E91E63';
const NEW_PINK = '#C94B73'; // Softer, more elegant rose pink that matches the logo
const NEW_PINK_RGB = '201, 75, 115';

// 1. Update JSX components
const dir = path.join(__dirname, 'src', 'components');
const walkSync = (d) => {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach(file => {
    file = path.join(d, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkSync(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = walkSync(dir);
// Also include App.jsx
files.push(path.join(__dirname, 'src', 'App.jsx'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Replace hex
    content = content.replace(/#E91E63/g, NEW_PINK);
    // Replace any remaining rgba with old rgb
    content = content.replace(/233,\s*30,\s*99/g, NEW_PINK_RGB);
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${path.basename(file)}`);
    }
  }
});

// 2. Update tailwind.config.js
const twPath = path.join(__dirname, 'tailwind.config.js');
let twContent = fs.readFileSync(twPath, 'utf8');
twContent = twContent.replace(/#E91E63/g, NEW_PINK);
twContent = twContent.replace(/#F06292/g, '#DF6B8F'); // lighter pink
fs.writeFileSync(twPath, twContent, 'utf8');
console.log('Updated: tailwind.config.js');

// 3. Update index.css
const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace(/#E91E63/g, NEW_PINK);
cssContent = cssContent.replace(/#F06292/g, '#DF6B8F');
cssContent = cssContent.replace(/233,\s*30,\s*99/g, NEW_PINK_RGB);

// Upgrade btn-pink to a beautiful luxury gradient instead of solid harsh color
cssContent = cssContent.replace(
  /@apply relative overflow-hidden inline-flex items-center justify-center bg-pink text-black-deep font-semibold/g,
  "@apply relative overflow-hidden inline-flex items-center justify-center text-white font-semibold\n           bg-gradient-to-r from-pink to-pink-light shadow-[0_4px_20px_rgba(201,75,115,0.3)]"
);
// Remove btn-pink::before which was the old solid hover effect
cssContent = cssContent.replace(/\.btn-pink::before \{[\s\S]*?\}\s*/g, '');
cssContent = cssContent.replace(/\.btn-pink:hover::before \{ transform: translateX\(0\); \}\s*/g, '');

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Updated: index.css');
