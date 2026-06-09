import fs from 'fs';
const html = fs.readFileSync('page.html', 'utf8');

// match the first <header> to </header>
const headerMatch = html.match(/<header[^>]*>.*?<\/header>/is);
if (headerMatch) {
  fs.writeFileSync('header.html', headerMatch[0]);
}

const firstSection = html.match(/<section[^>]*id="home"[^>]*>.*?<\/section>/is);
if (firstSection) {
  fs.writeFileSync('home.html', firstSection[0]);
}

const globalCssMatch = html.match(/<style id='jayden-global-inline-css'[^>]*>(.*?)<\/style>/is);
if (globalCssMatch) {
    fs.writeFileSync('styles.css', globalCssMatch[1]);
}
