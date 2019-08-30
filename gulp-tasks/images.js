const gulp = require('gulp');
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// Images
gulp.task('img', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/assets/img/communities/' : 'assets/img/communities/';
  return gulp.src('_img/communities/*.{png,jpg}')
    .pipe($.responsive({
      // For all the images in the folder
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        // thubmnail
        width: 535,
        rename: { suffix: '_thumb' },
      },
      {
        // thumbnail @2x
        width: 535 * 2,
        rename: { suffix: '_thumb@2x' },
    // {
    //     width: 575,
    //     rename: { suffix: '_xs'}
    //   }, {
    //     width: 767,
    //     rename: {suffix: '_sm'}
    //   }, {
    //     width: 991,
    //     rename: { suffix: '_md' }
    //   }, {
    //     width: 1999,
    //     rename: { suffix: '_lg' }
    //   }, {
    //     // max-width hero
    //     width: 1920,
      }],
    },
    {
      quality: 85,
      progressive: true,
      withMetadata: false,
      errorOnEnlargement: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(dirPath));
});

gulp.task('site-img', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/assets/img/posts/' : 'assets/img/posts/';
  return gulp.src('_img/posts/*.{png,jpg}')
    .pipe($.responsive({
      // For all the images in the folder
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        // thubmnail
        width: 535,
        rename: { suffix: '_thumb' },
      }, {
        // thumbnail @2x
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
        // max-width hero
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
    .pipe(gulp.dest(dirPath));
});

// Icons and manifest stuff
gulp.task('icons', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/assets/img/icons/' : 'assets/img/icons/';
  return gulp.src('_img/icons/*')
    .pipe(gulp.dest(dirPath));
});

gulp.task('img-misc', function() {
  let dirPath = process.env.CONTEXT ? '/opt/build/repo/assets/img/' : 'assets/img/';
  return gulp.src('_img/*.jpg')
    .pipe(gulp.dest(dirPath));
});
