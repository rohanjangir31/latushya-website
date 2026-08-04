const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(directory);

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const fullPath = path.join(directory, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    // Replace hardcoded faint pink lines with the pink-to-blue gradient
    content = content.replace(/h-px bg-pink\/\d+/g, 'h-[2px] bg-gradient-to-r from-pink to-blue opacity-80');
    content = content.replace(/h-1 bg-pink/g, 'h-1 bg-gradient-to-r from-pink to-blue');

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated lines in: ${file}`);
    }
  }
}

// Update index.css
const cssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  const originalCss = cssContent;
  cssContent = cssContent.replace(
    /@apply w-16 h-px bg-gradient-to-r from-pink to-transparent;/g,
    '@apply w-16 h-[2px] bg-gradient-to-r from-pink to-blue opacity-90;'
  );
  if (cssContent !== originalCss) {
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log('Updated index.css');
  }
}
