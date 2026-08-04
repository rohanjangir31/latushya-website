const fs = require('fs');
const path = require('path');

const replacers = [
  // Hex codes for Blue -> Warm Sand
  { old: /#5AB9EA/gi, new: '#C5B496' }, // Warm Sand
  { old: /#8EDDF0/gi, new: '#D9CDB6' }, // Light Sand
  { old: /#4A9CB0/gi, new: '#9E8C6F' }, // Dark Sand
  { old: /#5CBED4/gi, new: '#B5A58A' }, // Muted Sand
  { old: /#DEF4F9/gi, new: '#EFEAE1' }, // Pale Sand
  
  // Any RGB values for the blue
  { old: /90,\s*185,\s*234/g, new: '197, 180, 150' },
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
        console.log(`Updated blue to sand in: ${fullPath}`);
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
    console.log(`Updated blue to sand in: ${twPath}`);
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Warm sand palette applied successfully!');
