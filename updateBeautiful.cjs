const fs = require('fs');
const path = require('path');

const OLD_PINK = '#C94B73';
const NEW_PINK = '#DF4C73'; // More luminous, beautiful rose
const OLD_END = '#DF6B8F';
const NEW_END = '#F07595';

// 1. Update JSX components globally for the new beautiful pink
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
files.push(path.join(__dirname, 'src', 'App.jsx'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Replace hex
    content = content.replace(new RegExp(OLD_PINK, 'g'), NEW_PINK);
    content = content.replace(new RegExp(OLD_END, 'g'), NEW_END);
    
    // Make QuoteForm beautifully smooth
    if (file.includes('QuoteForm.jsx')) {
      // form container rounded-xl -> rounded-3xl
      content = content.replace(/rounded-xl/g, 'rounded-3xl');
      // Submit button add rounded-full
      content = content.replace(/uppercase hover:from/g, 'uppercase rounded-full hover:from');
    }

    // Make Hero buttons beautifully smooth
    if (file.includes('Hero.jsx')) {
      // Book Consultation
      if (!content.includes("borderRadius: '9999px'")) {
        content = content.replace(/border: 'none',/g, "border: 'none',\n                  borderRadius: '9999px',");
      }
      // View Portfolio
      if (!content.includes("borderRadius: '9999px'")) {
        content = content.replace(/border: '1px solid/g, "borderRadius: '9999px',\n                  border: '1px solid");
      }
    }

    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${path.basename(file)}`);
    }
  }
});

// 2. Update tailwind.config.js
const twPath = path.join(__dirname, 'tailwind.config.js');
let twContent = fs.readFileSync(twPath, 'utf8');
twContent = twContent.replace(new RegExp(OLD_PINK, 'g'), NEW_PINK);
twContent = twContent.replace(new RegExp(OLD_END, 'g'), NEW_END);
fs.writeFileSync(twPath, twContent, 'utf8');
console.log('Updated: tailwind.config.js');

// 3. Update index.css
const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace(new RegExp(OLD_PINK, 'g'), NEW_PINK);
cssContent = cssContent.replace(new RegExp(OLD_END, 'g'), NEW_END);

// Add rounded-full to global buttons
if (!cssContent.includes('rounded-full')) {
  cssContent = cssContent.replace(
    /@apply relative overflow-hidden inline-flex items-center justify-center text-white/g,
    "@apply relative overflow-hidden rounded-full inline-flex items-center justify-center text-white"
  );
  cssContent = cssContent.replace(
    /@apply relative overflow-hidden inline-flex items-center justify-center border border-pink/g,
    "@apply relative overflow-hidden rounded-full inline-flex items-center justify-center border border-pink"
  );
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Updated: index.css');
