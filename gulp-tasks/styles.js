const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');

// SASS
gulp.task('sass', function() {
  // let dirPath = process.env.CONTEXT ? '/opt/build/repo/_site/assets/css' : '_site/assets/css';
  // let dirPath2 = process.env.CONTEXT ? '/opt/build/repo/assets/css' : 'assets/css';
  let criticalPathOutput = process.env.CONTEXT ? '/opt/build/repo/_includes' : '_includes';

  let autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 10', 'IE 11'];

  return gulp.src('_sass/main.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss'],
      onError: browserSync.notify
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: autoprefixBrowsers,
      flexbox: true
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2
    }))
    .pipe(rename({ basename: 'critical' }))
    .pipe(gulp.dest(criticalPathOutput))
    // .pipe(rename({ basename: 'main' }))
    // .pipe(gulp.dest(dirPath))
    .pipe(browserSync.reload({ stream: true }))
    // .pipe(gulp.dest(dirPath2));
});
