const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(directory);

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const fullPath = path.join(directory, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes('lucide-react') || content.includes('→') || content.includes('↗') || content.includes('<svg') || content.includes('Arrow')) {
      console.log(`\n--- Matches in ${file} ---`);
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('lucide-react') || line.includes('→') || line.includes('↗') || line.includes('<svg') || line.includes('Arrow')) {
          console.log(`${i + 1}: ${line.trim()}`);
        }
      });
    }
  }
}
