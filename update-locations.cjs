const fs = require('fs');

const path = 'src/data/projects.js';
let content = fs.readFileSync(path, 'utf8');

const locations = [
  { title: 'The Elite Walk-In', loc: 'Prestige Golfshire, Nandi Hills' },
  { title: 'Dual-Tone Masterpiece', loc: 'Sobha City, Thanisandra' },
  { title: 'Vanity & Storage Suite', loc: 'Phoenix One, Rajajinagar' },
  { title: 'Blush & White Symphony', loc: 'Embassy Pristine, Bellandur' },
  { title: 'Tinted Reflection', loc: 'RMZ Latitude, Hebbal' },
  { title: 'The Wide Profile Slider', loc: 'Purva Whitehall, Sarjapur' },
  { title: 'Pastel Modular Kitchen', loc: 'Kingfisher Towers, Ashok Nagar' },
  { title: 'Tranquil Bedroom Suite', loc: 'Total Environment, Whitefield' },
  { title: 'Heritage Focal Unit', loc: 'Brigade Gateway, Malleshwaram' },
  { title: 'Geometric Accent Space', loc: 'Salarpuria Sattva, Indiranagar' },
  { title: 'Seamless Open Plan Architecture', loc: 'Prestige Shantiniketan, Whitefield' },
  { title: 'Architectural Ceiling Details', loc: 'Godrej Gold County, Tumkur Road' },
  { title: 'Expansive U-Shaped Kitchen', loc: 'Bhartiya City, Thanisandra' },
  { title: 'Contemporary Mandir', loc: 'Divyasree 77 East, Yemalur' }
];

locations.forEach(l => {
  // We want to replace `location: 'Bangalore'` with `location: 'l.loc'` ONLY for the specific project.
  // The safest way with regex is to match the title and then the location line shortly after.
  const regex = new RegExp(`(title:\\s*'${l.title}',\\s*\\n\\s*)location:\\s*'Bangalore'`, 'g');
  content = content.replace(regex, `$1location: '${l.loc}'`);
});

fs.writeFileSync(path, content);
console.log('Updated locations in projects.js');
