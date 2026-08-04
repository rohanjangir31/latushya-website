const fs = require('fs');
const path = require('path');

const replacers = [
  // Restore Pink
  { old: /#C19A6B/gi, new: '#DF4C73' },
  { old: /#D9C1A5/gi, new: '#F07595' },
  { old: /#8C6C43/gi, new: '#C2185B' },
  { old: /#AB8961/gi, new: '#D81B60' },
  { old: /#F2E9DE/gi, new: '#F8BBD0' },
  
  { old: /#C58B82/gi, new: '#DF4C73' },
  { old: /#D6A199/gi, new: '#F07595' },
  { old: /#9A645C/gi, new: '#C2185B' },
  { old: /#B47B72/gi, new: '#D81B60' },
  { old: /#F0D4CE/gi, new: '#F8BBD0' },

  // Restore RGB for shadows
  { old: /193,\s*154,\s*107/g, new: '223, 76, 115' },
  { old: /197,\s*139,\s*130/g, new: '223, 76, 115' },

  // Restore Blue
  { old: /#C5B496/gi, new: '#5AB9EA' },
  { old: /#D9CDB6/gi, new: '#8EDDF0' },
  { old: /#9E8C6F/gi, new: '#4A9CB0' },
  { old: /#B5A58A/gi, new: '#5CBED4' },
  { old: /#EFEAE1/gi, new: '#DEF4F9' },
  { old: /197,\s*180,\s*150/g, new: '90, 185, 234' },
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
        console.log(`Restored colors in: ${fullPath}`);
      }
    }
  }
}

let twPath = path.join(__dirname, 'tailwind.config.js');
if (fs.existsSync(twPath)) {
  let twContent = fs.readFileSync(twPath, 'utf8');
  let originalTwContent = twContent;
  for (const { old, new: replacement } of replacers) {
    twContent = twContent.replace(old, replacement);
  }
  if (twContent !== originalTwContent) {
    fs.writeFileSync(twPath, twContent, 'utf8');
    console.log(`Restored colors in: ${twPath}`);
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Original vibrant colors restored successfully!');
