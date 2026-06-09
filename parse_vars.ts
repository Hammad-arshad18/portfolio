import fs from 'fs';
const css = fs.readFileSync('jayden.css', 'utf8');

const regex = /--[^:]+: *[^;]+;/g;
const matches = [...css.matchAll(regex)].map(m => m[0]);
console.log(matches.slice(0, 30).join('\n'));
