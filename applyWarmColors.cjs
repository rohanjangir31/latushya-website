const fs = require('fs');
const path = require('path');

const replacers = [
  // Hex codes
  { old: /#DF4C73/gi, new: '#C58B82' }, // Warm Dusty Rose
  { old: /#F07595/gi, new: '#D6A199' }, // Light Warm Rose
  { old: /#C2185B/gi, new: '#9A645C' }, // Dark Warm Rose
  { old: /#D81B60/gi, new: '#B47B72' }, // Muted
  { old: /#F8BBD0/gi, new: '#F0D4CE' }, // Pale
  
  // RGB codes for box-shadows etc
  { old: /223,\s*76,\s*115/g, new: '197, 139, 130' },
  { old: /201,\s*75,\s*115/g, new: '197, 139, 130' },
  { old: /233,\s*30,\s*99/g, new: '197, 139, 130' } // Catch old hot pink rgb
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const { old, new: replacement } of replacers) {
        content = content.replace(old, replacement);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated colors in: ${fullPath}`);
      }
    }
  }
}

// Also process tailwind.config.js in root
let twPath = path.join(__dirname, 'tailwind.config.js');
if (fs.existsSync(twPath)) {
  let twContent = fs.readFileSync(twPath, 'utf8');
  let originalTwContent = twContent;
  for (const { old, new: replacement } of replacers) {
    twContent = twContent.replace(old, replacement);
  }
  if (twContent !== originalTwContent) {
    fs.writeFileSync(twPath, twContent, 'utf8');
    console.log(`Updated colors in: ${twPath}`);
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Warm color palette applied successfully!');
