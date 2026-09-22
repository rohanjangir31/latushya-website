const fs = require('fs');
let code = fs.readFileSync('src/data/projects.js', 'utf8');

code = code.replace(/title: 'Cosmopolitan Living Space',/, "title: 'Assetz Mark',");
code = code.replace(/caption: 'Real site living space view \d+\.'/g, "caption: ''");

fs.writeFileSync('src/data/projects.js', code);
console.log('Project updated successfully.');
