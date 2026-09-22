const fs = require('fs');

const p = 'src/data/projects.js';
let content = fs.readFileSync(p, 'utf8');

// The file has two main arrays: WARDROBE_PROJECTS and INTERIOR_PROJECTS
// Both look like: export const NAME_PROJECTS = [ { ... }, { ... } ];

function trimArray(content, arrayName) {
    const startIndex = content.indexOf(`export const ${arrayName} = [`);
    if (startIndex === -1) return content;
    
    // find the 4th closing brace "  },"
    let count = 0;
    let index = startIndex;
    while (count < 4 && index !== -1) {
        index = content.indexOf('\n  },', index + 1);
        if (index !== -1) {
            count++;
        }
    }
    
    if (count === 4 && index !== -1) {
        // find the end of the array
        const endIndex = content.indexOf('\n];', index);
        if (endIndex !== -1) {
            // we want to replace from `index + 5` to `endIndex` with nothing.
            // `index` points to `\n`, `index + 5` points after `  },`
            const part1 = content.slice(0, index + 4);
            const part2 = content.slice(endIndex);
            return part1 + part2;
        }
    }
    return content;
}

content = trimArray(content, 'WARDROBE_PROJECTS');
content = trimArray(content, 'INTERIOR_PROJECTS');

fs.writeFileSync(p, content);
console.log('Trimmed projects.js down to 4 projects per category.');
