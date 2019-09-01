const gulp = require('gulp');
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

var inDirPath = process.env.CONTEXT ? '/opt/build/repo/_img' : '_img';
var outDirPath = process.env.CONTEXT ? '/opt/build/repo/assets/img' : 'assets/img';

// Community Images
gulp.task('img', function() {
  return gulp.src(`${inDirPath}/communities/*.{png,jpg}`)
    .pipe($.responsive({
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        width: 535,
        rename: { suffix: '_thumb' },
      },
      {
        width: 535 * 2,
        rename: { suffix: '_thumb@2x' },
      }],
    },
    {
      quality: 85,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(`${outDirPath}/communities/`));
});

// Post and header images
gulp.task('site-img', function() {
  return gulp.src(`${inDirPath}/posts/*.{png,jpg}`)
    .pipe($.responsive({
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        width: 535,
        rename: { suffix: '_thumb' },
      }, {
        width: 535 * 2,
        rename: { suffix: '_thumb@2x' }
      }, {
        width: 575,
        rename: { suffix: '_xs'}
      }, {
        width: 767,
        rename: {suffix: '_sm'}
      }, {
        width: 991,
        rename: { suffix: '_md' }
      }, {
        width: 1999,
        rename: { suffix: '_lg' }
      }, {
        width: 1920,
      }],
    },
    {
      quality: 85,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(`${outDirPath}/posts/`));
});

// Icons and manifest stuff
gulp.task('icons', function() {
  return gulp.src(`${inDirPath}/icons/*.{png,jpg,xml,ico,json,svg}`)
    .pipe(gulp.dest(`${outDirPath}/icons/`));
});

// Misc images
gulp.task('img-misc', function() {
  return gulp.src(`${inDirPath}/*.jpg`)
    .pipe(gulp.dest(`${outDirPath}/`));
});
