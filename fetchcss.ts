import fs from 'fs';
fetch('https://wpriverthemes.com/jayden/wp-content/themes/jayden/css/styles.css')
  .then(res => res.text())
  .then(css => fs.writeFileSync('jayden.css', css));
