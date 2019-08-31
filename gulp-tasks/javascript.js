const gulp = require('gulp');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const browserSync = require('browser-sync');

const handleErrors = () => {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
};

var inDirPath = process.env.CONTEXT ? '/opt/build/repo/_js' : '_js';
var outDirPath = process.env.CONTEXT ? '/opt/build/repo/_site/assets/js' : '_site/assets/js';

//  JS
gulp.task('js', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/assets/js' : 'assets/js';
  return browserify(`${inDirPath}/scripts.js`, {debug: true, extensions: ['es6']})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', handleErrors)
    .pipe(source(`${inDirPath}/bundle.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write(`${inDirPath}/maps`))
    .pipe(size())
    .pipe(gulp.dest(outDirPath))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest(dirPath));
});
