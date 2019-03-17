const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const critical = require('critical');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// SASS
gulp.task('sass', function() {
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
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

// Generate critical CSS for inlining into document
gulp.task('critical', function () {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/main.css'],
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
