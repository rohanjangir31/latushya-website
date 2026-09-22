import fs from 'fs';

let content;

// chatbotKnowledge.js
content = fs.readFileSync('src/data/chatbotKnowledge.js', 'utf-8');
content = content.replace(/ - /g, ', ');
content = content.replace(/ — /g, ', ');
content = content.replace(/—/g, ', ');
content = content.replace('We offer five core services: FTC Wardrobes, Modular Kitchens, Turnkey Home Interiors, Living Room Design, and a premium Curated Decor Sourcing service (accompanied shopping & styling). Every project is 100% custom, we never use off-the-shelf templates.', 'We offer five core services: FTC Wardrobes, Modular Kitchens, Turnkey Home Interiors, Living Room Design, and a premium Curated Decor Sourcing service (accompanied shopping & styling). Every project is 100% custom and we never use off-the-shelf templates.');
fs.writeFileSync('src/data/chatbotKnowledge.js', content);

// companyInfo.js
content = fs.readFileSync('src/data/companyInfo.js', 'utf-8');
content = content.replace(/ - /g, ' ');
content = content.replace(/ — /g, ' ');
content = content.replace(/—/g, ' ');
fs.writeFileSync('src/data/companyInfo.js', content);

// content.js
content = fs.readFileSync('src/data/content.js', 'utf-8');
content = content.replace(/ - /g, ', ');
content = content.replace(/ — /g, ', ');
content = content.replace(/—/g, ', ');
content = content.replace(/2–4/g, '2 to 4');
content = content.replace(/3–4/g, '3 to 4');
content = content.replace('India\'s most trusted plywood brand, used as the core substrate', 'India\'s most trusted plywood brand is used as the core substrate');
content = content.replace('Century Ply and Greenply grade plywood, premium laminates, and solid wood options, materials selected', 'Century Ply and Greenply grade plywood, premium laminates, and solid wood options are materials selected');
fs.writeFileSync('src/data/content.js', content);

// gemini.js
content = fs.readFileSync('src/services/gemini.js', 'utf-8');
content = content.replace(/ - /g, ', ');
content = content.replace(/ — /g, ', ');
content = content.replace(/—/g, ', ');
content = content.replace(/2–4/g, '2 to 4');
content = content.replace(/3–4/g, '3 to 4');
content = content.replace('warm, knowledgeable, and professionally confident, like a luxury', 'warm, knowledgeable, and professionally confident like a luxury');
content = content.replace('1. Free Home Consultation, designer visits', '1. Free Home Consultation where designer visits');
content = content.replace('2. 3D Design Concept, personalised layout', '2. 3D Design Concept with personalised layout');
content = content.replace('3. Material Selection, choose finishes', '3. Material Selection to choose finishes');
content = content.replace('4. Workshop Production, precision-cut', '4. Workshop Production with precision-cut');
content = content.replace('5. On-site Installation, clean', '5. On-site Installation that is clean');
content = content.replace('6. Quality Handover, full check', '6. Quality Handover with full check');
fs.writeFileSync('src/services/gemini.js', content);
