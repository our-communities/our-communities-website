const gulp = require('gulp');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const handleErrors = () => {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
};

//  JS
gulp.task('js', function() {
  let isProd = process.env.CONTEXT ? true : false;

  let inDirPath = isProd ? '/opt/build/repo/_js/scripts.js' : '_js/scripts.js';
  let outDirPath = isProd ? '/opt/build/repo/_site/assets/js' : '_site/assets/js';
  let dirPath = isProd ? '/opt/build/repo/assets/js' : 'assets/js';

  return browserify(`${inDirPath}`, {debug: true, extensions: ['es6']})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(outDirPath))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest(dirPath));
});
