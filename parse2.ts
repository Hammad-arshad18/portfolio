import fs from 'fs';
const html = fs.readFileSync('page.html', 'utf8');

const scripts = [...html.matchAll(/<script[^>]*src="([^"]*)"/g)].map(m => m[1]);
console.log(`Scripts:`, scripts);
