// Laravel mix v6. npx mix
let mix = require('laravel-mix');
mix
 // .js('js-src/docnav.js', 'js/')
  .sass('sass/aaah-local.scss', 'css/')
  .sass('sass/ckeditor.scss', 'css/')
  .sass('sass/content.scss', 'css/')
  .sass('sass/page.scss', 'css/')
  .vue({version: 2});
;

