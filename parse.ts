import fs from 'fs';
const html = fs.readFileSync('page.html', 'utf8');

const title = html.match(/<title>(.*?)<\/title>/)?.[1];
const bodyClassName = html.match(/<body[^>]*class="([^"]*)"/)?.[1];
console.log(`Title: ${title}`);
console.log(`Body Classes: ${bodyClassName}`);

const stylesheets = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"/g)].map(m => m[1]);
console.log(`Stylesheets:`, stylesheets.slice(0, 5));

const sections = [...html.matchAll(/<section[^>]*id="([^"]*)"/g)].map(m => m[1]);
console.log(`Sections:`, sections);

const headStyles = [...html.matchAll(/<style[^>]*>(.*?)<\/style>/gisu)].map(m => m[1]);
console.log("Inline styles length: ", headStyles.reduce((s, st) => s + st.length, 0));
