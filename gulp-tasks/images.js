const gulp = require('gulp');
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// Images
gulp.task('img', function() {
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
    .pipe(gulp.dest('assets/img/communities/'));
});

gulp.task('site-img', function() {
  return gulp.src('assets/img/posts/*.{png,jpg}')
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
    .pipe(gulp.dest('assets/img/posts/'));
});
