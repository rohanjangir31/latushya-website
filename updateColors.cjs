const fs = require('fs');
const path = require('path');

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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Replace Pink rgba with standard hex where opacity is near 1
  content = content.replace(/rgba\(233,\s*30,\s*99,\s*1\)/g, '#E91E63');
  content = content.replace(/rgba\(233,\s*30,\s*99,\s*0\.9\d*\)/g, '#E91E63');

  // 2. Dual gradient injection for decorative lines
  // We look for specific patterns: `background: 'rgba(233, 30, 99, 0.65)'` and replace with dual-gradient
  content = content.replace(/background:\s*'rgba\(233,\s*30,\s*99,\s*0\.\d+\)'/g, "background: 'linear-gradient(to right, #E91E63, #5AB9EA)'");
  
  // 3. Update text colors: Instead of solid pink everywhere, let's inject blue into secondary headers
  // This is tricky via regex, so we'll just fix the glow effects and borders to use blue/pink dual tones
  content = content.replace(/boxShadow:\s*'0 0 \d+px rgba\(233,\s*30,\s*99,\s*0\.\d+\)'/g, "boxShadow: '0 0 20px rgba(90, 185, 234, 0.4)'");
  
  // 4. Update solid borders that were pink to blue
  content = content.replace(/border(?:Left|Bottom|Right|Top)?:\s*'1px solid rgba\(233,\s*30,\s*99,\s*0\.[2-9]+\)'/g, "border: '1px solid rgba(90, 185, 234, 0.3)'");

  // 5. Hero outline button hover (was pink, let's make it blue)
  if (file.includes('Hero.jsx')) {
    content = content.replace(/e\.currentTarget\.style\.borderColor = 'rgba\(233, 30, 99,0\.85\)';/g, "e.currentTarget.style.borderColor = '#5AB9EA';");
    content = content.replace(/e\.currentTarget\.style\.color = '#E91E63';/g, "e.currentTarget.style.color = '#5AB9EA';");
    content = content.replace(/e\.currentTarget\.style\.background = 'rgba\(233, 30, 99,0\.06\)';/g, "e.currentTarget.style.background = 'rgba(90, 185, 234, 0.08)';");
  }

  // 6. Fix specific gradients
  content = content.replace(/linear-gradient\(to right, rgba\(233, 30, 99,0\.22\), rgba\(233, 30, 99,0\.05\) 55%, transparent\)/g, "linear-gradient(to right, rgba(90, 185, 234,0.22), rgba(233, 30, 99,0.05) 55%, transparent)");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.basename(file)}`);
  }
});
console.log('Global color refactor complete.');
