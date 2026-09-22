const fs = require('fs');
let code = fs.readFileSync('src/data/projects.js', 'utf8');

const newGallery = \[
      { id: 'ws-1', src: '/projects/whatsapp/living-space-1.jpg', caption: 'Real site living space view 1.' },
      { id: 'ws-2', src: '/projects/whatsapp/living-space-2.jpg', caption: 'Real site living space view 2.' },
      { id: 'ws-3', src: '/projects/whatsapp/living-space-3.jpg', caption: 'Real site living space view 3.' },
      { id: 'ws-4', src: '/projects/whatsapp/living-space-4.jpg', caption: 'Real site living space view 4.' },
      { id: 'ws-5', src: '/projects/whatsapp/living-space-5.jpg', caption: 'Real site living space view 5.' },
      { id: 'ws-6', src: '/projects/whatsapp/living-space-6.jpg', caption: 'Real site living space view 6.' },
      { id: 'ws-7', src: '/projects/whatsapp/living-space-7.jpg', caption: 'Real site living space view 7.' },
      { id: 'ws-8', src: '/projects/whatsapp/living-space-8.jpg', caption: 'Real site living space view 8.' },
      { id: 'ws-9', src: '/projects/whatsapp/living-space-9.jpg', caption: 'Real site living space view 9.' },
      { id: 'ws-10', src: '/projects/whatsapp/living-space-10.jpg', caption: 'Real site living space view 10.' },
      { id: 'ws-11', src: '/projects/whatsapp/living-space-11.jpg', caption: 'Real site living space view 11.' },
      { id: 'ws-12', src: '/projects/whatsapp/living-space-12.jpg', caption: 'Real site living space view 12.' },
      { id: 'ws-13', src: '/projects/whatsapp/living-space-13.jpg', caption: 'Real site living space view 13.' },
      { id: 'ws-14', src: '/projects/whatsapp/living-space-14.jpg', caption: 'Real site living space view 14.' },
      { id: 'ws-15', src: '/projects/whatsapp/living-space-15.jpg', caption: 'Real site living space view 15.' },
      { id: 'ws-16', src: '/projects/whatsapp/living-space-16.jpg', caption: 'Real site living space view 16.' },
      { id: 'ws-17', src: '/projects/whatsapp/living-space-17.jpg', caption: 'Real site living space view 17.' },
      { id: 'ws-18', src: '/projects/whatsapp/living-space-18.jpg', caption: 'Real site living space view 18.' },
      { id: 'ws-19', src: '/projects/whatsapp/living-space-19.jpg', caption: 'Real site living space view 19.' },
      { id: 'ws-20', src: '/projects/whatsapp/living-space-20.jpg', caption: 'Real site living space view 20.' },
      { id: 'ws-21', src: '/projects/whatsapp/living-space-21.jpg', caption: 'Real site living space view 21.' }
    ]\;

code = code.replace(
  /gallery: \[\s*\{\s*id: 'i1-1'.*?\s*\]/,
  'gallery: ' + newGallery
);

code = code.replace(
  /image: '\/projects\/interior-living-teal.jpg',/g,
  \image: '/projects/whatsapp/living-space-1.jpg',\
);

fs.writeFileSync('src/data/projects.js', code);
console.log('Project updated successfully.');

