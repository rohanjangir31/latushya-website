const fs = require('fs');
const files = [
  'src/data/chatbotKnowledge.js',
  'src/data/companyInfo.js',
  'src/data/content.js',
  'src/data/projects.js',
  'src/data/reviews.js',
  'src/data/services.js',
  'src/services/gemini.js',
  'src/components/Footer.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/ — /g, ' ');
    content = content.replace(/ - /g, ' ');
    content = content.replace(/—/g, ' ');
    content = content.replace(/2–4/g, '2 to 4');
    content = content.replace(/3–4/g, '3 to 4');
    
    fs.writeFileSync(file, content);
  }
});
