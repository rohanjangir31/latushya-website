const fs = require('fs');

const p = 'src/data/projects.js';
let content = fs.readFileSync(p, 'utf8');

// Find the INTERIOR_PROJECTS array and remove the last item
const targetStr = `,
  {
    id: 10,
    category: 'Heritage Pieces',
    title: 'Heritage Focal Unit',
    location: 'Brigade Gateway, Malleshwaram',
    projectType: 'Custom Woodwork',
    materials: 'Carved Solid Wood, Mirror',
    duration: '14 Days',
    description: 'An exquisite custom-carved wooden console featuring intricate detailing and integrated mirrors, serving as a stunning traditional statement piece in a modern home.',
    image: '/projects/interior-carved-mirror.jpg',
    isPlaceholder: false,
    size: 'small',
    gallery: [
      { id: 'i4-1', src: '/projects/interior-carved-mirror.jpg', caption: 'Intricate traditional woodwork.' }
    ]
  }`;

content = content.replace(targetStr, '');

fs.writeFileSync(p, content);
console.log('Successfully removed the fourth interior project.');
