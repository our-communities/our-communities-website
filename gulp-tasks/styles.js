const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const critical = require('critical');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// SASS
gulp.task('sass', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/_site/assets/css' : '_site/assets/css';
  let dirPath2 = process.env.CONTEXT ? '/opt/build/repo/assets/css' : 'assets/css';
  return gulp.src('_sass/main.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss'],
      onError: browserSync.notify
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['ie 10-11'],
      flexbox: true
    }))
    .pipe(rename({ basename: 'main' }))
    .pipe(gulp.dest(dirPath))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(dirPath2));
});

// Generate critical CSS for inlining into document
gulp.task('critical', function () {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/_site/' : '_site/';
  let dirPath2 = process.env.CONTEXT ? '/opt/build/repo/assets/css/main.css' : 'assets/css/main.css';
  critical.generate({
    base: dirPath,
    src: 'index.html',
    css: dirPath2,
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '../_includes/critical.css',
    minify: true,
    extract: false,
    ignore: ['@font-face']
  });
});
