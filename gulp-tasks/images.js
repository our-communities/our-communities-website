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
        width: 535,
        rename: {
          suffix: '_thumb',
          extname: '.jpeg',
        },
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

// Post images
gulp.task('post-img', function() {
  return gulp.src(`${inDirPath}/posts/*.{png,jpg}`)
    .pipe($.responsive({
      '*': [{
        width: 535,
        rename: {
          suffix: '_thumb' ,
          extname: '.jpeg',
        },
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

// header images
gulp.task('header-img', function() {
  return gulp.src(`${inDirPath}/headers/*.{png,jpg}`)
    .pipe($.responsive({
      '*': [{
        width: 580,
        rename: {
          suffix: 'xs' ,
          extname: '.jpeg',
        },
      },{
        width: 770,
        rename: {
          suffix: '_sm',
          extname: '.jpeg',
        }
      }, {
        width: 1000,
        rename: {
          suffix: '_md',
          extname: '.jpeg',
        }
      },{
        width: 1200,
        rename: {
          suffix: '_lg',
          extname: '.jpeg',
        }
      },{
        width: 1600,
        rename: {
          suffix: '_xl',
          extname: '.jpeg',
        }
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
