import fs from 'fs';
const html = fs.readFileSync('page.html', 'utf8');

const stylesheets = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"/g)]
    .map(m => m[1]);
console.log(`Stylesheets:`, stylesheets.slice(0, 10));
console.log(`Stylesheets:`, stylesheets.slice(10, 20));
