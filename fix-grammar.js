import fs from 'fs';

let content = fs.readFileSync('src/components/AIChatbot.jsx', 'utf-8');
content = content.replace("Ask me anything - I'm powered by Gemini AI.", "Ask me anything. I'm powered by Gemini AI.");
content = content.replace("I'm not quite set up yet - please reach out on WhatsApp and our team will answer you right away!", "I'm not quite set up yet. Please reach out on WhatsApp and our team will answer you right away!");
fs.writeFileSync('src/components/AIChatbot.jsx', content);

content = fs.readFileSync('src/components/WhyChoose.jsx', 'utf-8');
content = content.replace('Every space is crafted from scratch around your dimensions, lifestyle, and interior palette - no templates, no compromise.', 'Every space is crafted from scratch around your dimensions, lifestyle, and interior palette with no templates and no compromise.');
content = content.replace('Häfele and Hettich German hardware - soft-close mechanisms, silent runners, and fittings built to outlast decades of daily use.', 'Häfele and Hettich German hardware with soft-close mechanisms, silent runners, and fittings built to outlast decades of daily use.');
content = content.replace('Post-installation support included as standard. We return to adjust, refine, or repair - because your home should perform indefinitely.', 'Post-installation support included as standard. We return to adjust, refine, or repair because your home should perform indefinitely.');
fs.writeFileSync('src/components/WhyChoose.jsx', content);

content = fs.readFileSync('src/components/BeforeAfter.jsx', 'utf-8');
content = content.replace('Our completed wardrobe transformations are being curated and photographed. Each project tells a story of craft - coming to this gallery soon.', 'Our completed wardrobe transformations are being curated and photographed. Each project tells a story of craft and will be coming to this gallery soon.');
fs.writeFileSync('src/components/BeforeAfter.jsx', content);
