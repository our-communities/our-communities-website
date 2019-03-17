const gulp = require('gulp');
const sw = require('sw-precache');

gulp.task('sw', function() {
  const rootDir ='./';
  const distDir = './_site';

  sw.write(`${rootDir}/sw.js`, {
    staticFileGlobs: [distDir + '/**/*.{js,html,css,png,jpg,svg}'],
    stripPrefix: distDir
  });
});
