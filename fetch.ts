import fs from 'fs';
fetch('https://wpriverthemes.com/jayden/home-version-one/')
  .then(res => res.text())
  .then(html => fs.writeFileSync('page.html', html));
